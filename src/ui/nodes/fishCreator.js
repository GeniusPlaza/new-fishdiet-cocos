// for some reason it has to be a node, so there's no easy way
// to make it a Singleton
// Just share it x.x
var FishCreator = cc.Node.extend({
    ctor: function () {
        this._super();
        
        var fishBuilder = new FishBuilder();
        
        this.createFish = function () {
            var random = Utils.randomNumber(0, Object.keys(FISH_TYPES).length);
            var type = Object.keys(FISH_TYPES)[random];
            
            fishBuilder.buildFish(FISH_TYPES[type]);
            fishBuilder.buildText(
                FishDiet.questions.getRandomAnswerText()
            );
            
            return fishBuilder.fish;
        }
        
        return true;
    }    
});