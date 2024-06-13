// components/MusicPlayer.js
import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';

const MusicPlayer = () => {
  const [playing, setPlaying] = useState<Boolean>(false);
  const [howl, setHowl] = useState(null);

  useEffect(() => {
    const sound = new Howl({
      src: ['/musics/chrono-corridor.wav'],
      sprite: {
        intro: [0, 11707.36],  // イントロの開始位置と長さ (ミリ秒)
        loop: [11707.36, 77000 - 11707.36, true]  // ループの開始位置、長さ、ループするかどうか
      }
    });
    setHowl(sound);

    return () => {
      sound.unload();
    };
  }, []);

  const handlePlayPause = () => {
    if (!howl) return;

    if (playing) {
      howl.pause();
    } else {
      howl.play('intro');
      howl.once('end', () => {
        if (!playing) return;
        howl.play('loop');
      });
    }
    setPlaying(!playing);
  };

  return (
    <div>
      <button onClick={handlePlayPause}>
        {playing ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default MusicPlayer;
