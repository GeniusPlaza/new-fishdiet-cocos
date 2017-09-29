var AnswerBubble = cc.Sprite.extend({
    animation: null,
    ctor: function (plist, png, prefix, count) {
        this._super();
        
        cc.spriteFrameCache.addSpriteFrames(
            plist
        );
        var bubbleTexture = cc.textureCache.addImage(png),
            bubbleImages  = cc.SpriteBatchNode.create(bubbleTexture);
        this.addChild(bubbleImages);
        
        var animFrames = [];
        var str = "";
        for (var i = 1; i < count; i++) {
            str = prefix + (i < 10 ? ("0" + i) : i) + ".png";
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
            var animFrame = new cc.AnimationFrame();
                animFrame.initWithSpriteFrame(spriteFrame, 1, null);
            animFrames.push(animFrame);
        }

        var animation = cc.Animation.create(animFrames, .1);
        animation.setRestoreOriginalFrame(true);
        this.animate   = cc.Animate.create(animation);
        this.animate.retain();
        
        return true;
    },
    playAtPos: function (pos) {
        this.setPosition(pos);
        
        this.runAction(
            new cc.Sequence(
                this.animate.clone(),
                new cc.RemoveSelf()
            )
        );
    },
})