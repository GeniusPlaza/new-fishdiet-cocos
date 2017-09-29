
var EnemyFish = cc.Sprite.extend({
    ctor: function (texture) {
        this._super(texture);
        
        this.setScale(.5);
        
        var bubble = new cc.Sprite(resImages.bubble);
        bubble.setAnchorPoint(cc.p(0, .5));
        bubble.setScale(.4);
        bubble.setPosition(cc.p(this.width - 20, this.height / 2));
        bubble.setName("bubble");
        this.addChild(bubble, 2);
        
        var text = new cc.LabelTTF("", _b_getFontName(resFonts.vanilla), 200, cc.size(bubble.width + 400, bubble.height), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        text.setFontFillColor(resExtra.textColor);
        text.enableStroke(cc.color.WHITE, 7);
        text.setAnchorPoint(cc.p(.5, .5));
        text.setPosition(cc.p(bubble.width / 2, bubble.height / 2));
        text.setName("text");
        bubble.addChild(text);
        
        return true;
    },
    setString: function (text) {
        this.getChildByName("bubble")
            .getChildByName("text")
            .setString(text);
    },
    getString: function () {
        return this.getChildByName("bubble")
            .getChildByName("text").getString();
    },
    flip: function (bool) {
        this.setFlippedX(bool);
        
        var bubble = this.getChildByName("bubble");
        
        if (this.isFlippedX()) {
            bubble.setAnchorPoint(cc.p(1, .5));
            bubble.setPosition(
                cc.p(20, this.height / 2)
            );
        } else {
            bubble.setPosition(
                cc.p(this.width - 20, this.height / 2)
            );
        }
    }
})