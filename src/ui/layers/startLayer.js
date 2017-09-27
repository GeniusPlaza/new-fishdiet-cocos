
var StartLayer = cc.Layer.extend({
    playBtnPos: cc.p(967, 220),
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. import cocos studio files
        this.size = cc.winSize;
        
        var instructionsSign = ccs.load(resJson.instructionsSign).node;
        instructionsSign.setScale(.85, .70);
        this.addChild(instructionsSign);
        instructionsSign.setName("instructionsSign");
        
        var gameSign = ccs.load(resJson.gameSign).node;
        gameSign.setScale(.6, .6);
        gameSign.setName("gameSign");
        this.addChild(gameSign);
        
        var playBtn = ccs.load(resJson.button).node;
        playBtn.setName("playBtn");
        this.addChild(playBtn);
        
        return true;
    },
    animateIntro: function () {
        var instructionsSign = this.getChildByName("instructionsSign");
        var gameSign = this.getChildByName("gameSign");
        var playBtn = this.getChildByName("playBtn");
        
        instructionsSign.setPosition(cc.p(1250, 650));
        gameSign.setPosition(cc.p(370, 740));
        
        var instSignFinalPos = instructionsSign.getPosition();
        instructionsSign.setPosition(cc.p(instructionsSign.x, this.size.height + 500));
        instructionsSign.runAction(new cc.EaseBounceOut(new cc.MoveTo(.8, instSignFinalPos)));
        instructionsSign.runAction(
            new cc.RepeatForever(
                new cc.Sequence(
                    new cc.MoveBy(5, cc.p(0, 25)),
                    new cc.MoveBy(5, cc.p(0, -25))
                )
            )
        );
        
        var gameSignFinalPos = gameSign.getPosition();
        gameSign.setPosition(cc.p(gameSign.x, this.size.height + 500));
        gameSign.runAction(new cc.EaseBounceOut(new cc.MoveTo(.8, gameSignFinalPos)));
        gameSign.runAction(
            new cc.RepeatForever(
                new cc.Sequence(
                    new cc.MoveBy(5, cc.p(0, 25)),
                    new cc.MoveBy(5, cc.p(0, -25))
                )
            )
        );
        
        // animate btn
        playBtn.setPosition(
            cc.p(this.size.width / 2, -playBtn.getChildByName("playBtn").height)
        );
        playBtn.runAction(
            new cc.Sequence(
                new cc.DelayTime(.5),
                new cc.EaseBounceOut(new cc.MoveTo(.8, this.playBtnPos))
            )
        );
        playBtn
            .getChildByName("playBtn")
            .addTouchEventListener(this.onPlayBtnTouch, this);
    },
    animateOutro: function () {
        var instructionsSign = this.getChildByName("instructionsSign");
        var gameSign = this.getChildByName("gameSign");
        var playBtn = this.getChildByName("playBtn");
        
        instructionsSign.stopAllActions();
        instructionsSign.runAction(
            new cc.EaseBackIn(
                new cc.MoveTo(.2, cc.p(instructionsSign.x, this.size.height + 500))
            )
        );
        
        gameSign.stopAllActions();
        gameSign.runAction(
            new cc.EaseBackIn(
                new cc.MoveTo(.2, cc.p(gameSign.x, this.size.height + 500))
            )
        );
        
        playBtn.runAction(
            new cc.MoveTo(.2, cc.p(this.size.width / 2, -playBtn.height))
        );
    },
    onPlayBtnTouch: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.animateOutro();
            
            this.scheduleOnce(f => {
                this.parent.transitionTo("game")
            }, .2);
        }
    }
});