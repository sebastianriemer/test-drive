define(['mapManager', 'navigation', 'eventBus'], function (mapManager, navigation, eventBus) {

    const RendererUI = function () {
        this.renderer = null;

        this.init = function (renderer) {
            this.renderer = renderer;

            const bindSlider = (id, key) => {
                const slider = document.getElementById(id);
                slider.value = this.renderer.settings[key];

                const label = document.getElementById(id.replace("Slider", "Value"));
                label.textContent = this.renderer.settings[key];

                slider.addEventListener("input", () => {
                    this.renderer.settings[key] = parseFloat(slider.value);
                    label.textContent = slider.value;
                });
            };

            const bindCheckbox = (id, key) => {
                const checkBox = document.getElementById(id);
                if (this.renderer.settings[key]) checkBox.checked = true;

                checkBox.addEventListener("change", () => {
                    this.renderer.settings[key] = checkBox.checked;
                });
            };

            // bind all
            bindSlider("scaleSlider", "scale");
            bindSlider("horizonSlider", "horizonY");
            bindSlider("stretchSlider", "stretch");
            bindSlider("nearSlider", "near");
            bindSlider("depthSlider", "maxDepth");
            bindSlider("widthSlider", "width");
            bindCheckbox("imageSoothingCheckbox", "imageSmoothingEnabled");
            bindCheckbox("gridModeCheckbox", "gridModeEnabled");
        };

    };

    return new RendererUI();

});