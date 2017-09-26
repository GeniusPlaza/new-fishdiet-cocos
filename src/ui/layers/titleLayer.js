
var TitleLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. import cocos studio files
        var size = cc.winSize;
        
        var rootNode = ccs.load(resJson.titleLayer).node;
        this.addChild(rootNode);
                
        // add title sign
        var sign = ccs.load(resJson.titleSign).node;
        var signFinalPos = cc.p(960.00, 635.00);
        sign.setPosition(cc.p(size.width / 2, size.height + 200));
        sign.runAction(new cc.EaseBounceOut(new cc.MoveTo(.6, signFinalPos)));
        sign.runAction(
            new cc.RepeatForever(
                new cc.Sequence(
                    new cc.MoveBy(5, cc.p(0, 25)),
                    new cc.MoveBy(5, cc.p(0, -25))
                )
            )
        );
        
        rootNode.addChild(sign, -1);
        
        // position blue fish and animate
        var blueFish = rootNode.getChildByName("blueFish");
        var blueFinalPos = blueFish.getPosition();
        blueFish.setPosition(cc.p(size.width + blueFish.width, size.height / 2));
        blueFish.runAction(
            new cc.Sequence(
                new cc.DelayTime(.4),
                new cc.MoveTo(.4, blueFinalPos),
                new cc.DelayTime(1),
                new cc.CallFunc(function () {
                    this.runAction(
                        new cc.RepeatForever(
                            new cc.Sequence(
                                new cc.MoveBy(.2, cc.p(-30, 10)),
                                new cc.DelayTime(3),
                                new cc.MoveBy(.2, cc.p(15, 10)),
                                new cc.DelayTime(3),
                                new cc.MoveBy(.2, cc.p(15, -20)),
                                new cc.DelayTime(3)
                            )
                        )
                    );
                }, blueFish)
            )
        );
        
        // animate btn
        var playBtn = rootNode.getChildByName("playBtn");
        var playFinalPos = playBtn.getPosition();
        playBtn.setPosition(cc.p(size.width / 2, -playBtn.height));
        playBtn.runAction(
            new cc.Sequence(
                new cc.DelayTime(.5),
                new cc.EaseBounceOut(new cc.MoveTo(.8, playFinalPos))
            )
        );
        playBtn.addTouchEventListener(this.onPlayBtnTouch, this);
                
        return true;
    },
    onPlayBtnTouch: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.parent.transitionTo("instructions");
        }
    }
});