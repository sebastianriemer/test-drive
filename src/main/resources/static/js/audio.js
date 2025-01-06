define([], function () {

    let audioContext;
    let returnedModule = function() {
        this.init = function() {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const backgroundMusic1 = document.querySelector('#backgroundMusic1');
            const sampleAh = document.querySelector('#sampleAh');
            const sampleBattleStart = document.querySelector('#battleStart');
            const playButton = document.getElementById('playAudio');
            playButton.addEventListener('click', function() {
                toggleAudio(this, backgroundMusic1);
            }, false);
        }
        this.playAh = function(sampleNameNotYetUseable) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            let track;
            if (!audioContext) {
             audioContext = new AudioContext();
             track = audioContext.createMediaElementSource(sampleAh);
             track.connect(audioContext.destination);
            }
           /* if (audioContext.state === 'suspended') {
             audioContext.resume();
            }*/
            //if (!that.dataset.playing) {
             sampleAh.play();
             //that.dataset.playing = 'true';
            /*} else {
             audioContext.suspend();
             that.dataset.playing = 'false';
            }*/
           /* audioElement.addEventListener('ended', () => {
             playButton.dataset.playing = 'false';
            }, false);*/
        }
         this.playBattleStart = function(sampleNameNotYetUseable) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            let track;
            if (!audioContext) {
             audioContext = new AudioContext();
             track = audioContext.createMediaElementSource(sampleBattleStart);
             track.connect(audioContext.destination);
            }
            sampleBattleStart.play();
        }
    };

    function toggleAudio(that, audioElement) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        let track;
        if (!audioContext) {
         audioContext = new AudioContext();
         track = audioContext.createMediaElementSource(audioElement);
         track.connect(audioContext.destination);
        }
        if (audioContext.state === 'suspended') {
         audioContext.resume();
        }
        if (!that.dataset.playing) {
         audioElement.play();
         that.dataset.playing = 'true';
        } else {
         audioContext.suspend();
         that.dataset.playing = 'false';
        }
        audioElement.addEventListener('ended', () => {
         playButton.dataset.playing = 'false';
        }, false);
    }

    return returnedModule;
});