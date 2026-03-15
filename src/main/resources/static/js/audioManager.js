define(['eventBus', 'gameState'], function (eventBus, gameState) {
    const AudioManager = function () {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        const buffers = {};
        const audioElements = {};

        eventBus.on('partyBumpedWall', () => {
            const firstPartyMember = gameState.getFirstPartyMember();
            const sound = firstPartyMember.gender === 'MALE' ? 'party.ouch_male_1' : 'party.ouch_female_1';
            this.play(sound);
        });

        eventBus.on('battleStart', () => {
           // TODO: Sebi hier musst du dann das Geräusch für den Kampfbeginn abspielen!
        });

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
