import { useEffect, useCallback, useState } from 'react';
import useAudioStore from '@/stores/volume';
import usePlaybackStore from '@/stores/playback';
import useMenuStore from '@/stores/menus';
import { useSettingsStore } from '@/stores/settings';
import { motion, AnimatePresence } from 'framer-motion';

const GlobalKeyboardShortcuts: React.FC = () => {
  const { togglePlaying } = usePlaybackStore();
  const { disableKeybinds } = useSettingsStore();
  const { volume, setVolume, muted, toggleMute } = useAudioStore();
  const { toggleSettingsMenu, toggleStationsMenu, toggleCommandMenu } = useMenuStore();
  const [activeShortcut, setActiveShortcut] = useState<string | null>(null);

  // Setup effect to handle the timeout when activeShortcut changes
  useEffect(() => {
    let timeoutId: number | undefined;
    
    if (activeShortcut) {
      // Set timeout to clear the shortcut after 2 seconds
      timeoutId = window.setTimeout(() => {
        setActiveShortcut(null);
      }, 2000);
    }
    
    // Clean up the timeout when the component unmounts or activeShortcut changes
    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [activeShortcut]);

  const showShortcutNotification = useCallback((shortcutName: string) => {
    setActiveShortcut(shortcutName);
  }, []);

  const adjustVolume = useCallback((change: number) => {
    const newVolume = Math.min(1, Math.max(0, volume + change));
    if (muted && newVolume > 0) {
      toggleMute();
    }
    setVolume(newVolume);
    if (newVolume === 0 && !muted) {
      toggleMute();
    }
    showShortcutNotification(change > 0 ? 'Volume Up' : 'Volume Down');
  }, [volume, muted, setVolume, toggleMute, showShortcutNotification]);

  const handleKeyDown = useCallback((evt: KeyboardEvent) => {
    const { key, metaKey, target } = evt;

    if (target instanceof HTMLElement && (target.nodeName === "INPUT" || target.nodeName === "TEXTAREA")) {
      return;
    }

    if (disableKeybinds) {
      return;
    }

    switch (key.toLowerCase()) {
      case 'arrowup':
        adjustVolume(0.1);
        break;
      case 'arrowdown':
        adjustVolume(-0.1);
        break;
      case 'm':
        toggleMute();
        showShortcutNotification('Mute Toggle');
        break;
      case 'p':
        togglePlaying();
        showShortcutNotification('Play/Pause Toggle');
        break;
      case 's':
        toggleStationsMenu();
        break;
      case 'k':
        if (metaKey) {
          toggleCommandMenu();
        }
        break;
      case 'j':
        if (metaKey) {
          toggleSettingsMenu();
        }
        break;
      default:
        break;
    }
  }, [disableKeybinds, adjustVolume, toggleMute, showShortcutNotification, togglePlaying, toggleStationsMenu, toggleCommandMenu, toggleSettingsMenu]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const show = false;

  if (!show) {
    return null;
  }
  
  return (
    <>
      <AnimatePresence mode="wait">
        {activeShortcut && (
          <motion.div 
            key="shortcut-indicator"
            className="fixed bottom-24 left-1/2 z-50"
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            transition={{ 
              duration: 0.2, 
              type: "spring", 
              stiffness: 200,
              exit: { duration: 0.15, type: "tween" } 
            }}
          >
            <motion.div 
              className="rounded-full backdrop-blur-2xl backdrop-brightness-90 bg-white/10 shadow-inner shadow-white/10 px-4 py-2 text-center"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 15,
                exit: { duration: 0.15, type: "tween" }
              }}
            >
              {activeShortcut}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalKeyboardShortcuts;
