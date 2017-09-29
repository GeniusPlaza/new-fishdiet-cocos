

// Holds the state of the current playthrough
var GameState = function () {
    var score = 0,
        lives = MAX_LIVES,
        currentQuestionIndex = 0;
    
    this.reduceLife = function () {
        lives = lives - 1 < 0 ? 0 : lives - 1;
    };
    
    this.addScore = function (points) {
        score += points;
    };
    
    this.getScore = function () {
        return score;
    };
    
    this.getLives = function () {
        return lives;
    };
    
    this.getCurrentQuestionIndex = function () {
        return currentQuestionIndex;
    };
    
    this.restoreLives = function () {
        lives = MAX_LIVES;
    };
    
    this.resetState = function () {
        score = 0;
        lives = MAX_LIVES;
        currentQuestionIndex = 0;
    };
    
    this.goToNextQuestion = function () {
        currentQuestionIndex += 1;
    };
}