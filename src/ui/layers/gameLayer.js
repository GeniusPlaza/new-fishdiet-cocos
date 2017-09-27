
var GameLayer = cc.Layer.extend({
    livesSignPos: cc.p(350, 1000),
    timerSignPos: cc.p(960, 1000),
    scoreSignPos: cc.p(1570, 1000),
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. import cocos studio files
        this.size = cc.winSize;
        
        // position signs
        var livesSign = ccs.load(resJson.livesSign).node;
        this.addChild(livesSign);
        livesSign.setName("livesSign");
        
        var timerSign = ccs.load(resJson.timerSign).node;
        this.addChild(timerSign);
        timerSign.setName("timerSign");
        
        var scoreSign = ccs.load(resJson.scoreSign).node;
        this.addChild(scoreSign);
        scoreSign.setName("scoreSign");
        
        return true;
    },
    animateIntro: function () {
        var livesSign = this.getChildByName("livesSign");
        var timerSign = this.getChildByName("timerSign");
        var scoreSign = this.getChildByName("scoreSign");
        
        livesSign.setPosition(cc.p(this.livesSignPos.x, this.size.height + 200));
        livesSign.runAction(
            new cc.EaseBounceOut(new cc.MoveTo(.3, this.livesSignPos))
        );
        
        timerSign.setPosition(cc.p(this.timerSignPos.x, this.size.height + 500));
        timerSign.runAction(
            new cc.EaseBounceOut(new cc.MoveTo(.5, this.timerSignPos))
        );
        
        scoreSign.setPosition(cc.p(this.scoreSignPos.x, this.size.height + 500));
        scoreSign.runAction(
            new cc.EaseBounceOut(new cc.MoveTo(.7, this.scoreSignPos))
        );
    },
    animateOutro: function () {
        var livesSign = this.getChildByName("livesSign");
        var timerSign = this.getChildByName("timerSign");
        var scoreSign = this.getChildByName("scoreSign");
        
        livesSign.runAction(
            new cc.EaseBackIn(
                new cc.MoveTo(.2, cc.p(this.livesSignPos.x, this.size.height + 200))
            )
        );
        timerSign.runAction(
            new cc.EaseBackIn(
                new cc.MoveTo(.2, cc.p(this.timerSignPos.x, this.size.height + 500))
            )
        );
        scoreSign.runAction(
            new cc.EaseBackIn(
                new cc.MoveTo(.2, cc.p(this.scoreSignPos.x, this.size.height + 500))
            )
        );
    },
    onGameEnded: function () {
        this.animateOutro();

        this.scheduleOnce(f => {
            this.parent.transitionTo("start")
        }, .2);
    }
});