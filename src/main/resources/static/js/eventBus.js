define([], function () {
    const EventBus = function () {
        const events = {};

        this.on = function (event, callback) {
            if (!events[event]) {
                events[event] = [];
            }
            events[event].push(callback);
        };

        this.emit = function(event, ...args) {
            if (!events[event]) return;

            events[event].forEach(cb => {
                try {
                    cb(...args);
                } catch(e) {
                    console.error("EventBus error in", event, e);
                }
            });
        };
    };

    return new EventBus(); // Singleton instance
});
