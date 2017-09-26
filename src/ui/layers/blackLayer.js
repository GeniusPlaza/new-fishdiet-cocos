
var BlackLayer = cc.LayerColor.extend({
    ctor:function (color) {
        //////////////////////////////
        // 1. super init first
        this._super(new cc.Color(50, 50, 50, 150));

        /////////////////////////////
        // 2. import cocos studio files
        this.size = cc.winSize;
        
        // checks if the device you are using is capable of touch
        if ( cc.sys.capabilities.hasOwnProperty( 'touches' ) )
        {
            cc.eventManager.addListener(
            {
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                // called when the touch first begins
                onTouchBegan:function( touch, event )
                {
                    return true;
                }
            }, this );
        }
    }
});