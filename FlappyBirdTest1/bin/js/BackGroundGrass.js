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
var BackGroundGrass = /** @class */ (function (_super) {
    __extends(BackGroundGrass, _super);
    function BackGroundGrass() {
        var _this = _super.call(this) || this;
        _this.speed = 1;
        _this.imgWidth = 1920;
        _this.ground1.x -= _this.speed;
        _this.ground2.x -= _this.speed;
        if (_this.ground1.x < -_this.imgWidth) {
            _this.ground1.x = _this.ground2.x + _this.imgWidth;
        }
        if (_this.ground2.x < -_this.imgWidth) {
            _this.ground2.x = _this.ground1.x + _this.imgWidth;
        }
        return _this;
    }
    return BackGroundGrass;
}(ui.backGroundUI));
//# sourceMappingURL=BackGroundGrass.js.map