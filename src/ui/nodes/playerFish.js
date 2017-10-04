var PLAYER_FISH_ADJUST = {
    width: 40,
    height: 30
}

var PlayerFish = cc.Sprite.extend({
    MAX_GROWTH: .6,
    MAX_SHRINK: .4,
    newRotation: 0,
    rotationSpeed: .25,
    ctor: function () {
        this._super(resImages.playerFish);
        
        this.setScale(this.MAX_GROWTH);
        
        cc.spriteFrameCache.addSpriteFrames(
            resSpriteSheet.playerFish_plist
        );
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
        
        this.dragging = false;
        var startMousePos = cc.p();
        
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
                        this.dragging = true;
                        startMousePos = touch.getLocation();
                    }
                    return true;
                },

                // called when the user moves their finger
                onTouchMoved: (touch, event) =>
                {
                    if (this.dragging) {
                        var fishPos = this.getPosition();
                        var fishArea = this.getContentSize();
                        
                        var mousePos = touch.getLocation();
                        
                        // true - right
                        var direction = mousePos.x >= startMousePos.x;
                        
                        cc.log(mousePos, fishPos);
                        
                        if (this.isFlippedX()) {
                            // anchor point is always at the end
                            var fishRightB = this.getPositionX();
                            var fishLeftB = this.getPositionX();
                            
                            // flipback only when the direction is left, even if
                            // the starting pos is inside the fish
                            cc.log(direction);
                            if ((mousePos.x < fishLeftB) && !direction) {
                                this.setFlippedX(false);
                            }
                        } else {
                            // anchor point is always at the end
                            var fishRightB = this.getPositionX() + fishArea.width / 4;
                            var fishLeftB = this.getPositionX();
                            
                            if ((mousePos.x > fishLeftB) && direction) {
                                this.setFlippedX(true);
                            }
                        }
                        
                        // the direction is calculated from the current point
                        startMousePos = mousePos;
                        
                        this.setPosition(mousePos);
                        
                        if (this.x > (cc.winSize.width - (this.width * .1)))
                            this.x = cc.winSize.width - (this.width * .1);
                        if (this.x < (this.width  * .1))
                            this.x = this.width * .1;
                        if (this.y > (cc.winSize.height - (this.height * .3)))
                            this.y = cc.winSize.height - (this.height * .3);
                        if (this.y < (this.height  * .3))
                            this.y = this.height * .3;
                    }
                },
                
                onTouchEnded: (touch, event) => {
                    this.dragging = false;
                },
                
                onTouchCancelled: (touch, event) => {
                    this.dragging = false;
                }
            }, this);
        }
        
        this.scheduleUpdate();
        
        return true;
    },
    update: function (dt) {
//        this.setRotationX(this.getRotationX() + (this.newRotationX-this.getRotationX()) * dt);
//        this.setRotationY(this.getRotationY() + (this.newRotationY-this.getRotationY()) * dt);      
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
    },
    flipFish: function () {
        
    },
    setFlippedX: function (bool) {
        this._super(bool);
        
        if (bool)
            this.setAnchorPoint(cc.p(1, .5));
        else
            this.setAnchorPoint(cc.p(0, .5));
    }
});