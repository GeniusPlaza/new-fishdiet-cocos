
var InstructionsLayer = BaseLayer.extend({
    tutorialSignScale: 0.8,
    playBtnPos: cc.p(),
    nextLayer: "start",
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
        
        var playBtn = rootNode.getChildByName("playBtn");
        this.playBtnPos = playBtn.getPosition();
        
        return true;
    },
    animateIntro: function () {
        this._super();
        
        var rootNode = this.getChildByName("rootNode");
        
        var sign1 = rootNode.getChildByName("tutorialSign1");
        sign1.setScale(0);
        var sign2 = rootNode.getChildByName("tutorialSign2");
        sign2.setScale(0);
        var sign3 = rootNode.getChildByName("tutorialSign3");
        sign3.setScale(0);
        
        var tutorialScale = this.tutorialSignScale;
        
        sign1.runAction(
            new cc.Sequence(
                new cc.EaseBackOut(new cc.ScaleTo(this.animationSpeed, this.tutorialSignScale)),
                new cc.CallFunc(function () {
                    this.runAction(
                        new cc.RepeatForever(
                            new cc.Sequence(
                                new cc.ScaleTo(1, .88),
                                new cc.ScaleTo(1, tutorialScale)
                            )
                        )
                    )
                }, sign1)
            )
        );
        
        sign2.runAction(
            new cc.Sequence(
                new cc.DelayTime(this.animationSpeed),
                new cc.EaseBackOut(new cc.ScaleTo(this.animationSpeed, this.tutorialSignScale)),
                new cc.CallFunc(function () {
                    this.runAction(
                        new cc.RepeatForever(
                            new cc.Sequence(
                                new cc.ScaleTo(1, .88),
                                new cc.ScaleTo(1, tutorialScale)
                            )
                        )
                    )
                }, sign2)
            )
        );
        
        sign3.runAction(
            new cc.Sequence(
                new cc.DelayTime(.4),
                new cc.EaseBackOut(new cc.ScaleTo(this.animationSpeed, this.tutorialSignScale)),
                new cc.CallFunc(function () {
                    this.runAction(
                        new cc.RepeatForever(
                            new cc.Sequence(
                                new cc.ScaleTo(1, .88),
                                new cc.ScaleTo(1, tutorialScale)
                            )
                        )
                    )
                }, sign3)
            )
        );
        
        // animate btn
        var playBtn = rootNode.getChildByName("playBtn");
        playBtn.setPosition(cc.p(this.size.width / 2, -playBtn.height));
        playBtn.runAction(
            new cc.Sequence(
                new cc.DelayTime(.4),
                new cc.EaseBounceOut(new cc.MoveTo(.8, this.playBtnPos))
            )
        );
        playBtn.addTouchEventListener(this.onPlayBtnTouch, this);
    },
    animateOutro: function () {
        this._super();
        
        var rootNode = this.getChildByName("rootNode");
        
        var sign1 = rootNode.getChildByName("tutorialSign1");
        var sign2 = rootNode.getChildByName("tutorialSign2");
        var sign3 = rootNode.getChildByName("tutorialSign3");
        
        sign1.stopAllActions();
        sign2.stopAllActions();
        sign3.stopAllActions();
        
        sign1.runAction(new cc.EaseBackIn(new cc.ScaleTo(this.animationSpeed, 0)));
        sign2.runAction(new cc.EaseBackIn(new cc.ScaleTo(this.animationSpeed, 0)));
        sign3.runAction(new cc.EaseBackIn(new cc.ScaleTo(this.animationSpeed, 0)));
        
        var playBtn = rootNode.getChildByName("playBtn");
        playBtn.runAction(
            new cc.MoveTo(this.animationSpeed, cc.p(this.size.width / 2, -playBtn.height))
        );
    }
});