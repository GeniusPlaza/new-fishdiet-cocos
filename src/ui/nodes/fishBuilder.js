var FISH_TYPES = {
    BLOWFISH: "blowfish",
    PINKFISH: "pinkfish",
    SEAHORSE: "seahorse",
};

var FISH_RESOURCES = {
    "blowfish": {
        sprite: resImages.blowFish,
        plist: resSpriteSheet.blowFish_plist,
        png: resSpriteSheet.blowFish_png,
        tag: 0
    },
    "pinkfish": {
        sprite: resImages.pinkFish,
        plist: resSpriteSheet.pinkFish_plist,
        png: resSpriteSheet.pinkFish_png,
        tag: 1
    },
    "seahorse": {
        sprite: resImages.seaHorse,
        plist: resSpriteSheet.seaHorse_plist,
        png: resSpriteSheet.seaHorse_png,
        tag: 2
    }
};

var FishBuilder = cc.Node.extend({
    animations: {},
    fish: null,
    ctor: function () {
        this._super();
        
        // is declared in this context so it remains hidden
        var loadAnimationFrames = function (prefix, count) {
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
        
        // create the animations for all the fishes
        Object.values(FISH_TYPES).forEach(fish => {
            cc.spriteFrameCache.addSpriteFrames(FISH_RESOURCES[fish].plist);
            var fishTexture = cc.textureCache.addImage(FISH_RESOURCES[fish].png),
                fishImages  = cc.SpriteBatchNode.create(fishTexture);
            fishImages.setName(fish + "Images");
//            this.addChild(fishImages);

            var animFrames = loadAnimationFrames(fish + "00", 20);

            var animation = cc.Animation.create(animFrames, .1);
            animation.setRestoreOriginalFrame(true);
            var animate   = cc.Animate.create(animation);
            animate.repeatForever();
            animate.retain();
            animate.setTag(FISH_RESOURCES[fish].tag);
            
            this.animations[fish] = animate;
        });
        
        return true;
    },
    buildFish: function (fishType) {
        // make object with helper functions
        this.fish = new EnemyFish(FISH_RESOURCES[fishType].sprite);
        this.fish.runAction(this.animations[fishType].clone());
    },
    buildText: function (text) {        
        if (this.fish) {
            this.fish.setString(text);
        }
    }
});