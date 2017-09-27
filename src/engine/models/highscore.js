var Highscore = function (highscoreData) {
    var score = 0,
        username = "";
    
    score = highscoreData.score;
    username = highscoreData.username;
    
    return {
        toString: function () {
            return [username, score].join(' '); 
        }
    }
}