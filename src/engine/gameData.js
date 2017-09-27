// Holds all the data loaded from the API
var GameData = function () {
    var title = "",
        icon = "",
        instructions = "",
        audioInstructions = "",
        questions = [],
        highscores = [];
    
    this.setGameData = function (dataObject) {
        title = dataObject.title;
        icon = dataObject.icon;
        instructions = dataObject.description;
        grade = dataObject.grade;
        audioInstructions = dataObject.sound;
        
        questions = dataObject.items.map(function (q) {
            return new Question(q);
        });
    };
    
    this.setLeaderboardData = function (leaderboardData) {
        highscores = leaderboardData.highscores.map(function (h){
            return new Highscore(h);
        });
    };
    
    this.getTitle = function () {
        return title;
    };
    
    this.getIcon = function () {
        return icon;
    };
    
    this.getInstructions = function () {
        return instructions;
    };
    
    this.getAudioInstructions = function () {
        return audioInstructions;
    };
    
    this.getQuestions = function () {
        return questions;
    };
    
    this.getLeaderboard = function () {
        return highscores;
    };
}