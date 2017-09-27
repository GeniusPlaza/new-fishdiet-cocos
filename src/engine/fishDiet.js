// Facade for the engine
// Orchestrate the different components
var FishDiet = new function () {
    var api = GeniusPlazaAPI;
    
    this.data = new GameData();
    this.state = new GameState();
    this.questions = new Questions(this.data, this.state);
    
    this.loadGame = function (gameId) {
        api.gameId = gameId;
        var data = api.loadGame();
        
        if (data) {
            this.data.setGameData(data);
        }
    };
}