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
var GameObject = /** @class */ (function (_super) {
    __extends(GameObject, _super);
    function GameObject() {
        var _this = _super.call(this) || this;
        _this.speedY = 0; // 物体的垂直速度
        _this.gravity = 0.98; // 重力加速度
        _this.groundY = 500; // 地面的 y 坐标
        _this.isOnGround = false; // 判断物体是否在地面上
        _this.bird.pos(100, 100); // 设置初始位置
        // 每帧更新物体状态
        Laya.timer.frameLoop(1, _this, _this.update);
        // 监听鼠标点击事件，触发跳跃
        Laya.stage.on(Laya.Event.MOUSE_DOWN, _this, _this.jump);
        return _this;
    }
    GameObject.prototype.update = function () {
        // 如果物体不在地面上，应用重力
        if (!this.isOnGround) {
            this.speedY += this.gravity; // 重力影响速度
            this.y += this.speedY; // 根据速度更新物体的 y 坐标
        }
        // 检查是否与地面碰撞
        if (this.y >= this.groundY) {
            this.y = this.groundY; // 保持在地面上
            this.speedY = 0; // 停止垂直速度
            this.isOnGround = true; // 标记物体已经在地面上
        }
    };
    // 使物体跳跃的方法
    GameObject.prototype.jump = function () {
        if (this.isOnGround) {
            this.speedY = -105; // 设置向上的速度
            this.isOnGround = false; // 标记物体离开地面
        }
    };
    return GameObject;
}(ui.gameUI));
//# sourceMappingURL=GameObject.js.map