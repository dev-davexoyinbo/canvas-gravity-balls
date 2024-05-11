var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var IDrawable = (function () {
    function IDrawable() {
        this.keepWithinContextBounds = false;
        this.particleOffset = { x: 0, y: 0 };
        this.frictionOnBounce = { x: 0.8, y: 0.8 };
        this.lastUpdate = new Date().getTime();
    }
    IDrawable.prototype.draw = function (ctx) {
        this._draw(ctx);
        this.computeKinetics(ctx);
    };
    IDrawable.prototype.computeKinetics = function (ctx) {
        if (this.velocity.x == 0 &&
            this.velocity.y == 0 &&
            this.acceleration.x == 0 &&
            this.acceleration.y == 0)
            return;
        var initialVelocity = { x: this.velocity.x, y: this.velocity.y };
        var newUpdateTime = new Date().getTime();
        var secondsPassed = (newUpdateTime - this.lastUpdate) / 1000;
        this.velocity.x += this.acceleration.x * secondsPassed;
        this.velocity.y += this.acceleration.y * secondsPassed;
        var rect = ctx.canvas.getBoundingClientRect();
        if (this.keepWithinContextBounds) {
            if (this.position.x + this.particleOffset.x >= rect.width) {
                this.velocity.x = Math.abs(this.velocity.x) * -1;
            }
            else if (this.position.x - this.particleOffset.x <= 0) {
                this.velocity.x = Math.abs(this.velocity.x);
            }
            if (this.position.y + this.particleOffset.y >= rect.height) {
                this.velocity.y = Math.abs(this.velocity.y) * -1;
            }
            else if (this.position.y - this.particleOffset.y <= 0) {
                this.velocity.y = Math.abs(this.velocity.y);
            }
            if (this.velocity.x * initialVelocity.x < 0) {
                this.velocity.x = this.velocity.x * this.frictionOnBounce.x;
                if (Math.abs(this.velocity.x) < 0.5)
                    this.velocity.x = 0;
            }
            if (this.velocity.y * initialVelocity.y < 0) {
                this.velocity.y = this.velocity.y * this.frictionOnBounce.y;
            }
        }
        this.position.x += this.velocity.x * secondsPassed;
        this.position.y += this.velocity.y * secondsPassed;
        this.lastUpdate = newUpdateTime;
    };
    return IDrawable;
}());
export { IDrawable };
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(_a) {
        var position = _a.position, velocity = _a.velocity, acceleration = _a.acceleration, radius = _a.radius, strokeStyle = _a.strokeStyle, fillStyle = _a.fillStyle, keepWithinContextBounds = _a.keepWithinContextBounds;
        var _this = _super.call(this) || this;
        _this.position = position || { x: 0, y: 0 };
        _this.velocity = velocity || { x: 0, y: 0 };
        _this.acceleration = acceleration || { x: 0, y: 0 };
        _this.radius = radius;
        _this.strokeStyle = strokeStyle || "black";
        _this.fillStyle = fillStyle || "white";
        _this.keepWithinContextBounds = keepWithinContextBounds || false;
        _this.particleOffset = { x: radius, y: radius };
        return _this;
    }
    Circle.prototype._draw = function (ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    };
    return Circle;
}(IDrawable));
export { Circle };
