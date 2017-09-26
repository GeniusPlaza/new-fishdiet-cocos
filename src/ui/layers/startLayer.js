
var StartLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. import cocos studio files
        this.size = cc.winSize;
        
        this.instructionsSign = ccs.load(resJson.instructionsSign).node;
        this.instructionsSign.setScale(.85, .70);
        this.instructionsSign.setPosition(cc.p(1250, 650));
        this.addChild(this.instructionsSign);
        
        this.gameSign = ccs.load(resJson.gameSign).node;
        this.gameSign.setScale(.6, .6);
        this.gameSign.setPosition(cc.p(370, 740));
        this.addChild(this.gameSign);
        
        this.playBtn = ccs.load(resJson.button).node;
        this.playBtn.setPosition(cc.p(967, 220));
        this.addChild(this.playBtn);
    },
    animateIntro: function () {
        var rootNode = this.getChildByName("rootNode");
        
        var instSignFinalPos = this.instructionsSign.getPosition();
        this.instructionsSign.setPosition(cc.p(this.instructionsSign.x, this.size.height + 500));
        this.instructionsSign.runAction(new cc.EaseBounceOut(new cc.MoveTo(.8, instSignFinalPos)));
        this.instructionsSign.runAction(
            new cc.RepeatForever(
                new cc.Sequence(
                    new cc.DelayTime(.5),
                    new cc.MoveBy(5, cc.p(0, 25)),
                    new cc.MoveBy(5, cc.p(0, -25))
                )
            )
        );
        
        var gameSignFinalPos = this.gameSign.getPosition();
        this.gameSign.setPosition(cc.p(this.gameSign.x, this.size.height + 500));
        this.gameSign.runAction(new cc.EaseBounceOut(new cc.MoveTo(.8, gameSignFinalPos)));
        this.gameSign.runAction(
            new cc.RepeatForever(
                new cc.Sequence(
                    new cc.MoveBy(5, cc.p(0, 25)),
                    new cc.MoveBy(5, cc.p(0, -25))
                )
            )
        );
        
        // animate btn
        var playFinalPos = this.playBtn.getPosition();
        this.playBtn.setPosition(
            cc.p(this.size.width / 2, -this.playBtn.getChildByName("playBtn").height)
        );
        this.playBtn.runAction(
            new cc.Sequence(
                new cc.DelayTime(.5),
                new cc.EaseBounceOut(new cc.MoveTo(.8, playFinalPos))
            )
        );
        this.playBtn
            .getChildByName("playBtn")
            .addTouchEventListener(this.onPlayBtnTouch, this);
    },
    onPlayBtnTouch: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.parent.transitionTo("start");
        }
    }
});