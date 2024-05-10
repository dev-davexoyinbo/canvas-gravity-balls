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
        this.requiresUpdate = true;
        this.keepWithinContextBounds = false;
        this.particleOffset = { x: 0, y: 0 };
    }
    IDrawable.prototype.draw = function (ctx) {
        if (!this.requiresUpdate)
            return;
        this._draw(ctx);
        this.requiresUpdate = false;
    };
    IDrawable.prototype.computeKinetics = function (ctx) {
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
        }
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
    };
    return IDrawable;
}());
export { IDrawable };
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(_a) {
        var position = _a.position, velocity = _a.velocity, acceleration = _a.acceleration, radius = _a.radius, strokeStyle = _a.strokeStyle, fillStyle = _a.fillStyle;
        var _this = _super.call(this) || this;
        _this.position = position || { x: 0, y: 0 };
        _this.velocity = velocity || { x: 0, y: 0 };
        _this.acceleration = acceleration || { x: 0, y: 0 };
        _this.radius = radius;
        _this.strokeStyle = strokeStyle || "black";
        _this.fillStyle = fillStyle || "white";
        return _this;
    }
    Circle.prototype._draw = function (ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    };
    return Circle;
}(IDrawable));
export { Circle };
