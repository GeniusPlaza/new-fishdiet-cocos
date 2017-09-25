var GameScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        var size = cc.winSize;
        
        var layer = new BackgroundLayer();
        this.addChild(layer, -1);
        layer.setAnchorPoint(cc.p(0.5,0.5));
        layer.setPosition(cc.p(0, 0));
        
        var layer = new TitleLayer();
        this.addChild(layer);
    },
    onEnter:function () {
        this._super();
        
    }
});