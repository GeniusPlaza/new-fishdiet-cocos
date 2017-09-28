var MIN_VELOCITY = 30;
var MAX_VELOCITY = 20;

var GameLayer = cc.Layer.extend({
    livesSignPos: cc.p(350, 1000),
    timerSignPos: cc.p(960, 1000),
    scoreSignPos: cc.p(1570, 1000),
    // the whole width, but only 800 of height from
    // point 100 in y
    gameArea: {x: 0, y: 100, width: cc.winSize.width, height: 800},
    gameStarted: false,
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
        this.fishPool = new FishPool();
        
        /////////////////////////////
        // 4. Add player fish
        this.playerFish = new PlayerFish();
        this.playerFish.setPosition(cc.p(this.size.width / 2, this.size.height / 2));
        this.addChild(this.playerFish);
        
        return true;
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
        
        this.schedule(this.createFish, 3, cc.REPEAT_FOREVER, 3);
    },
    createFish: function () {
      if (this.gameStarted) {
          var newFish = this.fishPool.acquire();
          this.addChild(newFish, 2);
          
          // 1 left, 2 right
          var startingSide = Utils.randomNumber(1, 3); 
          if (startingSide == 1) {
              newFish.flip(true);
          }
          
          // position fish
          var startX = startingSide == 1 ? 
              -newFish.width / 2:
               this.size.width + newFish.width;
          var startY = Utils.randomNumber(this.gameArea.y, this.gameArea.height);
          
          newFish.setPosition(cc.p(startX, startY));
          
          // animate movement
          var endX = startingSide == 1 ? 
              this.size.width + newFish.width :
              -newFish.width;
          var speed = Utils.randomNumber(MAX_VELOCITY, MIN_VELOCITY + 1);
          newFish.runAction(
              new cc.Sequence(
                  new cc.MoveTo(speed, cc.p(endX, newFish.y)),
                  new cc.CallFunc(r => {
                      this.fishPool.release(newFish);
                      newFish.flip(false);
                      this.removeChild(newFish);
                  })
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
        this.gameStarted = false;
        this.animateOutro();

        this.scheduleOnce(f => {
            this.parent.transitionTo("start")
        }, .2);
    }
});