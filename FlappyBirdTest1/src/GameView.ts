class GameView extends ui.gameUI{
    private speed:number =15;
    private imgWidth:number = 1920;
    private birdState:Bird;
    private ranTime:number = 2000;
    private time:number = 0;
    private columns: Laya.Sprite[] = []; // 保存生成的柱子
    private columnGapMin: number = 245;
    private columnGapMax: number = 348;
    private columnPrefab: Laya.Image; // 预制体柱子
    private score:number;
    private addScore:number=0;
    private max:number = 3000;
    private min:number = 2500;

    constructor(){
        super();
        this.columnPrefab = this.getChildByName("column") as Laya.Image;
        this.ground1.zOrder = 0;
        this.ground2.zOrder = 0;
        this.bg1.zOrder = -2;
        this.bg2.zOrder = -2;
        this.columnPrefab.visible = false;
        const gameStartCallBackHandler:Laya.Handler = Laya.Handler.create(this,this.startRunBack);
        const gameOverCallBackHandler:Laya.Handler = Laya.Handler.create(this,this.gameOver,null,false);
        this.birdState=new Bird(this.bird,gameStartCallBackHandler,gameOverCallBackHandler)
        this.btn_reStart.visible = false;
        this.btn_reStart.on(Laya.Event.CLICK,this,this.startRunBack)
    }
    private startRunBack():void{
        this.speed = 5;
        this.max = this.getRandom(1500, 2000);
        this.min = this.getRandom(1500, 2000);
        this.score = 0;
        this.addScore = 0;
        this.updateScoreNumsUI();
        this.birdState.reset();
        // 清除所有柱子
        for (let i = this.columns.length - 1; i >= 0; i--) {
            const columnPair = this.columns[i];
            columnPair.removeSelf(); // 从舞台中移除
        }
        this.columns = []; // 清空柱子数组
        this.btn_reStart.visible = false;
        this.birdState.start();
        Laya.timer.loop(20, this, this.onLoop);
        // 每帧调用 onUpdate 方法，生成柱子和更新游戏状态
        Laya.timer.frameLoop(1, this, this.onUpdate);  
    }

    private gameOver():void{
        Laya.timer.clear(this,this.onLoop);
        Laya.timer.clear(this,this.onUpdate);
        this.btn_reStart.visible = true;
    }
    private onLoop():void{
        this.bg1.x -= this.speed;
        this.bg2.x -= this.speed;       
        this.ground1.x -= this.speed;
        this.ground2.x -= this.speed;
        if (this.bg1.x <- this.imgWidth) {
            this.bg1.x =  this.bg2.x + this.imgWidth;
        }         
        if ( this.bg2.x <- this.imgWidth) {
            this.bg2.x = this.bg1.x + this.imgWidth;
        }  

        if (this.ground1.x < -this.imgWidth) {
        this.ground1.x =  this.ground2.x + this.imgWidth;
        }   
        if ( this.ground2.x < -this.imgWidth) {
            this.ground2.x = this.ground1.x + this.imgWidth;
        }
         // 移动生成的柱子
        for (let i = this.columns.length - 1; i >= 0; i--) {
            const columnPair = this.columns[i];
            columnPair.x -= this.speed;
            columnPair.zOrder = -1;
      
            // 如果柱子超出了屏幕左边界，移除
            if (columnPair.x + columnPair.width < 0) {
                columnPair.removeSelf();
                this.columns.splice(i, 1);
            }          
        }
    }
    private onUpdate():void{
        this.time +=Laya.timer.delta;
        if(this.time >= this.ranTime){
            this.time = 0;
            this.ranTime = this.getRandom(this.min, this.max);
            this.spaw();
        }
         // 碰撞检测
        this.checkCollision();
    }
    
     private checkCollision(): void {
        for (const column of this.columns) {
            if (this.birdState.checkCollision(column)) {
                // 如果检测到碰撞，触发游戏结束   
                 this.birdState.isGameOver = true;          
                break;
            }
             
                // 检测通过
            if (!column['hasPassed'] && this.birdState.checkPass(column)) {  // 只有没有通过过的柱子才加分         
                this.score += 100
                this.addScore=this.score;
                column['hasPassed'] = true; // 标记该柱子已经通过，防止重复加分
                this.updateScoreNumsUI();
                Laya.SoundManager.playSound("comp/下坠的小鸟（flappy bird）-像素鸟PC版-提示音_爱给网_aigei_com.mp3", 1); // 第二个参数传入 1 表示播放一次
                if (Math.floor(this.addScore % 300) === 0) {
                    // 增加飞行速度
                    this.speed += 0.5;

                    // 调整柱子生成的 X 轴间隔，使其随着速度增加而缩小
                    // 设置间隔的最小值，防止间隔过小
                    const minInterval = 300; // 最小间隔
                    const maxInterval = 500; // 最大间隔

                    // 根据速度计算缩小的间隔值
                    const intervalReduction = Math.min(100, this.speed * 2); // 根据速度减少间隔
                    if(this.speed >=13){
                         // 更新最大和最小间隔值
                        this.max = Math.max(minInterval + intervalReduction, maxInterval - intervalReduction);
                        this.min = Math.max(minInterval, minInterval + intervalReduction / 2); // 确保最小间隔不小于 minInterval
                    }
                   
                }

                break;
            }
        }
    }
    private getRandom(min:number,max:number):number{
        let ranValue:number = 0;
        if(max > min){
            ranValue = Math.random()*(max-min);
            ranValue+=min;
        }else{
             ranValue = Math.random()*(max-min);
             ranValue+=max;
        }
        return ranValue;
    }
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
  private spaw(): void {
    // 随机生成柱子的 y 坐标
    const topY = this.getRandom(300, 600 - this.columnGapMax);
    
    // 随机生成上下柱子间距
    const gap = this.getRandom(this.columnGapMin, this.columnGapMax);
    
    // 下柱子的 y 坐标根据随机间距生成
    const bottomY = topY + gap;

    // 随机生成柱子的 x 坐标偏移量（可以根据需要调整范围）
    const randomXOffset = this.getRandom(-50, 50);

    // 生成上柱子
    const topColumn = this.createColumn();
    topColumn.y = topY;
    topColumn.x = this.imgWidth + randomXOffset; // 给上柱子设置随机的 x 偏移
    topColumn.rotation = 180; // 上柱子倒置

    // 生成下柱子
    const bottomColumn = this.createColumn();
    bottomColumn.y = bottomY;
    bottomColumn.x = this.imgWidth + randomXOffset; // 给下柱子设置相同的随机 x 偏移
    bottomColumn.rotation = 0; // 下柱子正常放置

    // 将生成的柱子添加到场景和列表中
    this.columns.push(topColumn);
    this.columns.push(bottomColumn);

    // 添加到场景中
    this.addChild(topColumn);
    this.addChild(bottomColumn);
}


    private createColumn(): Laya.Image {
        // 创建柱子的实例，并赋予初始位置和速度
        const column = new Laya.Image(this.columnPrefab.skin);
        column.pos(this.imgWidth, 0); // 初始位置在屏幕右边
        column.zOrder = -1; // 设置柱子的层级
        return column;
    }
    private updateScoreNumsUI():void{
        const data:any={};
        let temp = this.score;
        for(let i:number = 9; i >0; i--){
            data[`item${i}`]=Math.floor(temp%10)
            temp /=10;
        }
        this.scoreNums.dataSource = data;
    }
}