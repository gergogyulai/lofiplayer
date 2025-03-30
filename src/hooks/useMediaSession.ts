import { useEffect, useRef } from 'react';

const isMediaSessionAvailable =
  typeof window !== 'undefined' && 'mediaSession' in window.navigator;

export const useMediaSession = ({
  title,
  artist,
  artwork,
  onPlay,
  onPause,
}: {
  title: string;
  artist: string;
  artwork: { src: string; sizes: string; type: string }[];
  onPlay?: () => void;
  onPause?: () => void;
}) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isMediaSessionAvailable) return;

    if (!isInitialized.current) {
      window.navigator.mediaSession.metadata = new MediaMetadata({
        title,
        artist,
        artwork,
      });

      window.navigator.mediaSession.setActionHandler('play', onPlay || null);
      window.navigator.mediaSession.setActionHandler('pause', onPause || null);

      isInitialized.current = true;
    }

    return () => {
      if (isMediaSessionAvailable) {
        window.navigator.mediaSession.metadata = null;
        window.navigator.mediaSession.setActionHandler('play', null);
        window.navigator.mediaSession.setActionHandler('pause', null);
      }
    };
  }, [title, artist, artwork, onPlay, onPause]);
};