"use client";

import "./index.css";

import { useCallback, useEffect, useRef, useState } from "react";
import useSound from "use-sound";

import { NextIcon } from "@/icons/next";
import { PauseIcon } from "@/icons/pause";
import { PlayIcon } from "@/icons/play";
import { PreviousIcon } from "@/icons/previous";
import { VolumeIcon } from "@/icons/volume";
import { playlist, Track } from "@/lib/playlist";

interface PlayFunction {
  (): void;
}

interface StopFunction {
  (): void;
}

interface Sound {
  unload: () => void;
  fade?: (from: number, to: number, duration: number) => void;
  volume?: (val?: number) => number | void;
}

interface DraculaRadioProps {
  onPlayingChange?: (isPlaying: boolean) => void;
  onVisibilityChange?: (visible: boolean) => void;
  visible: boolean;
}

const fadeInMs = 240;
const fadeOutMs = 120;

const getNextIndex = (index: number) => (index + 1) % playlist.length;
const getPrevIndex = (index: number) =>
  (index - 1 + playlist.length) % playlist.length;

export const DraculaRadio = ({
  onPlayingChange,
  onVisibilityChange,
  visible
}: DraculaRadioProps) => {
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);

  const isFadingRef = useRef<boolean>(false);
  const shouldAutoplayRef = useRef<boolean>(false);

  const track: Track = playlist[currentTrack];

  const [play, { stop, sound }] = useSound(track.songUrl, {
    volume: 0,
    html5: true,
    onend: () => {
      shouldAutoplayRef.current = true;
      setCurrentTrack((prev) => getNextIndex(prev));
    }
  }) as unknown as [PlayFunction, { stop: StopFunction; sound: Sound | null }];

  const fadeIn = useCallback(() => {
    if (sound?.fade && sound.volume) {
      isFadingRef.current = true;
      sound.volume(0);

      setTimeout(() => {
        sound.fade?.(0, volume, fadeInMs);

        setTimeout(() => {
          isFadingRef.current = false;
        }, fadeInMs);
      }, 10);
    }
  }, [sound, volume]);

  const fadeOut = useCallback(
    (callback: () => void) => {
      if (sound?.fade && !isFadingRef.current) {
        const from =
          typeof sound.volume === "function"
            ? ((sound.volume() as number) ?? volume)
            : volume;
        isFadingRef.current = true;
        sound.fade(from, 0, fadeOutMs);

        setTimeout(() => {
          isFadingRef.current = false;
          callback();
        }, fadeOutMs);
      } else {
        callback();
      }
    },
    [sound, volume]
  );

  const togglePlay = useCallback(() => {
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
      setTimeout(() => {
        fadeIn();
      }, 50);
    }
  }, [isPlaying, fadeOut, stop, play, fadeIn, onVisibilityChange]);

  const handleNext = useCallback(() => {
    onVisibilityChange?.(false);
    if (isPlaying) {
      shouldAutoplayRef.current = true;
      fadeOut(() => {
        stop();
        setCurrentTrack((prev) => getNextIndex(prev));
      });
    } else {
      setCurrentTrack((prev) => getNextIndex(prev));
    }
  }, [onVisibilityChange, isPlaying, fadeOut, stop]);

  const handlePrevious = useCallback(() => {
    onVisibilityChange?.(false);
    if (isPlaying) {
      shouldAutoplayRef.current = true;
      fadeOut(() => {
        stop();
        setCurrentTrack((prev) => getPrevIndex(prev));
      });
    } else {
      setCurrentTrack((prev) => getPrevIndex(prev));
    }
  }, [onVisibilityChange, isPlaying, fadeOut, stop]);

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);

      if (sound && !isFadingRef.current) {
        if (sound.fade) {
          const from =
            typeof sound.volume === "function"
              ? ((sound.volume() as number) ?? newVolume)
              : newVolume;
          sound.fade(from, newVolume, 180);
        } else {
          sound.volume?.(newVolume);
        }
      }
    },
    [sound]
  );

  const handleVolumeEnd = useCallback(() => {
    onVisibilityChange?.(false);
  }, [onVisibilityChange]);

  useEffect(() => {
    onPlayingChange?.(isPlaying);
  }, [isPlaying, onPlayingChange]);

  useEffect(() => {
    return () => {
      sound?.unload();
    };
  }, [sound]);

  useEffect(() => {
    if (shouldAutoplayRef.current && sound) {
      play();
      setIsPlaying(true);
      setTimeout(() => {
        fadeIn();
      }, 50);
      shouldAutoplayRef.current = false;
    }
  }, [sound, play, fadeIn]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!visible) {
        return;
      }

      if (e.target instanceof HTMLInputElement) {
        return;
      }

      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "arrowright":
        case "n":
          e.preventDefault();
          handleNext();
          break;
        case "arrowleft":
        case "p":
          e.preventDefault();
          handlePrevious();
          break;
        case "arrowup":
          e.preventDefault();
          setVolume((v) => Math.min(1, v + 0.1));
          onVisibilityChange?.(false);
          break;
        case "arrowdown":
          e.preventDefault();
          setVolume((v) => Math.max(0, v - 0.1));
          onVisibilityChange?.(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [visible, togglePlay, handleNext, handlePrevious, onVisibilityChange]);

  useEffect(() => {
    if (sound?.volume && !isFadingRef.current && isPlaying) {
      const timeoutId = setTimeout(() => {
        if (!sound?.volume) {
          return;
        }

        if (sound.fade) {
          const currentVol =
            typeof sound.volume === "function"
              ? ((sound.volume() as number) ?? volume)
              : volume;
          sound.fade(currentVol, volume, 180);
        } else if (typeof sound.volume === "function") {
          sound.volume(volume);
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [volume, sound, isPlaying]);

  const characterClassName = track.character.id;
  const visibilityClass = visible ? "visible" : "";

  return (
    <>
      <div
        id="radio-overlay"
        className={visibilityClass}
        onClick={() => onVisibilityChange?.(false)}
      />
      <div
        id="radio"
        className={`${characterClassName} ${visibilityClass}${isPlaying ? " playing" : ""}`}
        role="region"
        aria-label="Dracula Radio"
      >
        <div className="metadata">
          <h3 className="title">{track.thematicTitle}</h3>
          <p className="subtitle">{track.character.displayName}</p>
        </div>
        <div className="controls">
          <div className="navigation">
            <button
              className="button"
              onClick={handlePrevious}
              aria-label="Previous track"
            >
              <PreviousIcon />
            </button>
            <button
              className="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button
              className="button"
              onClick={handleNext}
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
              onMouseUp={handleVolumeEnd}
              onTouchEnd={handleVolumeEnd}
              className="slider"
              style={{
                background: `linear-gradient(90deg, var(--color) 0%, var(--color) ${volume * 100}%, hsla(var(--hue), 12%, 72%, 0.3) ${volume * 100}%)`
              }}
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    </>
  );
};
