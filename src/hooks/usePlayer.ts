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

interface MediaSessionActions {
  onPlay?: () => void;
  onPause?: () => void;
}

interface PlayerState {
  url: string | null;
  played: number;
  loaded: number;
  duration: number;
  seeking: boolean;
}

interface PlayerAction {
  handlePlay: () => void;
  handlePause: () => void;
  handleProgress: (state: { played: number }) => void;
  handlePlayPause: () => void;
  handleSeekMouseDown: () => void;
  handleSeekChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSeekMouseUp: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMuteToggle: () => void;
  handleBuffer: () => void;
  handleBufferEnd: () => void;
}

const usePlayer = (
  src: string,
  mediaMeta: MediaMeta,
  mediaSessionActions: MediaSessionActions
): [PlayerState, PlayerAction, LegacyRef<ReactPlayer>] => {
  const ref = useRef<ReactPlayer>(null);
  const { volume, muted, setVolume, toggleMute } = useAudioStore();
  const { playing, setPlaying, togglePlaying, setLoading } = usePlaybackStore();

  const [state, setState] = useState<PlayerState>({
    url: src,
    played: 0,
    loaded: 0,
    duration: 0,
    seeking: false,
  });

  const handlePlay = useCallback(() => {
    setPlaying(true);
    setLoading(true); // Set loading state when playback starts
  }, [setPlaying, setLoading]);

  const handlePause = useCallback(() => {
    setPlaying(false);
  }, [setPlaying]);

  const handleProgress = useCallback(({ played }: { played: number }) => {
    setState(prevState => {
      if (!prevState.seeking) {
        return { ...prevState, played };
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
  };

  useMediaSession({
    title: mediaMeta.title,
    artist: mediaMeta.artist,
    artwork: mediaMeta.artwork,
    onPlay: handlePlay,
    onPause: handlePause,
  });

  useEffect(() => {
    setState(prevState => ({ ...prevState, url: src }));
  }, [src]);

  return [state, action, ref];
};

export { usePlayer };
