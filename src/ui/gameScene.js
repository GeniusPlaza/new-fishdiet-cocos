
var GameScene = cc.Scene.extend({
    currentLayer: null,
    ctor: function () {
        this._super();
        var size = cc.winSize;
        
        var bg = new BackgroundLayer();
        this.addChild(bg, -1);
        
        var title = new TitleLayer();
        this.addChild(title, 9);
        title.setName("title");
        
        var instructions = new InstructionsLayer();
        this.addChild(instructions, 8);
        instructions.setVisible(false);
        
        var start = new StartLayer();
        this.addChild(start, 7);
        start.setVisible(false);
        
        var leaderboard = new LeaderboardLayer();
        this.addChild(leaderboard, 6);
        leaderboard.setVisible(false);
        
        var game = new GameLayer();
        this.addChild(game, 5);
//        game.setVisible(false);
        
        var hud = new PauseLayer();
        this.addChild(hud, 10);
        
        this.layers = {
            "title": title,
            "instructions": instructions,
            "start": start,
            "game": game,
            "leaderboard": leaderboard
        }
        
        this.transitionTo("title");
    },
    onEnter:function () {
        this._super();
        
//        cc.audioEngine.playMusic(resMusic.bg, true);
    },
    transitionTo: function (name) {        
        if (this.currentLayer && this.currentLayer != "game") {
            this.layers[this.currentLayer].setVisible(false);
        }
        
        this.currentLayer = name;
        
        this.layers[this.currentLayer].setVisible(true);
        this.layers[this.currentLayer].animateIntro();
    },
    pauseGame: function () {
        this.layers["game"].pause();
    },
    resumeGame: function () {
        this.layers["game"].resume();
    }
});