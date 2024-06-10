import React, { useState } from 'react';
import { Howl } from 'howler';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    let sound = null;

    const handleTogglePlay = () => {
        if (isPlaying) {
            sound.pause();
        } else {
            sound.play();
        }
        setIsPlaying(!isPlaying);
    };

    sound = new Howl({
        src: ['/musics/c2.mp3'],
        html5: true,
        loop: false,
        autoplay: false,
        onplay: () => {
            setIsPlaying(true);
        },
        onpause: () => {
            setIsPlaying(false);
        },
        onstop: () => {
            setIsPlaying(false);
        },
        onloaderror: (id, error) => {
            console.error('Sound load error:', error);
        }
    });

    return (
        <div>
            <button onClick={handleTogglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        </div>
    );
};

export default MusicPlayer;
