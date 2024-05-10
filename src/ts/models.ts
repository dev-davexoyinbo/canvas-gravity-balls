export type Vec = {
  x: number;
  y: number;
};

export abstract class IDrawable {
  requiresUpdate: boolean = true;
  keepWithinContextBounds: boolean = false;
  particleOffset: Vec = { x: 0, y: 0 };

  abstract position: Vec;
  abstract velocity: Vec;
  abstract acceleration: Vec;

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.requiresUpdate) return;
    this._draw(ctx);
    this.requiresUpdate = false;
  }

  protected abstract _draw(ctx: CanvasRenderingContext2D): void;
  protected computeKinetics(ctx: CanvasRenderingContext2D) {
    const rect = ctx.canvas.getBoundingClientRect();
    if (this.keepWithinContextBounds) {
      if (this.position.x + this.particleOffset.x >= rect.width) {
        this.velocity.x = Math.abs(this.velocity.x) * -1;
      } else if (this.position.x - this.particleOffset.x <= 0) {
        this.velocity.x = Math.abs(this.velocity.x);
      }

      if (this.position.y + this.particleOffset.y >= rect.height) {
        this.velocity.y = Math.abs(this.velocity.y) * -1;
      } else if (this.position.y - this.particleOffset.y <= 0) {
        this.velocity.y = Math.abs(this.velocity.y);
      }
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
  }
}

export type CircleInitializer = {
    position?: Vec;
    velocity?: Vec;
    acceleration?: Vec;
    radius: number;
    strokeStyle?: string | CanvasGradient | CanvasPattern;
    fillStyle?: string | CanvasGradient | CanvasPattern;
}

export class Circle extends IDrawable {
  position: Vec;
  velocity: Vec;
  acceleration: Vec;
  radius: number;
  strokeStyle: string | CanvasGradient | CanvasPattern;
  fillStyle: string | CanvasGradient | CanvasPattern;

  constructor({ position, velocity, acceleration, radius, strokeStyle, fillStyle }: CircleInitializer) {
    super();
    this.position = position || { x: 0, y: 0 };
    this.velocity = velocity || { x: 0, y: 0 };
    this.acceleration = acceleration || { x: 0, y: 0 };
    this.radius = radius;
    this.strokeStyle = strokeStyle || "black";
    this.fillStyle = fillStyle || "white";
  }

  protected _draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    ctx.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }
}
