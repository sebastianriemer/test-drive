define([], function () {

    function drawTriangle(ctx, img,
        p0, p1, p2,
        u0, v0,
        u1, v1,
        u2, v2) {

        ctx.save();

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.closePath();
        ctx.clip();

        const denom = (u0*(v1 - v2) + u1*(v2 - v0) + u2*(v0 - v1));

        const a = (p0.x*(v1 - v2) + p1.x*(v2 - v0) + p2.x*(v0 - v1)) / denom;
        const b = (p0.y*(v1 - v2) + p1.y*(v2 - v0) + p2.y*(v0 - v1)) / denom;
        const c = (p0.x*(u2 - u1) + p1.x*(u0 - u2) + p2.x*(u1 - u0)) / denom;
        const d = (p0.y*(u2 - u1) + p1.y*(u0 - u2) + p2.y*(u1 - u0)) / denom;
        const e = (p0.x*(u1*v2 - u2*v1) + p1.x*(u2*v0 - u0*v2) + p2.x*(u0*v1 - u1*v0)) / denom;
        const f = (p0.y*(u1*v2 - u2*v1) + p1.y*(u2*v0 - u0*v2) + p2.y*(u0*v1 - u1*v0)) / denom;

        ctx.transform(a, b, c, d, e, f);
        ctx.drawImage(img, 0, 0);

        ctx.restore();
    }

    function drawQuad(ctx, tex, pA, pB, pC, pD, uv) {
        if (!tex || !uv) return;

        drawTriangle(ctx, tex, pA, pB, pC, uv.A.u, uv.A.v, uv.B.u, uv.B.v, uv.C.u, uv.C.v);
        drawTriangle(ctx, tex, pA, pC, pD, uv.A.u, uv.A.v, uv.C.u, uv.C.v, uv.D.u, uv.D.v);
    }

    // 🟢 GRID MODE
//    function drawQuadGrid(ctx, tex, pA, pB, pC, pD) {
//        ctx.strokeStyle = "#ff0000";
//        ctx.lineWidth = 2;
//        ctx.strokeRect(100, 50, 200, 100);
//    }
    function drawQuadGrid(ctx, tex, pA, pB, pC, pD) {
        ctx.save();

        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.lineTo(pC.x, pC.y);
        ctx.lineTo(pD.x, pD.y);
        ctx.closePath();

        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 1;
        ctx.stroke();

        // center cross (debug)
        const cx = (pA.x + pC.x) * 0.5;
        const cy = (pA.y + pC.y) * 0.5;

        ctx.beginPath();
        ctx.moveTo(cx - 2, cy);
        ctx.lineTo(cx + 2, cy);
        ctx.moveTo(cx, cy - 2);
        ctx.lineTo(cx, cy + 2);
        ctx.stroke();

        ctx.restore();
    }

    function uvFront(w, h) {
        return {
            A:{u:0,v:h}, B:{u:w,v:h}, C:{u:w,v:0}, D:{u:0,v:0}
        };
    }

//    function uvLeft(w, h) {
//        return {
//            A:{u:0,v:h}, B:{u:w,v:h}, C:{u:w,v:0}, D:{u:0,v:0}
//        };
//    }
    function uvLeft(w, h) {
            return {
                A:{u:w,v:h}, B:{u:0,v:h}, C:{u:0,v:0}, D:{u:w,v:0}
            };
        }

    function uvRight(w, h) {
        return {
            A:{u:0,v:h},
            B:{u:w,v:h},
            C:{u:w,v:0},
            D:{u:0,v:0}
        };
    }

    function uvFloor(w, h) {
        return {
            A:{u:0,v:0}, B:{u:w,v:0}, C:{u:w,v:h}, D:{u:0,v:h}
        };
    }

    return { drawQuad, drawQuadGrid, uvFront, uvLeft, uvRight, uvFloor };
});