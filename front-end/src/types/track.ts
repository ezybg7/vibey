export interface Track {
  id: string
  created_at: string;
  title: string;
  artists: string[];
  cover_art_url: string;
  playback_uri: string;
}