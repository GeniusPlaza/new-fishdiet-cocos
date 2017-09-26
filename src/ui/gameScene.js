
var GameScene = cc.Scene.extend({
    currentLayer: null,
    ctor: function () {
        this._super();
        var size = cc.winSize;
        
        var bg = new BackgroundLayer();
        this.addChild(bg, -1);
        
        var title = new TitleLayer();
        this.addChild(title, 0);
        title.setName("title");
        this.currentLayer = "title";
        
        var instructions = new InstructionsLayer();
        this.addChild(instructions, 0);
        instructions.setVisible(false);
        
        var start = new StartLayer();
        this.addChild(start, 0);
        start.setVisible(false);
        
        var hud = new PauseLayer();
        this.addChild(hud, 10);
        
        this.layers = {
            "title": title,
            "instructions": instructions,
            "start": start
        }
    },
    onEnter:function () {
        this._super();
    },
    transitionTo: function (name) {
        cc.log("transitioning to: " + name);
        
        // TODO: animate leaving
        this.layers[this.currentLayer].setVisible(false);
        this.currentLayer = name;
        
        this.layers[this.currentLayer].setVisible(true);
        this.layers[this.currentLayer].animateIntro();
    },
    pauseGame: function () {
        
    },
    resumeGame: function () {
        
    }
});