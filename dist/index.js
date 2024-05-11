import { canvas, ctx, rootStyle } from "./app.js";
import { Circle } from "./models.js";
import { setCanvasToFullScreen } from "./utils.js";
var drawables = [];
function initialize() {
    drawables.splice(0, drawables.length);
    var circle = new Circle({
        position: { x: 400, y: 400 },
        velocity: { x: 30, y: 50 },
        acceleration: { x: 0, y: 1000 },
        radius: 200,
        strokeStyle: "black",
        fillStyle: "red",
        keepWithinContextBounds: true,
    });
    drawables.push(circle);
}
function animate() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawables.forEach(function (drawable) {
        drawable.draw(ctx);
    });
    requestAnimationFrame(animate);
}
window.addEventListener("resize", function () {
    rootStyle.style.setProperty("--viewport-height", "".concat(window.innerHeight, "px"));
    setCanvasToFullScreen(canvas);
    initialize();
});
setCanvasToFullScreen(canvas);
initialize();
animate();
