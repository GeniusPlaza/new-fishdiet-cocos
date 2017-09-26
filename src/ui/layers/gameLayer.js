
var GameLayer = cc.Layer.extend({
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. import cocos studio files
        this.size = cc.winSize;
        
        // position signs
        this.livesSign = ccs.load(resJson.livesSign).node;
        this.livesSign.setPosition(cc.p(350, 1000));
        this.addChild(this.livesSign);
        
        this.timerSign = ccs.load(resJson.timerSign).node;
        this.timerSign.setPosition(cc.p(960, 1000));
        this.addChild(this.timerSign);
        
        this.scoreSign = ccs.load(resJson.scoreSign).node;
        this.scoreSign.setPosition(cc.p(1570, 1000));
        this.addChild(this.scoreSign);
    },
    animateIntro: function () {
        var livesSignFinalPos = this.livesSign.getPosition();
        this.livesSign.setPosition(cc.p(this.livesSign.x, this.size.height + 200));
        this.livesSign.runAction(new cc.EaseBounceOut(new cc.MoveTo(.3, livesSignFinalPos)));
        
        var timerSignFinalPos = this.timerSign.getPosition();
        this.timerSign.setPosition(cc.p(this.timerSign.x, this.size.height + 500));
        this.timerSign.runAction(new cc.EaseBounceOut(new cc.MoveTo(.5, timerSignFinalPos)));
        
        var scoreSignFinalPos = this.scoreSign.getPosition();
        this.scoreSign.setPosition(cc.p(this.scoreSign.x, this.size.height + 500));
        this.scoreSign.runAction(new cc.EaseBounceOut(new cc.MoveTo(.7, scoreSignFinalPos)));
    }
});