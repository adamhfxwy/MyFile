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
var BackGroundSky = /** @class */ (function (_super) {
    __extends(BackGroundSky, _super);
    function BackGroundSky() {
        var _this = _super.call(this) || this;
        _this.speed = 1;
        _this.imgWidth = 1920;
        Laya.timer.loop(10, _this, function () {
            this.bg1.x -= this.speed;
            this.bg2.x -= this.speed;
            this.ground1.x -= this.speed;
            this.ground2.x -= this.speed;
            if (this.bg1.x < -this.imgWidth) {
                this.bg1.x = this.bg2.x + this.imgWidth;
            }
            if (this.ground1.x < -this.imgWidth) {
                this.ground1.x = this.ground2.x + this.imgWidth;
            }
            if (this.bg2.x < -this.imgWidth) {
                this.bg2.x = this.bg1.x + this.imgWidth;
            }
            if (this.ground2.x < -this.imgWidth) {
                this.ground2.x = this.ground1.x + this.imgWidth;
            }
        });
        return _this;
    }
    return BackGroundSky;
}(ui.backGroundUI));
//# sourceMappingURL=BackGroundSky.js.map