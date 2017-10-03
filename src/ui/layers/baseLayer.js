
var BaseLayer = cc.Layer.extend({
    nextLayer: "",
    animationSpeed: .2,
    transitionDelay: .2,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        
        return true;
    },
    animateIntro: function () {
        cc.eventManager.pauseTarget(this, true);
        
        this.scheduleOnce(f => {
            cc.eventManager.resumeTarget(this, true);
        }, this.animationSpeed + this.transitionDelay);
    },
    animateOutro: function () {
        cc.eventManager.pauseTarget(this, true);
        
        this.scheduleOnce(f => {
            cc.eventManager.resumeTarget(this, true);
        }, this.animationSpeed + this.transitionDelay);
    },
    onPlayBtnTouch: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.animateOutro();
            
            this.scheduleOnce(f => {
                this.parent.transitionTo(this.nextLayer)
            }, this.animationSpeed + this.transitionDelay);
        }
    }
});