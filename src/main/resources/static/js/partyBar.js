define(['canvas', 'dashBoard', 'partyManager', 'layout'], function (canvas, dashBoard, partyManager, layout) {

    let partyBar = function() {

        this.draw = function() {
            const ctx = canvas.contextHolder.context;
            const r = layout.LAYOUT.partyBar;

            withClipping(ctx, r, () => {
                ctx.save();

                // 🔥 Move origin into party bar
                ctx.translate(r.x, r.y);

                const slotWidth = r.width / 6;
                const portraitSize = 80;

                for (let i = 0; i < 6; i++) {
                    const member = partyManager.partyMembers[i];
                    const x = i * slotWidth;

                    if (member) {
                        drawPortrait(ctx, x, member.portraitImage, portraitSize);
                        printName(ctx, x, member.name);
                        drawHealthBar(ctx, x, member.maximumHealth, member.currentHealth);
                        drawManaBar(ctx, x, member.maximumMana, member.currentMana);
                    } else {
                        drawPortrait(ctx, x, dashBoard.resources.portraitPlaceholderImage, portraitSize);
                        drawHealthBar(ctx, x, 0, 0);
                        drawManaBar(ctx, x, 0, 0);
                    }
                }

                ctx.restore();
            });
        };
    };

    if (!partyBar.instance) {
        partyBar.instance = new partyBar();
    }
    return partyBar.instance;

    // =========================
    // Helpers
    // =========================

    function withClipping(ctx, rect, drawFn) {
        ctx.save();

        ctx.beginPath();
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        ctx.clip();

        drawFn();

        ctx.restore();
    }

    function drawPortrait(ctx, x, image, size) {
        if (!image) return;
        ctx.drawImage(image, x , 5, size, size);
    }

    function printName(ctx, x, name) {
        if (!name) return;

        ctx.fillStyle = '#ffd800';
        ctx.strokeStyle = '#000000';
        ctx.font = "18px metalMania";
        ctx.textAlign = "center";

        const textX = x + 50;
        const textY = 95;

        ctx.fillText(name, textX, textY);
        ctx.strokeText(name, textX, textY);
    }

    function drawHealthBar(ctx, x, max, current) {
        const fullHeight = 80;
        const barX = x + 80;
        const barY = 5;

        ctx.fillStyle = '#ee8888';
        ctx.fillRect(barX, barY, 8, fullHeight);

        if (max > 0) {
            const currentHeight = fullHeight * (current / max);
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(barX, barY + (fullHeight - currentHeight), 8, currentHeight);
        }
    }

    function drawManaBar(ctx, x, max, current) {
        const fullHeight = 80;
        const barX = x + 90;
        const barY = 5;

        ctx.fillStyle = '#8888ee';
        ctx.fillRect(barX, barY, 8, fullHeight);

        if (max > 0) {
            const currentHeight = fullHeight * (current / max);
            ctx.fillStyle = '#0000ff';
            ctx.fillRect(barX, barY + (fullHeight - currentHeight), 8, currentHeight);
        }
    }

});