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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var gameUI = /** @class */ (function (_super) {
        __extends(gameUI, _super);
        function gameUI() {
            return _super.call(this) || this;
        }
        gameUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.gameUI.uiView);
        };
        gameUI.uiView = { "type": "View", "props": { "width": 1920, "height": 1080 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1920, "var": "bg1", "skin": "comp/SkyTileSprite.png", "height": 1080 } }, { "type": "Image", "props": { "y": 568, "x": 0, "width": 1920, "var": "ground1", "skin": "comp/GrassThinSprite.png", "height": 512 } }, { "type": "Image", "props": { "y": 0, "x": 1920, "width": 1920, "var": "bg2", "skin": "comp/SkyTileSprite.png", "height": 1080 } }, { "type": "Image", "props": { "y": 568, "x": 1920, "width": 1920, "var": "ground2", "skin": "comp/GrassThinSprite.png", "height": 512 } }, { "type": "Image", "props": { "y": 581, "x": 24, "var": "bird", "skin": "comp/BirdHero_01.png" } }, { "type": "Button", "props": { "y": 515, "x": 871, "var": "btn_reStart", "stateNum": 2, "skin": "comp/btn_restart.png" } }, { "type": "Image", "props": { "y": 595, "x": 1324, "width": 237, "skin": "comp/ColumnSprite.png", "name": "column", "height": 1024 } }, { "type": "Box", "props": { "y": 33, "x": 1586, "var": "scoreNums" }, "child": [{ "type": "Clip", "props": { "width": 31, "skin": "comp/clip_number.png", "name": "item0", "height": 38, "clipX": 10 } }, { "type": "Clip", "props": { "x": 32, "width": 31, "skin": "comp/clip_number.png", "name": "item1", "height": 38, "clipX": 10 } }, { "type": "Clip", "props": { "x": 64, "width": 31, "skin": "comp/clip_number.png", "name": "item2", "height": 38, "clipX": 10 } }, { "type": "Clip", "props": { "x": 96, "width": 31, "skin": "comp/clip_number.png", "name": "item3", "height": 38, "clipX": 10 } }, { "type": "Clip", "props": { "x": 128, "width": 31, "skin": "comp/clip_number.png", "name": "item4", "height": 38, "clipX": 10 } }, { "type": "Clip", "props": { "x": 160, "width": 31, "skin": "comp/clip_number.png", "name": "item5", "height": 38, "clipX": 10 } }, { "type": "Clip", "props": { "x": 192, "width": 31, "skin": "comp/clip_number.png", "name": "item6", "height": 38, "clipX": 10 } }, { "type": "Clip", "props": { "x": 224, "width": 31, "skin": "comp/clip_number.png", "name": "item7", "height": 38, "clipX": 10 } }, { "type": "Clip", "props": { "x": 256, "width": 31, "skin": "comp/clip_number.png", "name": "item8", "height": 38, "clipX": 10 } }, { "type": "Clip", "props": { "x": 288, "width": 31, "skin": "comp/clip_number.png", "name": "item9", "height": 38, "clipX": 10 } }] }] };
        return gameUI;
    }(View));
    ui.gameUI = gameUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map