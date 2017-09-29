var Answer = function (answerData) {
    var id = "",
        text = "",
        isCorrect = false;
    
    id = answerData.id;
    text = answerData.text.trim();
    isCorrect = answerData.is_correct;
    
    return {
        getId: function () { return id; },
        getText: function () { return text; },
        isCorrect: function () { return isCorrect; }
    }
}