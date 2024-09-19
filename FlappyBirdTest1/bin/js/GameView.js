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
var GameView = /** @class */ (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this.speed = 15;
        _this.imgWidth = 1920;
        _this.ranTime = 2000;
        _this.time = 0;
        _this.columns = []; // 保存生成的柱子
        _this.columnGapMin = 245;
        _this.columnGapMax = 348;
        _this.addScore = 0;
        _this.max = 3000;
        _this.min = 2500;
        _this.columnPrefab = _this.getChildByName("column");
        _this.ground1.zOrder = 0;
        _this.ground2.zOrder = 0;
        _this.bg1.zOrder = -2;
        _this.bg2.zOrder = -2;
        _this.columnPrefab.visible = false;
        var gameStartCallBackHandler = Laya.Handler.create(_this, _this.startRunBack);
        var gameOverCallBackHandler = Laya.Handler.create(_this, _this.gameOver, null, false);
        _this.birdState = new Bird(_this.bird, gameStartCallBackHandler, gameOverCallBackHandler);
        _this.btn_reStart.visible = false;
        _this.btn_reStart.on(Laya.Event.CLICK, _this, _this.startRunBack);
        return _this;
    }
    GameView.prototype.startRunBack = function () {
        this.speed = 5;
        this.max = this.getRandom(1500, 2000);
        this.min = this.getRandom(1500, 2000);
        this.score = 0;
        this.addScore = 0;
        this.updateScoreNumsUI();
        this.birdState.reset();
        // 清除所有柱子
        for (var i = this.columns.length - 1; i >= 0; i--) {
            var columnPair = this.columns[i];
            columnPair.removeSelf(); // 从舞台中移除
        }
        this.columns = []; // 清空柱子数组
        this.btn_reStart.visible = false;
        this.birdState.start();
        Laya.timer.loop(20, this, this.onLoop);
        // 每帧调用 onUpdate 方法，生成柱子和更新游戏状态
        Laya.timer.frameLoop(1, this, this.onUpdate);
    };
    GameView.prototype.gameOver = function () {
        Laya.timer.clear(this, this.onLoop);
        Laya.timer.clear(this, this.onUpdate);
        this.btn_reStart.visible = true;
    };
    GameView.prototype.onLoop = function () {
        this.bg1.x -= this.speed;
        this.bg2.x -= this.speed;
        this.ground1.x -= this.speed;
        this.ground2.x -= this.speed;
        if (this.bg1.x < -this.imgWidth) {
            this.bg1.x = this.bg2.x + this.imgWidth;
        }
        if (this.bg2.x < -this.imgWidth) {
            this.bg2.x = this.bg1.x + this.imgWidth;
        }
        if (this.ground1.x < -this.imgWidth) {
            this.ground1.x = this.ground2.x + this.imgWidth;
        }
        if (this.ground2.x < -this.imgWidth) {
            this.ground2.x = this.ground1.x + this.imgWidth;
        }
        // 移动生成的柱子
        for (var i = this.columns.length - 1; i >= 0; i--) {
            var columnPair = this.columns[i];
            columnPair.x -= this.speed;
            columnPair.zOrder = -1;
            // 如果柱子超出了屏幕左边界，移除
            if (columnPair.x + columnPair.width < 0) {
                columnPair.removeSelf();
                this.columns.splice(i, 1);
            }
        }
    };
    GameView.prototype.onUpdate = function () {
        this.time += Laya.timer.delta;
        if (this.time >= this.ranTime) {
            this.time = 0;
            this.ranTime = this.getRandom(this.min, this.max);
            this.spaw();
        }
        // 碰撞检测
        this.checkCollision();
    };
    GameView.prototype.checkCollision = function () {
        for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            if (this.birdState.checkCollision(column)) {
                // 如果检测到碰撞，触发游戏结束   
                //this.birdState.isGameOver = true;          
                break;
            }
            // 检测通过
            if (!column['hasPassed'] && this.birdState.checkPass(column)) { // 只有没有通过过的柱子才加分         
                this.score += 100;
                this.addScore = this.score;
                column['hasPassed'] = true; // 标记该柱子已经通过，防止重复加分
                this.updateScoreNumsUI();
                Laya.SoundManager.playSound("comp/下坠的小鸟（flappy bird）-像素鸟PC版-提示音_爱给网_aigei_com.mp3", 1); // 第二个参数传入 1 表示播放一次
                if (Math.floor(this.addScore % 300) === 0) {
                    // 增加飞行速度
                    this.speed += 0.5;
                    // 调整柱子生成的 X 轴间隔，使其随着速度增加而缩小
                    // 设置间隔的最小值，防止间隔过小
                    var minInterval = 300; // 最小间隔
                    var maxInterval = 500; // 最大间隔
                    // 根据速度计算缩小的间隔值
                    var intervalReduction = Math.min(100, this.speed * 2); // 根据速度减少间隔
                    if (this.speed >= 10) {
                        // 更新最大和最小间隔值
                        this.max = Math.max(minInterval + intervalReduction, maxInterval - intervalReduction);
                        this.min = Math.max(minInterval, minInterval + intervalReduction / 2); // 确保最小间隔不小于 minInterval
                    }
                }
                break;
            }
        }
    };
    GameView.prototype.getRandom = function (min, max) {
        var ranValue = 0;
        if (max > min) {
            ranValue = Math.random() * (max - min);
            ranValue += min;
        }
        else {
            ranValue = Math.random() * (max - min);
            ranValue += max;
        }
        return ranValue;
    };
    //  private spaw(): void {
    //     // 随机生成柱子的 y 坐标
    //     const topY = this.getRandom(300, 600 - this.columnGapMax);
    //     const gap = this.getRandom(this.columnGapMin, this.columnGapMax);
    //     const bottomY = topY + gap;
    //     // 生成上柱子
    //     const topColumn = this.createColumn();
    //     topColumn.y = topY;
    //     topColumn.rotation = 180; // 上柱子倒置
    //     // 生成下柱子
    //     const bottomColumn = this.createColumn();
    //     bottomColumn.y = bottomY;
    //     bottomColumn.rotation = 0; // 下柱子正常放置
    //     // 将生成的柱子添加到场景和列表中
    //     this.columns.push(topColumn);
    //     this.columns.push(bottomColumn);
    //     // 添加到场景中
    //     this.addChild(topColumn);
    //     this.addChild(bottomColumn);
    // }
    GameView.prototype.spaw = function () {
        // 随机生成柱子的 y 坐标
        var topY = this.getRandom(300, 600 - this.columnGapMax);
        // 随机生成上下柱子间距
        var gap = this.getRandom(this.columnGapMin, this.columnGapMax);
        // 下柱子的 y 坐标根据随机间距生成
        var bottomY = topY + gap;
        // 随机生成柱子的 x 坐标偏移量（可以根据需要调整范围）
        var randomXOffset = this.getRandom(-50, 50);
        // 生成上柱子
        var topColumn = this.createColumn();
        topColumn.y = topY;
        topColumn.x = this.imgWidth + randomXOffset; // 给上柱子设置随机的 x 偏移
        topColumn.rotation = 180; // 上柱子倒置
        // 生成下柱子
        var bottomColumn = this.createColumn();
        bottomColumn.y = bottomY;
        bottomColumn.x = this.imgWidth + randomXOffset; // 给下柱子设置相同的随机 x 偏移
        bottomColumn.rotation = 0; // 下柱子正常放置
        // 将生成的柱子添加到场景和列表中
        this.columns.push(topColumn);
        this.columns.push(bottomColumn);
        // 添加到场景中
        this.addChild(topColumn);
        this.addChild(bottomColumn);
    };
    GameView.prototype.createColumn = function () {
        // 创建柱子的实例，并赋予初始位置和速度
        var column = new Laya.Image(this.columnPrefab.skin);
        column.pos(this.imgWidth, 0); // 初始位置在屏幕右边
        column.zOrder = -1; // 设置柱子的层级
        return column;
    };
    GameView.prototype.updateScoreNumsUI = function () {
        var data = {};
        var temp = this.score;
        for (var i = 9; i > 0; i--) {
            data["item".concat(i)] = Math.floor(temp % 10);
            temp /= 10;
        }
        this.scoreNums.dataSource = data;
    };
    return GameView;
}(ui.gameUI));
//# sourceMappingURL=GameView.js.map