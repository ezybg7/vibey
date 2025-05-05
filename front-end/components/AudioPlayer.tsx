import React, { useState, useEffect } from 'react';
import { View, Button, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';

interface AudioPlayerProps {
  uri: string;
  startTime?: number; // in seconds, defaults to 0
}

export default function AudioPlayer({
  uri,
  startTime = 0,
}: AudioPlayerProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let _sound: Audio.Sound;
    const load = async () => {
      setLoading(true);

      try {
        const startMillis = Math.max(0, startTime) * 1000;
        const { sound: loadedSound } = await Audio.Sound.createAsync(
          { uri },
          {
            shouldPlay: false,
            positionMillis: startMillis,    // ← start here
          }
        );
        _sound = loadedSound;
        setSound(loadedSound);
      } catch (e) {
        console.warn('Error loading sound', e);
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => {
      if (_sound) {
        _sound.unloadAsync();
      }
    };
  }, [uri, startTime]);

  const togglePlayback = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <Button
        title={isPlaying ? 'Pause Preview' : 'Play Preview'}
        onPress={togglePlayback}
      />
    </View>
  );
}
