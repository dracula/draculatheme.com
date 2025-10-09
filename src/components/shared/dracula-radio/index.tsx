"use client";

import "./index.css";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useSound from "use-sound";

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

const getNextIndex = (index: number) => (index + 1) % playlist.length;
const getPrevIndex = (index: number) =>
  (index - 1 + playlist.length) % playlist.length;

const FADE_IN_MS = 240;
const FADE_OUT_MS = 120;

export const DraculaRadio = () => {
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
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

  const fadeIn = () => {
    if (sound && sound.fade) {
      isFadingRef.current = true;
      if (sound.volume) {
        sound.volume(0);
      }
      sound.fade(0, volume, FADE_IN_MS);
      setTimeout(() => {
        isFadingRef.current = false;
      }, FADE_IN_MS);
    }
  };

  const fadeOut = (callback: () => void) => {
    if (sound && sound.fade && !isFadingRef.current) {
      const from =
        typeof sound.volume === "function"
          ? ((sound.volume() as number) ?? volume)
          : volume;
      isFadingRef.current = true;
      sound.fade(from, 0, FADE_OUT_MS);
      setTimeout(() => {
        isFadingRef.current = false;
        callback();
      }, FADE_OUT_MS);
    } else {
      callback();
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unload();
      }
    };
  }, [sound]);

  useEffect(() => {
    if (shouldAutoplayRef.current && sound) {
      if (sound.volume) {
        sound.volume(0);
      }
      play();
      setIsPlaying(true);
      fadeIn();
      shouldAutoplayRef.current = false;
    }
  }, [sound, play]);

  const togglePlay = () => {
    if (isPlaying) {
      shouldAutoplayRef.current = false;
      fadeOut(() => {
        stop();
        setIsPlaying(false);
      });
    } else {
      if (sound && sound.volume) {
        sound.volume(0);
      }
      play();
      setIsPlaying(true);
      fadeIn();
    }
  };

  const handleNext = () => {
    if (isPlaying) {
      shouldAutoplayRef.current = true;
      fadeOut(() => {
        stop();
        setCurrentTrack((prev) => getNextIndex(prev));
      });
    } else {
      setCurrentTrack((prev) => getNextIndex(prev));
    }
  };

  const handlePrevious = () => {
    if (isPlaying) {
      shouldAutoplayRef.current = true;
      fadeOut(() => {
        stop();
        setCurrentTrack((prev) => getPrevIndex(prev));
      });
    } else {
      setCurrentTrack((prev) => getPrevIndex(prev));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (sound && !isFadingRef.current) {
      if (sound.fade) {
        const from =
          typeof sound.volume === "function"
            ? ((sound.volume() as number) ?? newVolume)
            : newVolume;
        sound.fade(from, newVolume, 180);
      } else if (sound.volume) {
        sound.volume(newVolume);
      }
    }
  };

  const characterImages: Record<Track["character"], string> = {
    Blade: "/characters/blade.jpg",
    Buffy: "/characters/buffy.jpg",
    "Abraham Lincoln": "/characters/lincoln.jpg",
    Morbius: "/characters/morbius.jpg",
    "Van Helsing": "/characters/van-helsing.jpg",
    Alucard: "/characters/alucard.jpg"
  };

  return (
    <div id="dracula-radio" className={isPlaying ? "playing" : ""}>
      <Image
        src={characterImages[track.character]}
        alt={track.character}
        className="cover-image"
        width={80}
        height={80}
      />
      <div className="song-info">
        {isPlaying && <div className="equalizer" />}
        <h3 className="title">{track.thematicTitle}</h3>
        <p className="artists">{track.artist}</p>
      </div>
      <div className="controls">
        <button className="control-button" onClick={handlePrevious}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        </button>
        <button className="control-button play-button" onClick={togglePlay}>
          {isPlaying ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button className="control-button" onClick={handleNext}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M16 18h2V6h-2v12zM6 18l8.5-6L6 6v12z" />
          </svg>
        </button>
      </div>
      {isPlaying && (
        <div className="volume-control">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      )}
    </div>
  );
};
