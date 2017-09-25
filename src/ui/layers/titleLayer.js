
var TitleLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. import cocos studio files
        var size = cc.winSize;
        
        var rootNode = ccs.load(resJson.titleLayer_json);
        
        var sign = ccs.load(resJson.titleSign_json);
        sign.node.setPosition(cc.p(960.00, 635.00));
        rootNode.node.addChild(sign.node, -1);
        
        this.addChild(rootNode.node);
        
        return true;
    }
});