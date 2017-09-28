
var PlayerFish = cc.Sprite.extend({
    MAX_GROWTH: .6,
    MAX_SHRINK: .4,
    ctor: function () {
        this._super(resImages.playerFish);
        
        this.setScale(this.MAX_GROWTH);
        
        cc.spriteFrameCache.addSpriteFrames(resSpriteSheet.playerFish_plist);
        var fishTexture = cc.textureCache.addImage(resSpriteSheet.playerFish_png),
            fishImages  = cc.SpriteBatchNode.create(fishTexture);
        this.addChild(fishImages);
        
        var animFrames = [];
        var str = "";
        for (var i = 1; i < 20; i++) {
            str = "playerfish00" + (i < 10 ? ("0" + i) : i) + ".png";
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
            var animFrame = new cc.AnimationFrame();
                animFrame.initWithSpriteFrame(spriteFrame, 1, null);
            animFrames.push(animFrame);
        }

        var animation = cc.Animation.create(animFrames, .1);
        animation.setRestoreOriginalFrame(true);
        var animate   = cc.Animate.create(animation);
        animate.repeatForever();
        animate.retain();
        
        this.runAction(animate);
        
        var drag = false;
        
        // follow touch
        if ( cc.sys.capabilities.hasOwnProperty( 'touches' ) )
        {
            cc.eventManager.addListener(
            {
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,

                // called when the touch first begins
                onTouchBegan: (touch, event) => {
                    if (cc.rectContainsPoint(this.getBoundingBox(), touch.getLocation())) {
                        drag = true;
                    }
                    return true;
                },

                // called when the user moves their finger
                onTouchMoved: (touch, event) =>
                {
                    if (drag) {
                        var newPos = touch.getLocation();
                        
                        if (newPos.x > this.getPositionX())
                            this.setFlippedX(true);
                        else
                            this.setFlippedX(false);
                        
                        this.setPosition(newPos);
                    }
                },
                
                onTouchEnded: (touch, event) => {
                    drag = false;
                },
                
                onTouchCancelled: (touch, event) => {
                    drag = false;
                }
            }, this);
        }
        
        return true;
    },
    grow: function () {
        var nextScale = this.getScale();
        nextScale = nextScale + .05 > this.MAX_GROWTH ? this.MAX_GROWTH : nextScale + .05;
        
        this.runAction(new cc.EaseBackOut(new cc.ScaleTo(.2, nextScale)));
    },
    shrink: function () {
        var nextScale = this.getScale();
        nextScale = nextScale - .05 > this.MAX_SHRINK ? this.MAX_SHRINK : nextScale - .05;
        
        this.runAction(new cc.EaseBackInOut(new cc.ScaleTo(.2, nextScale)));
    }
});