const ctx = new AudioContext();
let audio;

fetch("./sounds/c2.mp3")
    .then(data => data.arrryBuffer())
    .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
    .then(decodedAudio => {
        audio = decodedAudio;
    });

const playback = () => {
    const playSound = ctx.createBufferSource();
    playSound.buffer = audio;
    playSound.connect(ctx.destination);
    playSound.start(ctx.currentTime);
}

window.addEventListener('mousedown', playback);