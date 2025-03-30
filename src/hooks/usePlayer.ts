import { useState, useCallback, useRef, LegacyRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useMediaSession } from './useMediaSession';
import useAudioStore from '@/stores/volume';
import usePlaybackStore from '@/stores/playback';

interface MediaMeta {
  title: string;
  artist: string;
  artwork: { src: string; sizes: string; type: string }[];
}

interface PlayerState {
  url: string | null;
  played: number;
  loaded: number;
  duration: number;
  seeking: boolean;
  error: Error | null;
}

interface PlayerAction {
  handlePlay: () => void;
  handlePause: () => void;
  handleProgress: (state: { played: number; loaded: number }) => void;
  handlePlayPause: () => void;
  handleSeekMouseDown: () => void;
  handleSeekChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSeekMouseUp: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMuteToggle: () => void;
  handleBuffer: () => void;
  handleBufferEnd: () => void;
  handleDuration: (duration: number) => void;
  handleError: (error: Error) => void;
}

const usePlayer = (
  src: string,
  mediaMeta: MediaMeta
): [PlayerState, PlayerAction, LegacyRef<ReactPlayer>] => {
  const ref = useRef<ReactPlayer>(null);
  const { setVolume, toggleMute } = useAudioStore();
  const { setPlaying, togglePlaying, setLoading } = usePlaybackStore();

  const [state, setState] = useState<PlayerState>({
    url: src,
    played: 0,
    loaded: 0,
    duration: 0,
    seeking: false,
    error: null,
  });

  const handlePlay = useCallback(() => {
    setPlaying(true);
    setLoading(false); // Clear loading state when actually playing
  }, [setPlaying, setLoading]);

  const handlePause = useCallback(() => {
    setPlaying(false);
    setLoading(false); // Clear loading state when paused
  }, [setPlaying, setLoading]);

  const handleProgress = useCallback(({ played, loaded }: { played: number; loaded: number }) => {
    setState(prevState => {
      if (!prevState.seeking) {
        return { ...prevState, played, loaded };
      }
      return prevState;
    });
  }, []);

  const handlePlayPause = useCallback(() => {
    togglePlaying();
  }, [togglePlaying]);

  const handleSeekMouseDown = useCallback(() => {
    setState(prevState => ({ ...prevState, seeking: true }));
  }, []);

  const handleSeekChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({ ...prevState, played: parseFloat(e.target.value) }));
  }, []);

  const handleSeekMouseUp = useCallback((e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setState(prevState => ({ ...prevState, seeking: false }));
    ref.current?.seekTo(parseFloat(e.currentTarget.value));
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  }, [setVolume]);

  const handleMuteToggle = useCallback(() => {
    toggleMute();
  }, [toggleMute]);

  const handleBuffer = useCallback(() => {
    setLoading(true); // Set loading state when buffering
  }, [setLoading]);

  const handleBufferEnd = useCallback(() => {
    setLoading(false); // Clear loading state when buffering ends
  }, [setLoading]);

  const handleDuration = useCallback((duration: number) => {
    setState(prevState => ({ ...prevState, duration }));
  }, []);

  const handleError = useCallback((error: Error) => {
    setState(prevState => ({ ...prevState, error }));
    setLoading(false); // Clear loading state on error
    console.error('Player error:', error);
  }, [setLoading]);

  const action: PlayerAction = {
    handlePlay,
    handlePause,
    handleProgress,
    handlePlayPause,
    handleSeekMouseDown,
    handleSeekChange,
    handleSeekMouseUp,
    handleVolumeChange,
    handleMuteToggle,
    handleBuffer,
    handleBufferEnd,
    handleDuration,
    handleError,
  };

  useMediaSession({
    title: mediaMeta.title,
    artist: mediaMeta.artist,
    artwork: mediaMeta.artwork,
    onPlay: handlePlay,
    onPause: handlePause,
  });

  // Update URL when source changes
  useEffect(() => {
    setState(prevState => ({ 
      ...prevState, 
      url: src,
      // Reset player state when URL changes
      played: 0,
      loaded: 0,
      error: null
    }));
  }, [src]);

  return [state, action, ref];
};

export { usePlayer };
