// Manages the game questions, checks for correct answers
var Questions = function (data, state) {    
    this.getRandomAnswerText = function () {
        var currentQuestion = data.getQuestions()[state.getCurrentQuestionIndex()];
        
        if (currentQuestion) {
            var answersText = currentQuestion.getAnswersText()

            var index = Utils.randomNumber(0, answersText.length);
            return answersText[index];
        }
        
        return "";
    };
    
    this.checkAnswerCorrect = function (answer) {
        var currentQuestion = data.getQuestions()[state.getCurrentQuestionIndex()];
        
        if (currentQuestion)
            return currentQuestion.checkAnswerCorrect(answer);
        else
            return false;
    };
    
    this.getCurrentQuestionTitle = function () {
        var currentQuestion = data.getQuestions()[state.getCurrentQuestionIndex()];
        
        if (currentQuestion)
            return currentQuestion.getTitle();
        else
            return "";
    };
    
    this.getQuestionRightAnswer = function () {
        var currentQuestion = data.getQuestions()[state.getCurrentQuestionIndex()];
        
        if (currentQuestion) {
            var answers = currentQuestion.getAnswers().filter(
                function (a) {return a.isCorrect();}
            );
            
            var index = Utils.randomNumber(0, answers.length);
            return answers[index].getText();
        }
        return null;
    };
    
    this.getQuestionWrongAnswer = function () {
        var currentQuestion = data.getQuestions()[state.getCurrentQuestionIndex()];
        
        if (currentQuestion) {
            var answers = currentQuestion.getAnswers().filter(
                function (a) {return !a.isCorrect();}
            );
            
            var index = Utils.randomNumber(0, answers.length);
            return answers[index].getText();
        }
        return null;
    };
    
    this.getCurrentQuestionAudio = function () {
        var currentQuestion = data.getQuestions()[state.getCurrentQuestionIndex()];
        
        return currentQuestion.getAudioInstructions();
    };
}