// for some reason it has to be a node, so there's no easy way
// to make it a Singleton
// Just share it x.x
var FishCreator = cc.Node.extend({
    ctor: function (size, rights, wrongs) {
        this._super();
        
        var fishBuilder = new FishBuilder();
        var fishList = [];
        
        var createFish = function (text) {
            
            
            var random = Utils.randomNumber(0, Object.keys(FISH_TYPES).length);
            var type = Object.keys(FISH_TYPES)[random];
            
            fishBuilder.buildFish(FISH_TYPES[type]);
            
            if (!text) {
                fishBuilder.buildText(
                    FishDiet.questions.getRandomAnswerText()
                );
            } else {
                fishBuilder.buildText(text);
            }
            
            return fishBuilder.fish;
        };
        
        this.getFish = function (text) {
            if (fishList.length > 0) {
                return fishList.pop();
            }
            
            return createFish(text);
        };
        
        this.prepareAnswers = function () {
            for (var i = 0; i < rights; i++) {
                fishList.push(createFish(FishDiet.questions.getQuestionRightAnswer()));
            }            
            for (var i = 0; i < wrongs; i++) {
                fishList.push(createFish(FishDiet.questions.getQuestionWrongAnswer()));
            }
            Utils.shuffle(fishList);
        };
        
        return true;
    }    
});