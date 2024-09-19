import WebGL = Laya.WebGL;
// 程序入口
class GameMain{
    constructor() {
        
        Laya.TBPluginAdapter.init();
        Laya.TBMiniAdapter.init();
        Laya.HWMiniAdapter.init();
        Laya.TTMiniAdapter.init();
        Laya.BLMiniAdapter.init();
        Laya.ALIMiniAdapter.init();
        Laya.VVMiniAdapter.init();
        Laya.QGMiniAdapter.init();
        Laya.KGMiniAdapter.init();
        Laya.BMiniAdapter.init();
        Laya.QQMiniAdapter.init();
        Laya.MiniAdpter.init();

        Laya.init(1920,1080, WebGL);
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        const resArray:Array<any>=[
            {url:"res/atlas/comp.atlas",type:Laya.Loader.ATLAS},
            {url:"comp/GrassThinSprite.png",type:Laya.Loader.IMAGE},
             {url:"comp/SkyTileSprite.png",type:Laya.Loader.IMAGE}
        ]
        Laya.loader.load(resArray,Laya.Handler.create(this,this.onLoaded));
    }
    private onLoaded():void{
        const view =new GameView();
        Laya.stage.addChild(view);
    }
}
new GameMain();