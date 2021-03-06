var Question = function (questionData) {
    var id = "",
        title = "",
        audioInstructions = "",
        answers = [];
    
    id = questionData.id;
    title = questionData.title;
    audioInstructions = questionData.sound;
    answers = questionData.answers.map(function (a) {
        return new Answer(a);
    });
    
    return {
        getId: function () { return id; },
        getTitle: function () { return title; },
        getAudioInstructions: function () { return audioInstructions; },
        getAnswers: function () {
            return answers;
        },
        getAnswersText: function () {
            return answers.map(function (a) {
                return a.getText();
            });
        },
        checkAnswerCorrect: function (answerText) {
            return answers.find(function (a) {
                return a.getText() === answerText;
            }).isCorrect();
        }
    }
}