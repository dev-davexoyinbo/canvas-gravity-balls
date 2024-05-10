import { canvas, ctx, rootStyle } from "./app.js";
import { Circle, IDrawable } from "./models.js";
import { setCanvasToFullScreen } from "./utils.js";

const drawables: IDrawable[] = [];

function initialize() {
  const circle = new Circle({
    position: { x: 100, y: 100 },
    velocity: { x: 1, y: 0 },
    acceleration: { x: 0, y: 0 },
    radius: 200,
    strokeStyle: "black",
    fillStyle: "red",
    keepWithinContextBounds: true,
  });
  drawables.push(circle);
}

function animate() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  drawables.forEach((drawable) => {
    drawable.draw(ctx);
  });


  requestAnimationFrame(animate);
}
window.addEventListener("resize", () => {
  rootStyle.style.setProperty("--viewport-height", `${window.innerHeight}px`);
  setCanvasToFullScreen(canvas)
  initialize();
});

setCanvasToFullScreen(canvas);

initialize();
animate();