'use client';


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SongCard from './SongCard';
import { song } from '@/types';

interface SwipeDeckProps {
  songs: song[];
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

export default function SwipeDeck({ songs }: SwipeDeckProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleDragEnd = (offsetX: number, velocityX: number) => {
    const swipe = swipePower(offsetX, velocityX);

    if (swipe > swipeConfidenceThreshold) {
      console.log('→ Add to playlist:', songs[index].title);
      paginate(1);
    } else if (swipe < -swipeConfidenceThreshold) {
      console.log('← Ignored:', songs[index].title);
      paginate(1);
    }
  };

  const paginate = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => Math.min(prev + 1, songs.length - 1));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[350px] h-[450px]">
        <AnimatePresence initial={false} custom={direction}>
          {index < songs.length && (
            <motion.div
              key={songs[index].playback_uri}
              className="absolute"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_, info) =>
                handleDragEnd(info.offset.x, info.velocity.x)
              }
              custom={direction}
              initial={{ x: direction > 0 ? 1000 : -1000, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction < 0 ? 1000 : -1000, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <SongCard song={songs[index]} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {index < songs.length && (
        <audio
          className="mt-4"
          src={songs[index].playback_uri}
          autoPlay
          controls
        />
      )}
    </div>
  );
}
