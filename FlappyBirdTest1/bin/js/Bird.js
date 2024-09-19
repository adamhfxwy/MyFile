var Bird = /** @class */ (function () {
    function Bird(birdState, gameStartCallBackHandler, gameOverCallBackHandler) {
        this.speedY = 0; // 物体的垂直速度
        this.gravity = 0.18; // 重力加速度
        this.groundY = 739; // 地面的 y 坐标
        this.isOnGround = false; // 判断物体是否在地面上
        this.ceilingHeight = 0; // 天花板的高度
        this.isFirst = true;
        this.isGameOver = false; // 是否已经触发了 gameOver
        this.rotationSpeed = 5; // 翻滚的速度
        this.isPlay = false;
        this.birdState = birdState;
        //this.column = column; 
        this.gameStartCallBackHandler = gameStartCallBackHandler;
        this.gameOverCallBackHandler = gameOverCallBackHandler;
        this.birdState.visible = false;
        // 监听鼠标点击事件，触发跳跃
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        // 监听鼠标点击事件，触发跳跃
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
    }
    Bird.prototype.start = function () {
        // 停止背景音乐
        Laya.SoundManager.stopMusic();
        this.birdState.pos(100, 100); // 设置初始位置
        this.reset();
        this.birdState.visible = true;
        this.isGameOver = false;
        // 播放背景音乐，循环播放
        Laya.SoundManager.playMusic("comp/backGroundMusic1.mp3", 0); // 第二个参数传入 0 表示循环播放
        // 设置背景音乐的音量，范围为 0 到 1
        Laya.SoundManager.setMusicVolume(0.5); // 背景音乐音量设置为 50%
        // 每帧更新物体状态
        Laya.timer.frameLoop(1, this, this.update);
    };
    //重置参数
    Bird.prototype.reset = function () {
        this.speedY = 0;
        this.isOnGround = false;
        this.birdState.visible = false;
        this.isFirst = true;
        this.birdState.rotation = 0; // 重置旋转角度
        this.isGameOver = false;
        this.isPlay = false;
    };
    // 当鼠标按下时，持续增加速度
    Bird.prototype.onMouseDown = function () {
        if (!this.isGameOver) {
            Laya.SoundManager.playSound("comp/下坠的小鸟（flappy bird）-像素鸟PC版-飞_爱给网_aigei_com.mp3", 1); // 第二个参数传入 1 表示播放一次
        }
        this.gameStartCallBackHandler.run();
        this.isFirst = false;
        this.isMouseDown = true;
    };
    // 当鼠标松开时，停止增加速度
    Bird.prototype.onMouseUp = function () {
        this.isMouseDown = false;
    };
    Bird.prototype.update = function () {
        if (this.isMouseDown) {
            // 如果鼠标按下，持续减少 speedY，使物体向上移动
            this.speedY -= 1; // 持续增加上升速度
            this.birdState.skin = "comp/BirdHero_02.png";
        }
        else {
            // 如果鼠标松开，物体受重力影响下降
            this.speedY += this.gravity; // 增加下降速度（模拟重力）
            this.birdState.skin = "comp/BirdHero_01.png";
        }
        // 如果物体不在地面上，应用重力
        if (!this.isOnGround && !this.isFirst && !this.isGameOver) {
            this.speedY += this.gravity; // 重力影响速度
            this.birdState.y += this.speedY; // 根据速度更新物体的 y 坐标       
        }
        // 防止物体超过天花板或地板
        if (this.birdState.y < this.ceilingHeight) {
            this.birdState.y = this.ceilingHeight; // 天花板高度
            this.speedY = 0; // 到达天花板后速度归零
        }
        // 检查是否与地面碰撞
        if (this.birdState.y >= this.groundY) {
            this.birdState.y = this.groundY; // 保持在地面上
            this.speedY = 0; // 停止垂直速度
            this.isOnGround = true; // 标记物体已经在地面上
            this.birdState.skin = "comp/BirdHero_03.png";
            Laya.SoundManager.playSound("comp/下坠的小鸟（flappy bird）-像素鸟PC版-碰撞音_爱给网_aigei_com.mp3", 1); // 第二个参数传入 1 表示播放一次
            this.gameOver();
        }
        // 如果游戏结束且未落地，继续应用重力并添加旋转效果
        if (this.isGameOver && !this.isOnGround) {
            this.rotation();
        }
    };
    Bird.prototype.rotation = function () {
        if (!this.isPlay) {
            Laya.SoundManager.playSound("comp/death.mp3", 1); // 第二个参数传入 1 表示播放一次
            this.isPlay = true;
        }
        this.speedY += this.gravity; // 增加下落速度
        this.birdState.y += this.speedY;
        this.birdState.skin = "comp/BirdHero_03.png";
        this.birdState.rotation += this.rotationSpeed; // 让鸟在下落时旋转
        this.gameOverCallBackHandler.run();
    };
    Bird.prototype.gameOver = function () {
        // 停止背景音乐
        Laya.SoundManager.stopMusic();
        Laya.timer.clear(this, this.update);
        this.gameOverCallBackHandler.run();
        this.isGameOver = true;
        Laya.SoundManager.playMusic("comp/backGroundMusic2.mp3", 0); // 第二个参数传入 0 表示循环播放
    };
    // 检测碰撞，检测两个矩形是否相交
    Bird.prototype.checkCollision = function (column) {
        var birdBounds = this.birdState.getBounds();
        var columnBounds = column.getBounds();
        //处理图片边角与柱体之间的差值
        columnBounds.x += 60;
        return birdBounds.intersects(columnBounds);
    };
    // 检测碰撞，检测bird是否顺利通过
    Bird.prototype.checkPass = function (column) {
        var birdBounds = this.birdState.getBounds();
        birdBounds.x = 100; // 固定 birdBounds.x 的值为 100
        var columnBounds = column.getBounds();
        // 当鸟的 x 坐标超过柱子右边界，且柱子仍在屏幕内时，表示通过
        return birdBounds.x > columnBounds.right && columnBounds.right > 0;
    };
    Bird.prototype.getBird = function () {
        return this.birdState;
    };
    return Bird;
}());
//# sourceMappingURL=Bird.js.map