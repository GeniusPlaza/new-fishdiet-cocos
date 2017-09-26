
var BackgroundLayer = cc.Layer.extend({
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. import cocos studio files
        var size = cc.winSize;
        
        var rootNode = ccs.load(resJson.backgroundLayer);        
        this.addChild(rootNode.node);
        
        // animate bubbles 1
        this.animateBubbles1(rootNode.node.getChildByName("bgBubble1"));
        
        // animate bubbles 2
        this.animateBubbles2(rootNode.node.getChildByName("bgBubble2"));
        
        return true;
    },
    animateBubbles1: function (bubbles1) {        
        cc.spriteFrameCache.addSpriteFrames(resSpriteSheet.bubbles1_plist);
        var bubbles1Texture = cc.textureCache.addImage(resSpriteSheet.bubbles1_png),
            bubbles1Images  = cc.SpriteBatchNode.create(bubbles1Texture);
        this.addChild(bubbles1Images);
        
        var animFrames = this.loadAnimateFrames("bubbleAnim100", 30);
        
        var animation = cc.Animation.create(animFrames, .1);
        animation.setRestoreOriginalFrame(true);
        var animate   = cc.Animate.create(animation); 

        bubbles1.runAction(
            new cc.RepeatForever(
                new cc.Sequence(
                    animate,
                    new cc.DelayTime(1)
                )
            )
        ); 
    },
    animateBubbles2: function (bubbles2) {
        cc.spriteFrameCache.addSpriteFrames(resSpriteSheet.bubbles2_plist);
        var bubbles2Texture = cc.textureCache.addImage(resSpriteSheet.bubbles2_png),
            bubbles2Image  = cc.SpriteBatchNode.create(bubbles2Texture);
        this.addChild(bubbles2Image);

        var animFrames = this.loadAnimateFrames("bubbleAnim200", 45);
        
        var animation2 = cc.Animation.create(animFrames, .1);
        animation2.setRestoreOriginalFrame(true);
        var animate2   = cc.Animate.create(animation2);
        
        bubbles2.runAction(
            new cc.RepeatForever(
                new cc.Sequence(
                    new cc.DelayTime(1.5),
                    animate2
                )
            )
        );
    },
    loadAnimateFrames: function (prefix, count) {
        var animFrames = [];
        var str = "";
        for (var i = 1; i < count; i++) {
            str = prefix + (i < 10 ? ("0" + i) : i) + ".png";
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
            var animFrame = new cc.AnimationFrame();
                animFrame.initWithSpriteFrame(spriteFrame, 1, null);
            animFrames.push(animFrame);
        }
        
        return animFrames;
    }
});