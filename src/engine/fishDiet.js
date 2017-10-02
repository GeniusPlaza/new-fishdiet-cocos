// Facade for the engine
// Orchestrate the different components
var FishDiet = new function () {
    var api = GeniusPlazaAPI;
    
    var questionsCompleted = false;
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
    
    this.eatFish = function (fishText) {
        var result = this.questions.checkAnswerCorrect(fishText);
        
        if (result) {
            this.state.addScore(SCORE_PER_FISH);
        } else {
            this.state.reduceLife();
        }
        
        return result;
    };
    
    this.isAlive = function () {
        return this.state.getLives() > 0;
    };
    
    this.isQuestionsCompleted = function () {
        return questionsCompleted;
    };
    
    this.nextQuestion = function () {
        this.state.restoreLives();
        this.state.goToNextQuestion();
        
        // no more questions
        if (this.state.getCurrentQuestionIndex() >= this.data.getQuestions().length) {
            questionsCompleted = true;
            
//            api.submitScore(this.state.getScore());
        }
    };
    
    this.submitReflection = function (text) {
        api.submitReflection(text);
    };
    
    this.submitHighFive = function (bool) {
        api.submitHighFive(bool);
    };
    
    this.replayGame = function () {
        this.state.resetState();
        questionsCompleted = false;
    }
}