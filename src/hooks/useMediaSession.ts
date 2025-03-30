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

    // Update metadata when title/artist/artwork changes
    window.navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist,
      artwork,
    });

    if (!isInitialized.current) {
      // Set action handlers once
      window.navigator.mediaSession.setActionHandler('play', onPlay || null);
      window.navigator.mediaSession.setActionHandler('pause', onPause || null);
      
      // Add other useful media session actions
      window.navigator.mediaSession.setActionHandler('stop', () => {
        if (onPause) onPause();
      });
      
      // Initialize additional handlers if needed in the future
      // window.navigator.mediaSession.setActionHandler('seekbackward', null);
      // window.navigator.mediaSession.setActionHandler('seekforward', null);
      // window.navigator.mediaSession.setActionHandler('previoustrack', null);
      // window.navigator.mediaSession.setActionHandler('nexttrack', null);

      isInitialized.current = true;
    }

    return () => {
      if (isMediaSessionAvailable) {
        window.navigator.mediaSession.metadata = null;
        window.navigator.mediaSession.setActionHandler('play', null);
        window.navigator.mediaSession.setActionHandler('pause', null);
        window.navigator.mediaSession.setActionHandler('stop', null);
      }
    };
  }, [title, artist, artwork, onPlay, onPause]);
};