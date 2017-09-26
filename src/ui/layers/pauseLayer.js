
var PauseLayer = cc.Layer.extend({
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. import cocos studio files
        this.size = cc.winSize;
        
        this.pauseBtn = ccs.load(resJson.pauseBtn).node;
        this.pauseBtn.setPosition(cc.p(1850, 70));
        this.addChild(this.pauseBtn, 0);
        this.pauseBtn.getChildByName("pauseBtn").addTouchEventListener(this.onPauseBtnTouch, this);
        
        this.blackLayer = new BlackLayer();
        this.blackLayer.setPosition(cc.p(0, 0));
        this.blackLayer.setAnchorPoint(cc.p(.5,.5));
        this.blackLayer.setName("blackLayer");
        
        this.pausePopup = ccs.load(resJson.pausePopup).node;
        this.pausePopup.setPosition(cc.p(960, 530));
        this.pausePopup.setVisible(false);
        this.pausePopup.getChildByName("resumeBtn")
            .addTouchEventListener(this.onResumeBtnTouch, this);
        this.pausePopup.getChildByName("musicSlider")
            .addEventListener(this.onMusicSliderChange, this);
        this.pausePopup.getChildByName("effectsSlider")
            .addEventListener(this.onEffectsSliderChange, this);
        this.addChild(this.pausePopup, 2);
    },
    onPauseBtnTouch: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            // add black layer
            this.addChild(this.blackLayer, 1);
            
            // pause the game, if it's playing
            this.parent.pauseGame();
            
            // show popup
            this.pausePopup.setVisible(true);
            var pausePopupFinalPos = this.pausePopup.getPosition();
            this.pausePopup.runAction(
                new cc.Sequence(
                    new cc.Place(
                        cc.p(this.pausePopup.x, this.size.height * 2)
                    ),
                    new cc.EaseBounceOut(
                        new cc.MoveTo(.5, pausePopupFinalPos)
                    )
                )
            );
        }
    },
    onResumeBtnTouch: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            // hide pausepopup
            this.pausePopup.setVisible(false);
            
            // resume the game, if it's playing
            this.parent.resumeGame();
            
            // remove black layer
            this.removeChild(this.blackLayer);
        }
    },
    onMusicSliderChange: function (sender, type) {
        if (type === ccui.Slider.EVENT_PERCENT_CHANGED) {
            cc.log("changing music");
        }
    },
    onEffectsSliderChange: function (sender, type) {
        if (type === ccui.Slider.EVENT_PERCENT_CHANGED) {
            cc.log("changing effects");
        }
    }
});