define([], function () {
    const AudioManager = function () {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        const buffers = {};
        const audioElements = {};

        // Load and decode audio
        this.loadAudio = function (key, url) {
            return fetch(url)
                .then(response => response.arrayBuffer())
                .then(audioData => audioContext.decodeAudioData(audioData))
                .then(buffer => {
                    buffers[key] = buffer;
                })
                .catch(err => {
                    console.warn(`Failed to load ${key}:`, err);
                    const audioElement = new Audio(url);
                    audioElements[key] = audioElement;
                });
        };

        // Play a sound
        this.play = function (key) {
            if (buffers[key]) {
                const source = audioContext.createBufferSource();
                source.buffer = buffers[key];
                source.connect(audioContext.destination);
                source.start(0);
            } else if (audioElements[key]) {
                const clone = audioElements[key].cloneNode();
                clone.play();
            } else {
                console.warn(`Audio "${key}" not loaded.`);
            }
        };
    };

    return new AudioManager();
});
