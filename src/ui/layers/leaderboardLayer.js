
var LeaderboardLayer = cc.Layer.extend({
    leaderboardPos: cc.p(960, 540),
    reflectionPanelPos: cc.p(960, 600),
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. import cocos studio files
        this.size = cc.winSize;
        
        var leaderboard = ccs.load(resJson.leaderboard).node;
        leaderboard.setPosition(
            cc.p(this.size.width * 1.5, this.leaderboardPos.y)
        );
        leaderboard.setScale(.90);
        this.addChild(leaderboard);
        leaderboard.setName("leaderboard");
        leaderboard.getChildByName("score").setFontSize(125);
        
        leaderboard.getChildByName("highFiveBtn")
            .addTouchEventListener(this.onHighFiveUpBtnTouch, this);
        leaderboard.getChildByName("highFiveBtnDown")
            .addTouchEventListener(this.onHighFiveDownBtnTouch, this);
        leaderboard.getChildByName("reflectionBtn")
            .addTouchEventListener(this.onReflectionBtnTouch, this);
        leaderboard.getChildByName("replayBtn")
            .addTouchEventListener(this.onReplayBtnTouch, this);
        
        var reflectionPanel = ccs.load(resJson.reflectionPanel).node;
        reflectionPanel.setScale(.85, .90);
        reflectionPanel.setVisible(false);
        reflectionPanel.setName("reflectionPanel");
        this.addChild(reflectionPanel);
        
        reflectionPanel.getChildByName("submitBtn")
            .addTouchEventListener(this.onSubmitBtnTouch, this);
        reflectionPanel.getChildByName("reflectionsField").setPlaceHolderColor(cc.color.WHITE);
    },
    animateIntro: function () {
        var leaderboard = this.getChildByName("leaderboard");
        
        leaderboard.getChildByName("score").setString(
            FishDiet.state.getScore().toFixed(0)
        );
        
        leaderboard.setPosition(
            cc.p(this.size.width * 1.5, this.leaderboardPos.y)
        );
        leaderboard.runAction(
            new cc.EaseBackOut(new cc.MoveTo(.5, this.leaderboardPos))
        );
    },
    animateOutro: function () {
        var leaderboard = this.getChildByName("leaderboard");
        
        leaderboard.runAction(
            new cc.EaseBackIn(
                new cc.MoveTo(.2, cc.p(this.size.width * 1.5, this.leaderboardPos.y))
            )
        );
    },
    onHighFiveUpBtnTouch: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            var leaderboard = this.getChildByName("leaderboard");
            
            leaderboard.getChildByName("highFiveBtn")
                .setVisible(false);
            leaderboard.getChildByName("highFiveBtnDown")
                .setVisible(true);
            
            FishDiet.submitHighFive(true);
        }
    },
    onHighFiveDownBtnTouch: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            var leaderboard = this.getChildByName("leaderboard");
            
            leaderboard.getChildByName("highFiveBtn")
                .setVisible(true);
            leaderboard.getChildByName("highFiveBtnDown")
                .setVisible(false);
            
            FishDiet.submitHighFive(false);
        }
    },
    onReflectionBtnTouch: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            var leaderboard = this.getChildByName("leaderboard");
            var reflectionPanel = this.getChildByName("reflectionPanel");
            
            leaderboard.setVisible(false);
            reflectionPanel.setVisible(true);
            
            reflectionPanel.setPosition(
                cc.p(this.reflectionPanelPos.x, this.size.height * 1.5)
            );
            reflectionPanel.runAction(
                new cc.EaseBounceOut(
                    new cc.MoveTo(.5, this.reflectionPanelPos)
                )
            );
        }
    },
    onSubmitBtnTouch: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            var leaderboard = this.getChildByName("leaderboard");
            var reflectionPanel = this.getChildByName("reflectionPanel");
            
            reflectionPanel.runAction(
                new cc.EaseBackIn(
                    new cc.MoveTo(.2, cc.p(this.reflectionPanelPos.x, this.size.height * 1.5))
                )
            );
            
            this.scheduleOnce(f => {
                reflectionPanel.setVisible(false);
                leaderboard.setVisible(true);
                
                this.animateIntro();
            }, .2)
        }
    },
    onReplayBtnTouch: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.animateOutro();
            
            FishDiet.state.resetState();
            
            this.scheduleOnce(f => {
                this.parent.transitionTo("start")
            }, .2);
        }
    }
});