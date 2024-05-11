export type Vec = {
  x: number;
  y: number;
};

export abstract class IDrawable {
  //   requiresUpdate: boolean = true;
  keepWithinContextBounds: boolean = false;
  particleOffset: Vec = { x: 0, y: 0 };
  frictionOnBounce: Vec = { x: 0.8, y: 0.8 };
  lastUpdate: number = new Date().getTime();

  abstract position: Vec;
  abstract velocity: Vec;
  abstract acceleration: Vec;

  draw(ctx: CanvasRenderingContext2D): void {
    // if (!this.requiresUpdate) return;
    this._draw(ctx);
    this.computeKinetics(ctx);
    // this.requiresUpdate = false;
  }

  protected abstract _draw(ctx: CanvasRenderingContext2D): void;
  /**
   * Computes the new position, velocity, and acceleration of the current
   * instance based on the canvas context bounds.
   * @param {CanvasRenderingContext2D} ctx the canvas context
   */
  protected computeKinetics(ctx: CanvasRenderingContext2D) {
    // If there is no velocity and acceleration, no need to compute.
    if (
      this.velocity.x == 0 &&
      this.velocity.y == 0 &&
      this.acceleration.x == 0 &&
      this.acceleration.y == 0
    )
      return;
    const initialVelocity: Vec = { x: this.velocity.x, y: this.velocity.y };
    const newUpdateTime = new Date().getTime();

    const secondsPassed = (newUpdateTime - this.lastUpdate) / 1000;

    // Update the velocity.
    this.velocity.x += this.acceleration.x * secondsPassed;
    this.velocity.y += this.acceleration.y * secondsPassed;

    const rect = ctx.canvas.getBoundingClientRect();
    // If the object is supposed to be kept within the context bounds.
    if (this.keepWithinContextBounds) {
      // If the object is outside the context bounds on the x-axis.
      if (this.position.x + this.particleOffset.x >= rect.width) {
        // Reverse the velocity on the x-axis.
        this.velocity.x = Math.abs(this.velocity.x) * -1;
      } else if (this.position.x - this.particleOffset.x <= 0) {
        // If the object is outside the context bounds on the x-axis.
        this.velocity.x = Math.abs(this.velocity.x);
      }

      // If the object is outside the context bounds on the y-axis.
      if (this.position.y + this.particleOffset.y >= rect.height) {
        // Reverse the velocity on the y-axis.
        this.velocity.y = Math.abs(this.velocity.y) * -1;
      } else if (this.position.y - this.particleOffset.y <= 0) {
        // If the object is outside the context bounds on the y-axis.
        this.velocity.y = Math.abs(this.velocity.y);
      }

      // If the velocity on the x-axis changed sign, apply friction.
      if (this.velocity.x * initialVelocity.x < 0) {
        this.velocity.x = this.velocity.x * this.frictionOnBounce.x;
        if(Math.abs(this.velocity.x) < 0.5) this.velocity.x = 0;
      }

      // If the velocity on the y-axis changed sign, apply friction.
      if (this.velocity.y * initialVelocity.y < 0) {
        this.velocity.y = this.velocity.y * this.frictionOnBounce.y;
      }
    }

    
    // Update the position.
    this.position.x += this.velocity.x * secondsPassed;
    this.position.y += this.velocity.y * secondsPassed;

    this.lastUpdate = newUpdateTime;
  }
}

export type CircleInitializer = {
  position?: Vec;
  velocity?: Vec;
  acceleration?: Vec;
  radius: number;
  strokeStyle?: string | CanvasGradient | CanvasPattern;
  fillStyle?: string | CanvasGradient | CanvasPattern;
  keepWithinContextBounds?: boolean;
};

export class Circle extends IDrawable {
  position: Vec;
  velocity: Vec;
  acceleration: Vec;
  radius: number;
  strokeStyle: string | CanvasGradient | CanvasPattern;
  fillStyle: string | CanvasGradient | CanvasPattern;

  constructor({
    position,
    velocity,
    acceleration,
    radius,
    strokeStyle,
    fillStyle,
    keepWithinContextBounds,
  }: CircleInitializer) {
    super();
    this.position = position || { x: 0, y: 0 };
    this.velocity = velocity || { x: 0, y: 0 };
    this.acceleration = acceleration || { x: 0, y: 0 };
    this.radius = radius;
    this.strokeStyle = strokeStyle || "black";
    this.fillStyle = fillStyle || "white";
    this.keepWithinContextBounds = keepWithinContextBounds || false;
    this.particleOffset = { x: radius, y: radius };
  }

  protected _draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }
}
