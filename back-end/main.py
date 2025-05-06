# backend/main.py
"""
FastAPI service that returns 10 songs with real artwork & 30‑second previews,
pulled live from Apple’s public iTunes Search API.

Endpoint:
    GET /get-songs   →  JSON array[Track]
"""

from asyncio import gather
from typing import List, Tuple

import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl

app = FastAPI(
    title="Music‑Swipe API",
    description="Fetches 10 songs from iTunes Search API with artwork & preview",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["*"] to open to all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── (title, artist) pairs you want in the response ──────────────────────────
QUERIES: List[Tuple[str, str]] = [
    ("Apple Pie", "Travis Scott"),
    ("River Flows In You", "Yiruma"),
    ("Dreams", "Fleetwood Mac"),
    ("Levitating", "Dua Lipa"),
    ("Blinding Lights", "The Weeknd"),
    ("Watermelon Sugar", "Harry Styles"),
    ("Bad Habit", "Steve Lacy"),
    ("Lose Yourself", "Eminem"),
    ("Smells Like Teen Spirit", "Nirvana"),
    ("Shape of You", "Ed Sheeran"),
]


class Track(BaseModel):
    title: str
    artists: list[str]
    cover_art_url: HttpUrl
    playback_uri: HttpUrl


async def fetch_itunes_song(title: str, artist: str) -> Track:
    """Query iTunes Search and return the first match as a Track object."""
    term = f"{title} {artist}".replace(" ", "+")
    url = (
        "https://itunes.apple.com/search"
        f"?media=music&entity=song&limit=1&term={term}"
    )

    async with httpx.AsyncClient(timeout=8.0) as client:
        r = await client.get(url)
    if r.status_code != 200:
        raise HTTPException(502, "iTunes API unreachable")

    data = r.json()
    if not data["resultCount"]:
        raise HTTPException(404, f"No iTunes match for '{title}' by '{artist}'")

    itm = data["results"][0]
    return Track(
        title=itm["trackName"],
        artists=[itm["artistName"]],
        cover_art_url=itm["artworkUrl100"].replace("100x100", "300x300"),
        playback_uri=itm["previewUrl"],
    )


@app.get("/get-songs", response_model=list[Track])
async def get_songs() -> list[Track]:
    """Fetch the ten tracks in parallel and return them as a list."""
    tracks = await gather(
        *[fetch_itunes_song(title, artist) for title, artist in QUERIES]
    )
    return list(tracks)
