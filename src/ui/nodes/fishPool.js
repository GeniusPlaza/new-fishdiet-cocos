// for some reason it has to be a node, so there's no easy way
// to make it a Singleton
// Just share it x.x
var FishPool = cc.Node.extend({
    ctor: function () {
        this._super();
        
        var size = 18;
        var availableFishes = [];
        var fishBuilder = new FishBuilder();

        // fishes per type; same amount
        var typeCount = size / Object.keys(FISH_TYPES).length;

        // build fishes of each type
        for (type in FISH_TYPES) {
            for (var i = 0; i < typeCount; i ++) {
                fishBuilder.buildFish(FISH_TYPES[type]);
                fishBuilder.buildText(
                    FishDiet.questions.getRandomAnswerText()
                );
                availableFishes.push(fishBuilder.fish);
            }
        }
        
        Utils.shuffle(availableFishes);
        
        this.acquire = function () {
            var reusable = availableFishes.pop();
            return reusable;
        },
        this.release = function (reusable) {
            availableFishes.push(reusable);
            Utils.shuffle(availableFishes);
        },
        this.update = function () {
            availableFishes.forEach(function (fish) {
                fish.setString(
                    FishDiet.questions.getRandomAnswerText()
                );
            })
        }
        
        return true;
    }    
});