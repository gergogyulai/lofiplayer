import React, { forwardRef } from 'react';
import { usePlayer } from '@/hooks/usePlayer';
import useAudioStore from '@/stores/volume';
import usePlaybackStore from '@/stores/playback';
import { StationType } from "@/lib/stations";
import PlayerIndicatorIcon from '@/components/play-pause';
import ReactPlayer from 'react-player/lazy';
import { motion, AnimatePresence } from 'framer-motion';

const Player = forwardRef<HTMLDivElement, { station: StationType }>(({ station }, ref) => {
  const { volume, muted } = useAudioStore();
  const { playing, togglePlaying, loading } = usePlaybackStore();
  const [isHovered, setIsHovered] = React.useState(false);

  const mediaMeta = {
    title: station.name,
    artist: 'Lofiplayer',
    artwork: [{ src: station.cover, sizes: '96x96', type: 'image/png' }],
  };

  const [state, action, playerRef] = usePlayer(station.streamUrl, mediaMeta);

  const containerVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 1 }
  };

  const imageVariants = {
    initial: { borderRadius: 12 },
    hover: { borderRadius: 16 }
  };

  return (
    <div className="relative z-20 flex flex-col items-center" ref={ref}>
      <ReactPlayer
        ref={playerRef}
        url={state.url || ''}
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={action.handleProgress}
        onPlay={action.handlePlay}
        onPause={action.handlePause}
        onReady={action.handleBufferEnd}
        onBuffer={action.handleBuffer}
        onBufferEnd={action.handleBufferEnd}
        onDuration={action.handleDuration}
        onError={action.handleError}
        className="hidden"
      />
      <div className="rounded-3xl shadow-2xl">
        <motion.div 
          className="overflow-hidden rounded-3xl bg-white/15 p-4 shadow-inner shadow-white/5 backdrop-blur-lg backdrop-brightness-90"
          whileHover="hover"
          whileTap="tap"
          variants={containerVariants}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.button
            onClick={togglePlaying}
            disabled={loading || !!state.error}
            className="group relative flex size-full items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.img
              src={station.cover}
              width={300}
              height={300}
              alt={`${station.name} cover`}
              className={`rounded-xl ${state.error ? 'opacity-50' : ''}`}
              variants={imageVariants}
              transition={{ duration: 0.2 }}
            />
            <AnimatePresence>
              {isHovered && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center rounded-xl text-white"
                  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  animate={{ opacity: 1, backdropFilter: "blur(8px)", borderRadius: 16 }}
                  exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  transition={{ duration: 0.2 }}
                >
                  {state.error ? (
                    <div className="text-red-500">Error loading stream</div>
                  ) : (
                    <PlayerIndicatorIcon playing={playing} loading={loading}/>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
});

Player.displayName = 'Player';

export default Player;
