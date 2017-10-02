
var TitleLayer = cc.Layer.extend({
    signPos: cc.p(960.00, 635.00),
    bluefishPos: cc.p(0,0),
    playBtnPos: cc.p(0,0),
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. import cocos studio files
        this.size = cc.winSize;
        
        var rootNode = ccs.load(resJson.titleLayer).node;
        this.addChild(rootNode);
        rootNode.setName("rootNode");
                
        // add title sign
        var sign = ccs.load(resJson.titleSign).node;
        this.addChild(sign, -1);
        sign.setName("sign");
        
        var playBtn = rootNode.getChildByName("playBtn");
        this.playBtnPos = playBtn.getPosition();
        
        var blueFish = rootNode.getChildByName("blueFish");
        this.bluefishPos = blueFish.getPosition();
        
        var fishCreator = new FishCreator();
        
        return true;
    },
    animateIntro: function () {
        var rootNode = this.getChildByName("rootNode");
        var sign = this.getChildByName("sign");
        
        var signFinalPos = this.signPos;
        sign.setPosition(cc.p(this.size.width / 2, this.size.height + 200));
        sign.runAction(new cc.EaseBounceOut(new cc.MoveTo(.6, signFinalPos)));
        sign.runAction(
            new cc.RepeatForever(
                new cc.Sequence(
                    new cc.MoveBy(5, cc.p(0, 25)),
                    new cc.MoveBy(5, cc.p(0, -25))
                )
            )
        );
        
        // position blue fish and animate
        var blueFish = rootNode.getChildByName("blueFish");
        var blueFinalPos = this.bluefishPos;
        blueFish.setFlippedX(false);
        blueFish.setPosition(cc.p(this.size.width + blueFish.width, this.size.height / 2));
        blueFish.runAction(
            new cc.Sequence(
                new cc.DelayTime(.4),
                new cc.MoveTo(.4, blueFinalPos),
                new cc.DelayTime(1),
                new cc.CallFunc(function () {
                    this.runAction(
                        new cc.RepeatForever(
                            new cc.Sequence(
                                new cc.MoveBy(.2, cc.p(-30, 10)),
                                new cc.DelayTime(3),
                                new cc.MoveBy(.2, cc.p(15, 10)),
                                new cc.DelayTime(3),
                                new cc.MoveBy(.2, cc.p(15, -20)),
                                new cc.DelayTime(3)
                            )
                        )
                    );
                }, blueFish)
            )
        );
        
        // animate btn
        var playBtn = rootNode.getChildByName("playBtn");
        var playFinalPos = this.playBtnPos;
        playBtn.setPosition(cc.p(this.size.width / 2, -playBtn.height));
        playBtn.runAction(
            new cc.Sequence(
                new cc.DelayTime(.5),
                new cc.EaseBounceOut(new cc.MoveTo(.8, playFinalPos))
            )
        );
        playBtn.addTouchEventListener(this.onPlayBtnTouch, this);
    },
    animateOutro: function () {
        var rootNode = this.getChildByName("rootNode");
        var sign = this.getChildByName("sign");
        
        sign.stopAllActions();
        sign.runAction(
            new cc.EaseBackIn(
                new cc.MoveTo(.2, cc.p(this.size.width / 2, this.size.height + 200))
            )
        );
        
        var blueFish = rootNode.getChildByName("blueFish");
        blueFish.stopAllActions();
        blueFish.setFlippedX(true);
        blueFish.runAction(
            new cc.EaseBackIn(
                new cc.MoveTo(.2, cc.p(this.size.width + blueFish.width, this.size.height / 2))
            )
        );
        
        var playBtn = rootNode.getChildByName("playBtn");
        playBtn.runAction(
            new cc.MoveTo(.2, cc.p(this.size.width / 2, -playBtn.height))
        );
    },
    onPlayBtnTouch: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.animateOutro();
            
            this.scheduleOnce(f => {
                this.parent.transitionTo("instructions")
            }, .2);
        }
    }
});