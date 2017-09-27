
var PauseLayer = cc.Layer.extend({
    pausePopupPos: cc.p(960, 530),
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. import cocos studio files
        this.size = cc.winSize;
        
        var pauseBtn = ccs.load(resJson.pauseBtn).node;
        pauseBtn.setPosition(cc.p(1850, 70));
        this.addChild(pauseBtn, 0);
        pauseBtn.setName("pauseBtn");
        pauseBtn.getChildByName("pauseBtn").addTouchEventListener(this.onPauseBtnTouch, this);
        
        this.blackLayer = new BlackLayer();
        this.blackLayer.setPosition(cc.p(0, 0));
        this.blackLayer.setAnchorPoint(cc.p(.5,.5));
        this.blackLayer.setName("blackLayer");
        
        var pausePopup = ccs.load(resJson.pausePopup).node;
        pausePopup.setPosition(cc.p(this.pausePopupPos.x, this.size.height * 2));
        pausePopup.getChildByName("resumeBtn")
            .addTouchEventListener(this.onResumeBtnTouch, this);
        pausePopup.getChildByName("musicSlider")
            .addEventListener(this.onMusicSliderChange, this);
        pausePopup.getChildByName("effectsSlider")
            .addEventListener(this.onEffectsSliderChange, this);
        this.addChild(pausePopup, 2);
        pausePopup.setName("pausePopup");
    },
    onPauseBtnTouch: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            // add black layer
            this.addChild(this.blackLayer, 1);
            
            // pause the game, if it's playing
            this.parent.pauseGame();
            
            // show popup
            var pausePopup = this.getChildByName("pausePopup");
            
            var pausePopupFinalPos = this.pausePopupPos;
            pausePopup.runAction(
                new cc.Sequence(
                    new cc.Place(
                        cc.p(this.pausePopupPos.x, this.size.height * 2)
                    ),
                    new cc.EaseBounceOut(
                        new cc.MoveTo(.5, this.pausePopupPos)
                    )
                )
            );
        }
    },
    onResumeBtnTouch: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            // hide pausepopup
            var pausePopup = this.getChildByName("pausePopup");
            
            pausePopup.runAction(
                new cc.MoveTo(.2, cc.p(this.pausePopupPos.x, this.size.height * 2))
            );
            
            this.scheduleOnce(f => {
                // resume the game, if it's playing
                this.parent.resumeGame();

                // remove black layer
                this.removeChild(this.blackLayer);
            }, 0.2);
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