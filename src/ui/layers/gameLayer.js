var MIN_VELOCITY = 30;
var MAX_VELOCITY = 15;

var GameLayer = cc.Layer.extend({
    livesSignPos: cc.p(350, 1000),
    timerSignPos: cc.p(960, 1000),
    scoreSignPos: cc.p(1570, 1000),
    // the whole width, but only 800 of height from
    // point 100 in y
    gameHeight: {y: 100, height: 800},
    gameStarted: false,
    fishList: [],
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. import cocos studio files
        this.size = cc.winSize;
        
        // position signs
        var livesSign = ccs.load(resJson.livesSign).node;
        this.addChild(livesSign, 1);
        livesSign.setName("livesSign");
        livesSign.getChildByName("questionLabel").setString(
            FishDiet.questions.getCurrentQuestionTitle()
        );
        
        var timerSign = ccs.load(resJson.timerSign).node;
        this.addChild(timerSign, 1);
        timerSign.setName("timerSign");
        
        var scoreSign = ccs.load(resJson.scoreSign).node;
        this.addChild(scoreSign, 1);
        scoreSign.setName("scoreSign");
        
        var rootNode = ccs.load(resJson.enemyFish);
        
        /////////////////////////////
        // 3. Create a fish pool
        this.fishPool = new FishCreator();
        
        /////////////////////////////
        // 4. Add player fish
        this.playerFish = new PlayerFish();
        this.playerFish.setPosition(cc.p(this.size.width / 2, this.size.height / 2));
        this.addChild(this.playerFish);
        
        this.scheduleUpdate();
        
        return true;
    },
    update: function (dt) {
        var playerFishBox = this.playerFish.getBoundingBox();
        // fixing for more realistic collision
        playerFishBox.width -= 30;
        playerFishBox.height -= 20;
        
        this.fishList.forEach(f => {
            var fBox = f.getBoundingBox();
            // fixing for more realistic collision
            fBox.width -= FISH_BOX_FISHING[f.type].width;
            fBox.height -= FISH_BOX_FISHING[f.type].height;
            
            if (cc.rectIntersectsRect(playerFishBox, fBox)) {
                // remove fish from layer and list because it has been eaten
                cc.log(playerFishBox);
                cc.log(fBox);
                this.removeChild(f);
                this.fishList.splice(this.fishList.indexOf(f), 1);
            }
        })
    },
    countDown: function () {
        var countDown = 3;
        var countDownLabel = new cc.LabelTTF(countDown.toFixed(0), _b_getFontName(resFonts.vanilla), 400);
        countDownLabel.setFontFillColor(resExtra.textColor);
        countDownLabel.enableStroke(cc.color.WHITE, 5);
        countDownLabel.setPosition(
            cc.p(this.size.width / 2, this.size.height / 2)
        );
        this.addChild(countDownLabel, 3);
        
        this.schedule(f => {
            countDown -= 1;
            
            if (countDown > 0) {
                countDownLabel.setString(countDown.toFixed(0));
            } else {
                countDownLabel.setString("Go!");
                countDownLabel.runAction(
                    new cc.Sequence(
                        new cc.DelayTime(.5),
                        new cc.RemoveSelf()
                    )
                )
            }
        }, 1, 4, 1);
        
        this.gameStarted = true;
        
        this.schedule(this.createFish, 4, cc.REPEAT_FOREVER, 3);
    },
    createFish: function (dt) {
      if (this.gameStarted) {
          var newFish = this.fishPool.createFish();
          this.addChild(newFish, 2);
          this.fishList.push(newFish);
          
          // 1 left, 2 right
          var startingSide = Utils.randomNumber(1, 3); 
          if (startingSide == 1) {
              newFish.flip(true);
          }
          
          // position fish
          var startX = startingSide == 1 ? 
              -newFish.width / 2:
               this.size.width + newFish.width;
          var startY = Utils.randomNumber(this.gameHeight.y, this.gameHeight.height);
          
          newFish.setPosition(cc.p(startX, startY));
          
          // animate movement
          var endX = startingSide == 1 ? 
              this.size.width + newFish.width :
              -newFish.width;
          var speed = Utils.randomNumber(MAX_VELOCITY, MIN_VELOCITY + 1);
          newFish.runAction(
              new cc.Sequence(
                  new cc.MoveTo(speed, cc.p(endX, newFish.y)),
                  new cc.CallFunc(f => {
                      var index = this.fishList.indexOf(newFish);
                      this.fishList.splice(index, 1);
                  }),
                  new cc.RemoveSelf()
              )
          );
      }
    },
    animateIntro: function () {
        var livesSign = this.getChildByName("livesSign");
        var timerSign = this.getChildByName("timerSign");
        var scoreSign = this.getChildByName("scoreSign");
        
        livesSign.setPosition(cc.p(this.livesSignPos.x, this.size.height + 200));
        livesSign.runAction(
            new cc.EaseBounceOut(new cc.MoveTo(.3, this.livesSignPos))
        );
        
        timerSign.setPosition(cc.p(this.timerSignPos.x, this.size.height + 500));
        timerSign.runAction(
            new cc.EaseBounceOut(new cc.MoveTo(.5, this.timerSignPos))
        );
        
        scoreSign.setPosition(cc.p(this.scoreSignPos.x, this.size.height + 500));
        scoreSign.runAction(
            new cc.EaseBounceOut(new cc.MoveTo(.7, this.scoreSignPos))
        );
        
        this.scheduleOnce(this.countDown, .7);
    },
    animateOutro: function () {
        var livesSign = this.getChildByName("livesSign");
        var timerSign = this.getChildByName("timerSign");
        var scoreSign = this.getChildByName("scoreSign");
        
        livesSign.runAction(
            new cc.EaseBackIn(
                new cc.MoveTo(.2, cc.p(this.livesSignPos.x, this.size.height + 200))
            )
        );
        timerSign.runAction(
            new cc.EaseBackIn(
                new cc.MoveTo(.2, cc.p(this.timerSignPos.x, this.size.height + 500))
            )
        );
        scoreSign.runAction(
            new cc.EaseBackIn(
                new cc.MoveTo(.2, cc.p(this.scoreSignPos.x, this.size.height + 500))
            )
        );
    },
    onGameEnded: function () {
        // clear everything for next game
        this.gameStarted = false;
        this.unscheduleAllCallbacks();
        this.fishList.forEach(f => {
            this.removeChild(f);
        });
        
        this.animateOutro();

        this.scheduleOnce(f => {
            this.parent.transitionTo("start")
        }, .2);
    }
});