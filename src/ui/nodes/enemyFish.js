var EnemyFish = cc.Sprite.extend({
    ctor: function (texture) {
        this._super(texture);
        
        this.setScale(.5);
        
        var bubble = new cc.Sprite(resImages.bubble);
        bubble.setAnchorPoint(cc.p(0, .5));
        bubble.setPosition(cc.p(this.width - 40, this.height / 2));
        bubble.setScale(.4);
        bubble.setName("bubble");
        this.addChild(bubble, 2);
        
        var text = new cc.LabelTTF("", _b_getFontName(resFonts.vanilla), 60, cc.size(400, 200), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        text.setFontFillColor(resExtra.textColor);
        text.enableStroke(cc.color.WHITE, 5);
        text.setAnchorPoint(cc.p(0, .5));
        text.setPosition(bubble.getPosition());
        text.x += 30;
        text.setName("text");
        this.addChild(text, 3);
        
        return true;
    },
    setString: function (text) {
        this.getChildByName("text").setString(text);
    },
    flip: function (bool) {
        this.setFlippedX(bool);
        
        if (this.isFlippedX()) {
            this.getChildByName("bubble").setPosition(
                cc.p(20, this.height / 2)
            );
            this.getChildByName("bubble").setAnchorPoint(
                cc.p(1, .5)
            );
            
            this.getChildByName("text").setPosition(
                this.getChildByName("bubble").getPosition()
            );
            this.getChildByName("text").x -= 40;
            this.getChildByName("text").setAnchorPoint(
                cc.p(1, .5)
            );
            this.getChildByName("text").setHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
        } else {
            this.getChildByName("bubble").setPosition(
                cc.p(this.width - 40, this.height / 2)
            );
            this.getChildByName("bubble").setAnchorPoint(
                cc.p(0, .5)
            );
            
            this.getChildByName("text").setPosition(
                this.getChildByName("bubble").getPosition()
            );
            this.getChildByName("text").x += 30;
            this.getChildByName("text").setAnchorPoint(
                cc.p(0, .5)
            );
            this.getChildByName("text").setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        }
        
        this.runAction(this.animation);
    },
    setAnimation: function (animation) {
        this.animation = animation;
        this.runAction(animation);
    }
})