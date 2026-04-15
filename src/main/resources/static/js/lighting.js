define(['logger'], function(log) {

    
    const playerLight = {
        x: 0,
        y: 0,
        radius: 6,
        intensity: 0.35,
        flicker: true
    };
    const LIGHTING_MODES = {
        WORLD: 'WORLD',
        SCREEN: 'SCREEN'
    };
    const LIGHTING_TYPES = {
        SIMPLE_DISTANCE : 0,
        PLAYER_FLICKER : 1,
        DISTANCE_FLICKER: 2
    }
    let currentRenderSettings = {};

    const lighting = {
        getShadeFactor(dx, dy, lightSources) {
            switch (currentRenderSettings.lightingType) {
                case LIGHTING_TYPES.SIMPLE_DISTANCE: return this.getDistanceShade(dx, dy);
                case LIGHTING_TYPES.PLAYER_FLICKER: return this.getPlayerFlickerShade(dx, dy, lightSources);
                case LIGHTING_TYPES.DISTANCE_FLICKER: return this.getDistanceShadeWithFlicker(dx, dy, lightSources);
                default: return 1; // full light
            }
        },
        getDistanceShade: function(dx, dy) {
            const dist = Math.sqrt(dx * dx + dy * dy);

            // weiche, stabile Dämpfung
            const shade = 1 / (1 + dist * 0.2);            
            return shade * 0.35;
        },
        getDistanceShadeWithFlicker: function(dx, dy, lightSources = []) {
            const dist = Math.sqrt(dx * dx + dy * dy);

            // weiche, stabile Dämpfung
            const shade = 1 / (1 + dist * 0.2);
            const base = shade;

             let totalLight = 0;

            for (const light of lightSources) {
                const lx = dx - light.x;
                const ly = dy - light.y;

                let distance = Math.sqrt(lx * lx + ly * ly);
                distance = Math.min(distance, light.radius);

                const normalized = distance / light.radius;

                // 🔥 nicer falloff
                let intensity = Math.pow(1 - normalized, 1.5);

                // scale by light strength
                intensity *= light.intensity;

                // 🔥 flicker (optional per light)
                if (light.flicker) {
                    const time = performance.now() * 0.002;

                    const flicker =
                        Math.sin(time) * 0.03 +
                        Math.sin(time * 1.7 + 1.3) * 0.02 +
                        Math.sin(time * 3.1 + 2.1) * 0.01;

                    intensity += flicker * (1 - normalized);
                }

                totalLight += intensity;
            }

            // clamp + ambient
            const finalLight = Math.max(base, Math.min(1, totalLight));

            return finalLight;
        },
        getPlayerFlickerShade: function(dx, dy, lightSources = []) {
            const max = currentRenderSettings.maxDepth;

            // --- 🌑 Ambient light (minimum visibility) ---
            const ambient = 0.08;

            let totalLight = 0;

            for (const light of lightSources) {
                const lx = dx - light.x;
                const ly = dy - light.y;

                let distance = Math.sqrt(lx * lx + ly * ly);
                distance = Math.min(distance, light.radius);

                const normalized = distance / light.radius;

                // 🔥 nicer falloff
                let intensity = Math.pow(1 - normalized, 1.5);

                // scale by light strength
                intensity *= light.intensity;

                // 🔥 flicker (optional per light)
                if (light.flicker) {
                    const time = performance.now() * 0.002;

                    const flicker =
                        Math.sin(time) * 0.03 +
                        Math.sin(time * 1.7 + 1.3) * 0.02 +
                        Math.sin(time * 3.1 + 2.1) * 0.01;

                    intensity += flicker * (1 - normalized);
                }

                totalLight += intensity;
            }

            // clamp + ambient
            const finalLight = Math.max(ambient, Math.min(1, totalLight));

            return finalLight;
        },
       
        applyShade : function(ctx, quad, shade) {
            ctx.save();

            ctx.globalAlpha = 1 - shade; // darker = more alpha
            ctx.fillStyle = "#000";

            ctx.beginPath();
            ctx.moveTo(quad.pA.x, quad.pA.y);
            ctx.lineTo(quad.pB.x, quad.pB.y);
            ctx.lineTo(quad.pC.x, quad.pC.y);
            ctx.lineTo(quad.pD.x, quad.pD.y);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        },

        renderLighting : function(ctx, camera) {
            if (currentLightingMode !== LIGHTING_MODES.SCREEN) return;
            ctx.save();

            const width = 500;
            const height = 300;

            // 🌑 1. Darkness (leicht reduziert, damit mehr Kontrast möglich ist)
            ctx.fillStyle = "rgba(0,0,0,0.45)";
            ctx.fillRect(0, 0, width, height);

            // 🔥 2. Licht "reinradieren"
            ctx.globalCompositeOperation = "destination-out";

            const lightScreen = {
                x: currentRenderSettings.playerLightX,
                y: currentRenderSettings.playerLightY
            };

            const time = performance.now() * currentRenderSettings.playerLightTime;

            const flicker =
                Math.sin(time) * 4 +
                Math.sin(time * 1.7) * 2;

            const baseRadius = currentRenderSettings.playerLightRadius * 0.5;
            const radius = baseRadius + flicker;

            // =========================
            // 🕯️ 1. KLEINES, STARKES LICHT (Fokus)
            // =========================
            {
                const gradient = ctx.createRadialGradient(
                    lightScreen.x, lightScreen.y, 0,
                    lightScreen.x, lightScreen.y, radius
                );

                gradient.addColorStop(0, "rgba(0,0,0,0.7)");
                gradient.addColorStop(0.2, "rgba(0,0,0,0.5)");
                gradient.addColorStop(0.5, "rgba(0,0,0,0.2)");
                gradient.addColorStop(1, "rgba(0,0,0,0)");

                ctx.fillStyle = gradient;

                ctx.save();

                // 👉 Perspektive reinbringen!
                ctx.translate(lightScreen.x, lightScreen.y);
                ctx.scale(1.0, 0.7);

                ctx.beginPath();
                ctx.arc(0, 0, radius, Math.PI, 2 * Math.PI);
                ctx.lineTo(0, 0);
                ctx.closePath();

                ctx.restore();
                ctx.fill();
            }

            // =========================
            // 🌫️ 2. GROSSES, SCHWACHES LICHT (Ambient)
            // =========================
            {
                const bigRadius = radius * 2;

                const gradient = ctx.createRadialGradient(
                    lightScreen.x, lightScreen.y, 0,
                    lightScreen.x, lightScreen.y, bigRadius
                );

                gradient.addColorStop(0, "rgba(0,0,0,0.5)");
                gradient.addColorStop(0.3, "rgba(0,0,0,0.25)");
                gradient.addColorStop(1, "rgba(0,0,0,0)");

                ctx.fillStyle = gradient;

                ctx.save();
                ctx.translate(lightScreen.x, lightScreen.y);
                ctx.scale(1.0, 0.7);

                ctx.beginPath();
                ctx.arc(0, 0, bigRadius, Math.PI, 2 * Math.PI);
                ctx.lineTo(0, 0);
                ctx.closePath();

                ctx.restore();
                ctx.fill();
            }

            ctx.restore();
        },
        setRenderSettings : function(renderSettings) {
            currentRenderSettings = renderSettings;
        },
        setMode: function(mode) {
             currentLightingMode = mode;
        },
        getMode: function() {
             return currentLightingMode;
        },

        setType: function(type) {
            currentType = type;
        },
        getType: function() {
            return currentType;
        },

        getPlayerLight: function() {
            return playerLight;
        }
    }

    return lighting;
});