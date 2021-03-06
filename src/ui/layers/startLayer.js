
var StartLayer = BaseLayer.extend({
    playBtnPos: cc.p(967, 220),
    nextLayer: "game",
    animationSpeed: .4,
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
        
        // set text
        var title = gameSign.getChildByName("gameTitleText");
        title.setString(FishDiet.data.getTitle());
        
        var playBtn = ccs.load(resJson.button).node;
        playBtn.setName("playBtn");
        this.addChild(playBtn);
        
        return true;
    },
    animateIntro: function () {
        this._super();
        
        var instructionsSign = this.getChildByName("instructionsSign");
        var gameSign = this.getChildByName("gameSign");
        var playBtn = this.getChildByName("playBtn");
        
        var panelLabel = instructionsSign.getChildByName("panelText");
        panelLabel.setString(FishDiet.data.getInstructions());
        var signText = instructionsSign.getChildByName("signText");
        signText.setString(FishDiet.questions.getCurrentQuestionTitle());
        
        var questionsCount = gameSign.getChildByName("questionsNumber");
        questionsCount.setString(
            [
                FishDiet.state.getCurrentQuestionIndex() + 1,
                FishDiet.data.getQuestions().length
            ].join('/')
        );        
        
        instructionsSign.setPosition(cc.p(1250, 650));
        gameSign.setPosition(cc.p(370, 740));
        
        var instSignFinalPos = instructionsSign.getPosition();
        instructionsSign.setPosition(cc.p(instructionsSign.x, this.size.height + 500));
        instructionsSign.runAction(
            new cc.EaseBounceOut(
                new cc.MoveTo(this.animationSpeed, instSignFinalPos)
            )
        );
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
        gameSign.runAction(
            new cc.EaseBounceOut(
                new cc.MoveTo(this.animationSpeed, gameSignFinalPos)
            )
        );
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
                new cc.EaseBounceOut(new cc.MoveTo(.4, this.playBtnPos))
            )
        );
        playBtn
            .getChildByName("playBtn")
            .addTouchEventListener(this.onPlayBtnTouch, this);
    },
    animateOutro: function () {
        this._super();
        
        var instructionsSign = this.getChildByName("instructionsSign");
        var gameSign = this.getChildByName("gameSign");
        var playBtn = this.getChildByName("playBtn");
        
        instructionsSign.stopAllActions();
        instructionsSign.runAction(
            new cc.EaseBackIn(
                new cc.MoveTo(
                    this.animationSpeed, cc.p(instructionsSign.x, this.size.height + 500)
                )
            )
        );
        
        gameSign.stopAllActions();
        gameSign.runAction(
            new cc.EaseBackIn(
                new cc.MoveTo(
                    this.animationSpeed, cc.p(gameSign.x, this.size.height + 500)
                )
            )
        );
        
        playBtn.runAction(
            new cc.MoveTo(
                this.animationSpeed, cc.p(this.size.width / 2, -300)
            )
        );
    }
});