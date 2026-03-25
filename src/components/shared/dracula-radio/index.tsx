"use client";

import "./index.css";

import { useCallback, useEffect, useRef, useState } from "react";
import useSound from "use-sound";

import { NextIcon } from "@/icons/next";
import { PauseIcon } from "@/icons/pause";
import { PlayIcon } from "@/icons/play";
import { PreviousIcon } from "@/icons/previous";
import { RadioIcon } from "@/icons/radio";
import { VisualizerIcon } from "@/icons/visualizer";
import { VolumeIcon } from "@/icons/volume";
import { playlist, type Track } from "@/lib/playlist";

interface DraculaRadioProps {
  onPlayingChange?: (isPlaying: boolean) => void;
  onVisibilityChange?: (visible: boolean) => void;
}

interface RadioOverlayProps {
  isVisible: boolean;
  hideOverlay: () => void;
}

interface RadioPanelProps {
  track: Track;
  isVisible: boolean;
  isPlaying: boolean;
  volume: number;
  hideOverlay: () => void;
  handleVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  togglePlay: () => void;
  changeTrack: (direction: "next" | "prev") => void;
}

const fadeInMs = 240;
const fadeOutMs = 120;
const volumeFadeMs = 180;

const getNextIndex = (index: number) => (index + 1) % playlist.length;
const getPrevIndex = (index: number) =>
  (index - 1 + playlist.length) % playlist.length;

const RadioOverlay = ({ isVisible, hideOverlay }: RadioOverlayProps) => {
  return (
    <button
      type="button"
      className={`radio-overlay${isVisible ? " visible" : ""}`}
      onClick={hideOverlay}
      tabIndex={0}
      aria-label="Close radio overlay"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          hideOverlay();
        }
      }}
    />
  );
};

const RadioPanel = ({
  track,
  isVisible,
  isPlaying,
  volume,
  hideOverlay,
  handleVolumeChange,
  togglePlay,
  changeTrack
}: RadioPanelProps) => {
  return (
    <section
      className={`radio-container ${track.character.id}${isVisible ? " visible" : ""}${isPlaying ? " playing" : ""}`}
      aria-label="Dracula Radio"
    >
      <div className="metadata">
        <h3 className="title">{track.thematicTitle}</h3>
        <p className="subtitle">{track.character.displayName}</p>
      </div>
      <div className="controls">
        <div className="navigation">
          <button
            type="button"
            className="button"
            onClick={() => changeTrack("prev")}
            aria-label="Previous track"
          >
            <PreviousIcon />
          </button>
          <button
            type="button"
            className="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            type="button"
            className="button"
            onClick={() => changeTrack("next")}
            aria-label="Next track"
          >
            <NextIcon />
          </button>
        </div>
        <div className="volume-control">
          <VolumeIcon aria-hidden="true" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            onMouseUp={hideOverlay}
            onTouchEnd={hideOverlay}
            className="slider"
            style={{
              background: `linear-gradient(90deg, var(--color) 0%, var(--color) ${volume * 100}%, hsla(var(--hue), 12%, 72%, 0.3) ${volume * 100}%)`
            }}
            aria-label="Volume"
          />
        </div>
      </div>
    </section>
  );
};

export const DraculaRadio = ({
  onPlayingChange,
  onVisibilityChange
}: DraculaRadioProps) => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isVisible, setIsVisible] = useState(false);

  const isFadingRef = useRef(false);
  const shouldAutoplayRef = useRef(false);
  const timeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});

  const track: Track = playlist[currentTrack];

  const clearAllTimeouts = useCallback(() => {
    Object.values(timeoutsRef.current).forEach(clearTimeout);
    timeoutsRef.current = {};
  }, []);

  const setNamedTimeout = useCallback(
    (name: string, callback: () => void, delay: number) => {
      if (timeoutsRef.current[name]) {
        clearTimeout(timeoutsRef.current[name]);
      }
      timeoutsRef.current[name] = setTimeout(callback, delay);
    },
    []
  );

  const getCurrentVolume = useCallback(
    (soundInstance: { volume: unknown }) =>
      typeof soundInstance.volume === "function"
        ? ((soundInstance.volume() as number) ?? volume)
        : volume,
    [volume]
  );

  const [play, { stop, sound }] = useSound(track.songUrl, {
    volume: 0,
    html5: true,
    onend: () => {
      shouldAutoplayRef.current = true;
      setCurrentTrack((prev) => getNextIndex(prev));
    }
  });

  const fadeIn = useCallback(() => {
    if (!sound?.fade || !sound.volume) {
      return;
    }

    isFadingRef.current = true;
    sound.volume(0);

    setNamedTimeout(
      "fadeIn",
      () => {
        sound.fade?.(0, volume, fadeInMs);
        setNamedTimeout(
          "endFade",
          () => {
            isFadingRef.current = false;
          },
          fadeInMs
        );
      },
      12
    );
  }, [sound, volume, setNamedTimeout]);

  const fadeOut = useCallback(
    (callback: () => void) => {
      if (sound?.fade && !isFadingRef.current) {
        isFadingRef.current = true;
        sound.fade(getCurrentVolume(sound), 0, fadeOutMs);
        setNamedTimeout(
          "fadeOut",
          () => {
            isFadingRef.current = false;
            callback();
          },
          fadeOutMs
        );
      } else {
        callback();
      }
    },
    [sound, getCurrentVolume, setNamedTimeout]
  );

  const changeTrack = useCallback(
    (direction: "next" | "prev") => {
      setIsVisible(false);
      onVisibilityChange?.(false);
      const updateFn = direction === "next" ? getNextIndex : getPrevIndex;

      if (isPlaying) {
        shouldAutoplayRef.current = true;
        fadeOut(() => {
          stop();
          setCurrentTrack((prev) => updateFn(prev));
        });
      } else {
        setCurrentTrack((prev) => updateFn(prev));
      }
    },
    [onVisibilityChange, isPlaying, fadeOut, stop]
  );

  const togglePlay = useCallback(() => {
    setIsVisible(false);
    onVisibilityChange?.(false);

    if (isPlaying) {
      shouldAutoplayRef.current = false;
      fadeOut(() => {
        stop();
        setIsPlaying(false);
      });
    } else {
      play();
      setIsPlaying(true);
      setNamedTimeout("togglePlay", fadeIn, 48);
    }
  }, [
    isPlaying,
    fadeOut,
    stop,
    play,
    fadeIn,
    onVisibilityChange,
    setNamedTimeout
  ]);

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);

      if (sound && !isFadingRef.current) {
        if (sound.fade) {
          sound.fade(getCurrentVolume(sound), newVolume, volumeFadeMs);
        } else {
          sound.volume?.(newVolume);
        }
      }
    },
    [sound, getCurrentVolume]
  );

  useEffect(() => {
    onPlayingChange?.(isPlaying);
  }, [isPlaying, onPlayingChange]);

  useEffect(() => {
    return () => {
      sound?.unload();
      clearAllTimeouts();
    };
  }, [sound, clearAllTimeouts]);

  useEffect(() => {
    if (!shouldAutoplayRef.current || !sound) {
      return;
    }

    play();
    setNamedTimeout("autoplay", fadeIn, 48);
    shouldAutoplayRef.current = false;
  }, [sound, play, fadeIn, setNamedTimeout]);

  useEffect(() => {
    if (!sound?.volume || isFadingRef.current || !isPlaying) {
      return;
    }

    const timeoutId = setTimeout(() => {
      if (sound.fade) {
        sound.fade(getCurrentVolume(sound), volume, volumeFadeMs);
      } else if (typeof sound.volume === "function") {
        sound.volume(volume);
      }
    }, 102);

    return () => clearTimeout(timeoutId);
  }, [volume, sound, isPlaying, getCurrentVolume]);

  const handleToggleVisibility = useCallback(() => {
    setIsVisible((prev) => {
      const newValue = !prev;
      onVisibilityChange?.(newValue);
      return newValue;
    });
  }, [onVisibilityChange]);

  const hideOverlay = useCallback(() => {
    setIsVisible(false);
    onVisibilityChange?.(false);
  }, [onVisibilityChange]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (
        !isVisible ||
        e.target instanceof HTMLInputElement ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey ||
        e.shiftKey
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      if (key === " " || key === "k") {
        e.preventDefault();
        togglePlay();
        return;
      }

      if (key === "arrowright" || key === "n") {
        e.preventDefault();
        changeTrack("next");
        return;
      }

      if (key === "arrowleft" || key === "p") {
        e.preventDefault();
        changeTrack("prev");
        return;
      }

      if (key === "arrowup") {
        e.preventDefault();
        setVolume((previousVolume) => Math.min(1, previousVolume + 0.1));
        hideOverlay();
        return;
      }

      if (key === "arrowdown") {
        e.preventDefault();
        setVolume((previousVolume) => Math.max(0, previousVolume - 0.1));
        hideOverlay();
      }
    },
    [isVisible, togglePlay, changeTrack, hideOverlay]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    onVisibilityChange?.(isVisible);
  }, [isVisible, onVisibilityChange]);

  return (
    <>
      <button
        type="button"
        onClick={handleToggleVisibility}
        className="floating-radio-button"
        aria-label={isPlaying ? "Pause radio" : "Play radio"}
      >
        {isPlaying ? <VisualizerIcon /> : <RadioIcon />}
      </button>
      <RadioOverlay isVisible={isVisible} hideOverlay={hideOverlay} />
      <RadioPanel
        track={track}
        isVisible={isVisible}
        isPlaying={isPlaying}
        volume={volume}
        hideOverlay={hideOverlay}
        handleVolumeChange={handleVolumeChange}
        togglePlay={togglePlay}
        changeTrack={changeTrack}
      />
    </>
  );
};
