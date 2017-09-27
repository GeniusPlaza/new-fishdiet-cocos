// Facade for the engine
// Orchestrate the different components
var FishDiet = function () {
    var api = GeniusPlazaAPI;
    
    this.data = new GameData();
    this.state = new GameState();
    
    this.loadGame = function (gameId) {
        api.gameId = gameId;
        var data = api.loadGame();
        
        if (data) {
            this.data.setGameData(data);
        }
    };
}