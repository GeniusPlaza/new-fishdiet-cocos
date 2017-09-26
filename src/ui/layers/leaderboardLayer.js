
var LeaderboardLayer = cc.Layer.extend({
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. import cocos studio files
        this.size = cc.winSize;
        
        this.leaderboard = ccs.load(resJson.leaderboard).node;
        this.leaderboard.setPosition(cc.p(960, 540));
        this.leaderboard.setScale(.90);
        this.addChild(this.leaderboard);
        this.leaderboard.getChildByName("score").setFontSize(105);
        
        this.leaderboard.getChildByName("highFiveBtn")
            .addTouchEventListener(this.onHighFiveUpBtnTouch, this);
        this.leaderboard.getChildByName("highFiveBtnDown")
            .addTouchEventListener(this.onHighFiveDownBtnTouch, this);
        this.leaderboard.getChildByName("reflectionBtn")
            .addTouchEventListener(this.onReflectionBtnTouch, this);
        this.leaderboard.getChildByName("replayBtn")
            .addTouchEventListener(this.onReplayBtnTouch, this);
        
        this.reflectionPanel = ccs.load(resJson.reflectionPanel).node;
        this.reflectionPanel.setPosition(cc.p(960, 600));
        this.reflectionPanel.setScale(.85, .90);
        this.reflectionPanel.setVisible(false);
        this.addChild(this.reflectionPanel);
        
        this.reflectionPanel.getChildByName("submitBtn")
            .addTouchEventListener(this.onSubmitBtnTouch, this);
        this.reflectionPanel.getChildByName("reflectionsField").setPlaceHolderColor(cc.color.WHITE);
    },
    animateIntro: function () {
        var leaderboardFinalPos = this.leaderboard.getPosition();
        this.leaderboard.setPosition(
            cc.p(this.size.width * 1.5, this.leaderboard.y)
        );
        this.leaderboard.runAction(
            new cc.EaseBackOut(new cc.MoveTo(.5, leaderboardFinalPos))
        );
    },
    onHighFiveUpBtnTouch: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.leaderboard.getChildByName("highFiveBtn")
                .setVisible(false);
            this.leaderboard.getChildByName("highFiveBtnDown")
                .setVisible(true);
        }
    },
    onHighFiveDownBtnTouch: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.leaderboard.getChildByName("highFiveBtn")
                .setVisible(true);
            this.leaderboard.getChildByName("highFiveBtnDown")
                .setVisible(false);
        }
    },
    onReflectionBtnTouch: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.leaderboard.setVisible(false);
            this.reflectionPanel.setVisible(true);
            
            var reflectionPanelFinalPos = this.reflectionPanel.getPosition();
            this.reflectionPanel.setPosition(
                cc.p(this.reflectionPanel.x, this.size.height * 1.5)
            );
            this.reflectionPanel.runAction(
                new cc.EaseBounceOut(
                    new cc.MoveTo(.5, reflectionPanelFinalPos)
                )
            );
        }
    },
    onSubmitBtnTouch: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.leaderboard.setVisible(true);
            this.reflectionPanel.setVisible(false);
            
            this.animateIntro();
        }
    },
    onReplayBtnTouch: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.parent.transitionTo("start");
        }
    }
});