var MIN_VELOCITY = 30;
var MAX_VELOCITY = 15;
var MAX_TIME = 60;

var GameLayer = cc.Layer.extend({
    livesSignPos: cc.p(350, 1000),
    timerSignPos: cc.p(960, 1000),
    scoreSignPos: cc.p(1570, 1000),
    // the whole width, but only 800 of height from
    // point 100 in y
    gameHeight: {y: 100, height: 800},
    gameStarted: false,
    fishList: [],
    lives: [],
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
        this.lives = [
            livesSign.getChildByName("life1"),
            livesSign.getChildByName("life2"),
            livesSign.getChildByName("life3")
        ];
        
        var timerSign = ccs.load(resJson.timerSign).node;
        timerSign.time = MAX_TIME;
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
        
        /////////////////////////////
        // 6.
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
                this.removeChild(f);
                this.fishList.splice(this.fishList.indexOf(f), 1);
                
                var result = FishDiet.eatFish(f.getString());
                
                // play bubble and reproduce effect depending on answer
                if (result) {
                    var right = new AnswerBubble(
                        resSpriteSheet.bubblesRight_plist,
                        resSpriteSheet.bubblesRight_png,
                        "bubbleAnim300",
                        12
                    );
                    right.setScale(1.3);
                    right.setAnchorPoint(cc.p(.5, .1));
                    this.addChild(right);
                    right.playAtPos(f.getPosition());
                    
                    // update score and animate
                    this.getChildByName("scoreSign")
                        .getChildByName("scoreText")
                        .setString(FishDiet.state.getScore().toFixed(0));
                    this.getChildByName("scoreSign")
                        .getChildByName("scoreText")
                        .runAction(
                            new cc.Sequence(
                                new cc.EaseBackIn(new cc.ScaleTo(.25, 1.2)),
                                new cc.EaseBackOut(new cc.ScaleTo(.25, 1))
                            )
                        );
                } else {
                    var wrong = new AnswerBubble(
                        resSpriteSheet.bubblesWrong_plist,
                        resSpriteSheet.bubblesWrong_png,
                        "BubblePop_000",
                        12
                    );
                    wrong.setScale(.5);
                    this.addChild(wrong);
                    wrong.playAtPos(f.getPosition());
                    
                    if (FishDiet.state.getLives() > 1) {
                        this.lives[0].setColor(cc.color.YELLOW);
                        this.lives[1].setColor(cc.color.YELLOW);
                        
                        // go faster
                        [this.lives[0], this.lives[1]].forEach(l => {
                            l.runAction(
                                new cc.RepeatForever(
                                    new cc.Sequence(
                                        new cc.ScaleTo(.25, .22, .15),
                                        new cc.ScaleTo(.25, .2, .13)
                                    )
                                )
                            )
                        });
                        
                        this.lives[2].setVisible(false);
                    } else if (FishDiet.state.getLives() > 0) {
                        this.lives[0].setColor(cc.color.RED);
                        
                        // go even faster
                        this.lives[0].runAction(
                            new cc.RepeatForever(
                                new cc.Sequence(
                                    new cc.Sequence(
                                        new cc.ScaleTo(.1, .22, .15),
                                        new cc.ScaleTo(.1, .2, .13)
                                    )
                                )
                            )
                        );
                        
                        this.lives[1].setVisible(false);
                    } else {
                        this.lives[0].setVisible(false);
                    }
                }
            }
        });
        
        if (!FishDiet.isAlive()) {
            this.onGameEnded();
        }
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
        
        this.scheduleUpdate();
        this.schedule(this.createFish, 2, cc.REPEAT_FOREVER, 3);
        this.schedule(this.tickTimer, 1, cc.REPEAT_FOREVER, 4);
    },
    createFish: function (dt) {
      if (this.gameStarted) {
          var newFish = this.fishPool.createFish();
          this.addChild(newFish);
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
    tickTimer: function (dt) {
        var timerSign = this.getChildByName("timerSign");
        timerSign.time -= 1;
        timerSign.getChildByName("timerText").setString(timerSign.time);
        
        if (timerSign.time - 1 == 0) {
            this.onGameEnded();
        }
    },
    animateIntro: function () {
        var livesSign = this.getChildByName("livesSign");
        var timerSign = this.getChildByName("timerSign");
        var scoreSign = this.getChildByName("scoreSign");
        
        livesSign.getChildByName("questionLabel").setString(
            FishDiet.questions.getCurrentQuestionTitle()
        );
        
        // reset lives color        
        this.lives.forEach(l => {
            l.setVisible(true);
            l.setColor(cc.color.GREEN);
            
            l.runAction(
                new cc.RepeatForever(
                    new cc.Sequence(
                        new cc.ScaleTo(.5, .22, .15),
                        new cc.ScaleTo(.5, .2, .13)
                    )
                )
            );
        });
        //
        
        livesSign.setPosition(cc.p(this.livesSignPos.x, this.size.height + 200));
        livesSign.runAction(
            new cc.EaseBounceOut(new cc.MoveTo(.3, this.livesSignPos))
        );
        
        timerSign.setPosition(cc.p(this.timerSignPos.x, this.size.height + 500));
        timerSign.runAction(
            new cc.EaseBounceOut(new cc.MoveTo(.5, this.timerSignPos))
        );
        timerSign.time = MAX_TIME;
        timerSign.getChildByName("timerText").setString(timerSign.time);
        
        scoreSign.setPosition(cc.p(this.scoreSignPos.x, this.size.height + 500));
        scoreSign.runAction(
            new cc.EaseBounceOut(new cc.MoveTo(.7, this.scoreSignPos))
        );
        this.getChildByName("scoreSign")
            .getChildByName("scoreText")
            .setString(FishDiet.state.getScore().toFixed(0));
        
        this.scheduleOnce(this.countDown, .7);
    },
    animateOutro: function () {
        var livesSign = this.getChildByName("livesSign");
        var timerSign = this.getChildByName("timerSign");
        var scoreSign = this.getChildByName("scoreSign");
        
        // restart lives
        this.lives.forEach(l => {
            l.stopAllActions();
        });
        
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
        this.fishList = [];
        
        this.animateOutro();
        
        FishDiet.nextQuestion();
        
        if (FishDiet.isQuestionsCompleted()) {
            this.scheduleOnce(f => {
                this.parent.transitionTo("leaderboard")
            }, .2);
        } else {
            this.scheduleOnce(f => {
                this.parent.transitionTo("start")
            }, .2);
        }        
    }
});