define(['audioManager'], function (audioManager) {
    const AudioLoader = function () {
        // Define the audio samples to preload
        const sounds = {
            ui: {
                click: '/audio/click.ogg',
                hover: '/audio/hover.ogg',
            },
            intro: {
                start: '/audio/logo_intro2.wav'
            },
            battle: {
                start: '/audio/stinger_drumroll.mp3',
                victory: '/audio/victory.ogg',
                defeat: '/audio/defeat.ogg',
            },
            environment: {
                rain: '/audio/rain.ogg',
                fire: '/audio/fire.ogg',
            },
            party: {
                argh_female_1: '/audio/argh_female_1.ogg',
                argh_male_1: '/audio/argh_male_1.wav',
                argh_male_2: '/audio/argh_male_2.wav',
                argh_male_3: '/audio/argh_male_3.wav',
                argh_male_4: '/audio/argh_male_4.wav',
                argh_male_5: '/audio/argh_male_5.wav',
                argh_male_6: '/audio/argh_male_6.wav',
                dying_male_1: '/audio/dying_male_1.wav',
                ouch_female_1: '/audio/ouch_female_1.wav',
                ouch_male_1: '/audio/ouch_male_1.wav',
                ouch_male_2: '/audio/ouch_male_2.wav',
            },
        };

        // Preload all sounds using the AudioManager
        this.preloadAll = function () {
            const promises = [];
            Object.keys(sounds).forEach(category => {
                Object.entries(sounds[category]).forEach(([key, url]) => {
                    // Pass each sample to AudioManager's loadAudio method
                    promises.push(audioManager.loadAudio(`${category}.${key}`, url));
                });
            });
            return Promise.all(promises); // Return a promise that resolves when all are loaded
        };

        // Optionally expose the sound definitions (if needed elsewhere)
        this.getSounds = function () {
            return sounds;
        };
    };

    return new AudioLoader(); // Return as a singleton
});
