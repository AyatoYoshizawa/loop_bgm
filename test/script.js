const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const introSource = audioContext.createBufferSource();
const loopSource = audioContext.createBufferSource();
const gainNode = audioContext.createGain();
const convolver = audioContext.createConvolver();

// Set gain
gainNode.gain.setValueAtTime(1, audioContext.currentTime);

// Load audio buffers
let introBuffer, loopBuffer, reverbBuffer;

// Load intro
fetch('intro.mp3')
    .then(response => response.arrayBuffer())
    .then(data => audioContext.decodeAudioData(data))
    .then(buffer => {
        introBuffer = buffer;
        introSource.buffer = introBuffer;
        introSource.connect(convolver);
        convolver.connect(gainNode).connect(audioContext.destination);
        introSource.start();
    });

// Load loop
fetch('loop.mp3')
    .then(response => response.arrayBuffer())
    .then(data => audioContext.decodeAudioData(data))
    .then(buffer => {
        loopBuffer = buffer;
        loopSource.buffer = loopBuffer;
        loopSource.loop = true;
    });

// Load reverb impulse response
fetch('reverb-impulse-response.wav')
    .then(response => response.arrayBuffer())
    .then(data => audioContext.decodeAudioData(data))
    .then(buffer => {
        reverbBuffer = buffer;
        convolver.buffer = reverbBuffer;
    });

// Play loop after intro ends
introSource.onended = function() {
    loopSource.connect(convolver);
    convolver.connect(gainNode).connect(audioContext.destination);
    loopSource.start();
};
