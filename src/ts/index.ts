import { canvas, ctx, rootStyle } from "./app.js";
import { Circle, IDrawable, Vec } from "./models.js";
import { getRandomNumber, setCanvasToFullScreen } from "./utils.js";

const drawables: IDrawable[] = [];

function initialize() {
  drawables.splice(0, drawables.length);

  const frictionOnBounce: Vec = { x: 0.05, y: 0.1 };
  const rect = ctx.canvas.getBoundingClientRect();

  for (let i = 0; i < 10; i++) {
    const radius = getRandomNumber(20, 70);
    const position: Vec = {
      x: getRandomNumber(radius, rect.width - radius),
      y: getRandomNumber(radius, rect.height - radius),
    };
    const velocity: Vec = {
      x: getRandomNumber(10, 70),
      y: getRandomNumber(10, 70),
    };

    console.log(position)
    drawables.push(
      new Circle({
        position,
        velocity,
        acceleration: { x: 0, y: 1000 },
        radius,
        frictionOnBounce,
        strokeStyle: "black",
        fillStyle: "red",
        keepWithinContextBounds: true,
      })
    );
  }
} //end initialize

function animate() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  drawables.forEach((drawable) => {
    drawable.draw(ctx);
  });

  requestAnimationFrame(animate);
}
window.addEventListener("resize", () => {
  rootStyle.style.setProperty("--viewport-height", `${window.innerHeight}px`);
  setCanvasToFullScreen(canvas);
  initialize();
});

setCanvasToFullScreen(canvas);

initialize();
animate();
