
var InstructionsLayer = cc.Layer.extend({
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. import cocos studio files
        this.size = cc.winSize;
        
        var rootNode = ccs.load(resJson.instructionsLayer).node;
        rootNode.setName("rootNode");
        this.addChild(rootNode);
    },
    animateIntro: function () {
        var rootNode = this.getChildByName("rootNode");
        
        var sign1 = rootNode.getChildByName("tutorialSign1");
        sign1.setScale(0);
        var sign2 = rootNode.getChildByName("tutorialSign2");
        sign2.setScale(0);
        var sign3 = rootNode.getChildByName("tutorialSign3");
        sign3.setScale(0);
        
        sign1.runAction(
            new cc.Sequence(
                new cc.EaseBackOut(new cc.ScaleTo(.2, .8)),
                new cc.CallFunc(function () {
                    this.runAction(
                        new cc.RepeatForever(
                            new cc.Sequence(
                                new cc.ScaleTo(1, .9),
                                new cc.ScaleTo(1, .8)
                            )
                        )
                    )
                }, sign1)
            )
        );
        
        sign2.runAction(
            new cc.Sequence(
                new cc.DelayTime(.2),
                new cc.EaseBackOut(new cc.ScaleTo(.2, .8)),
                new cc.CallFunc(function () {
                    this.runAction(
                        new cc.RepeatForever(
                            new cc.Sequence(
                                new cc.ScaleTo(1, .9),
                                new cc.ScaleTo(1, .8)
                            )
                        )
                    )
                }, sign2)
            )
        );
        
        sign3.runAction(
            new cc.Sequence(
                new cc.DelayTime(.4),
                new cc.EaseBackOut(new cc.ScaleTo(.2, .8)),
                new cc.CallFunc(function () {
                    this.runAction(
                        new cc.RepeatForever(
                            new cc.Sequence(
                                new cc.ScaleTo(1, .9),
                                new cc.ScaleTo(1, .8)
                            )
                        )
                    )
                }, sign3)
            )
        );
        
        // animate btn
        var playBtn = rootNode.getChildByName("playBtn");
        var playFinalPos = playBtn.getPosition();
        playBtn.setPosition(cc.p(this.size.width / 2, -playBtn.height));
        playBtn.runAction(
            new cc.Sequence(
                new cc.DelayTime(.4),
                new cc.EaseBounceOut(new cc.MoveTo(.8, playFinalPos))
            )
        );
        playBtn.addTouchEventListener(this.onPlayBtnTouch, this);
    },
    onPlayBtnTouch: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.parent.transitionTo("start");
        }
    }
});