
// Holds the state of the current playthrough
var GameState = function () {
    var score = 0,
        lives = MAX_LIVES;
    
    this.reduceLive = function () {
        lives = lives - 1 < 0 ? 0 : lives - 1;
    };
    
    this.addScore = function (score) {
        score += score;
    };
    
    this.getScore = function () {
        return score;
    };
    
    this.getLives = function () {
        return lives;
    };
    
    this.resetState = function () {
        score = 0;
        lives = MAX_LIVES;
    };
}