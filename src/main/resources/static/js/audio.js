define([], function () {

    let audioContext;
    let returnedModule = function() {
        this.init = function() {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioElement = document.querySelector('audio');
            const playButton = document.getElementById('playAudio');
            playButton.addEventListener('click', function() {
                toggleAudio(this, audioElement);
            }, false);
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

}
);