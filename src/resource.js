var resSpriteSheet = {
    bubbles1_plist: "res/sprites/bubbles/bubble/bubbles1.plist",
    bubbles1_png: "res/sprites/bubbles/bubble/bubbles1.png",
    bubbles2_plist: "res/sprites/bubbles/bubble2/bubbles2.plist",
    bubbles2_png: "res/sprites/bubbles/bubble2/bubbles2.png",
    seaHorse_plist: "res/sprites/fishes/seaHorse/seaHorse.plist",
    seaHorse_png: "res/sprites/fishes/seaHorse/seaHorse.png",
    blowFish_plist: "res/sprites/fishes/blowFish/blowFish.plist",
    blowFish_png: "res/sprites/fishes/blowFish/blowFish.png",
    pinkFish_plist: "res/sprites/fishes/pinkFish/pinkFish.plist",
    pinkFish_png: "res/sprites/fishes/pinkFish/pinkFish.png",
    playerFish_plist: "res/sprites/fishes/playerFish/playerFish.plist",
    playerFish_png: "res/sprites/fishes/playerFish/playerFish.png"
};

var resImages = {
    seaHorse: "res/sprites/fishes/seaHorse/seahorse0001.png",
    blowFish: "res/sprites/fishes/blowFish/blowfish0001.png",
    pinkFish: "res/sprites/fishes/pinkFish/pinkfish0001.png",
    playerFish: "res/sprites/fishes/playerFish/playerfish0001.png",
    sliderHanlder: "res/sprites/ui/slider_handler2.png",
    ropeSlider: "res/sprites/ui/ropeSlider.png"
};

var resJson = {
    button: "res/nodes/Button.json",
    pauseBtn: "res/nodes/PauseBtn.json",
    enemyFish: "res/nodes/EnemyFish.json",
    gameSign: "res/nodes/GameSign.json",
    instructionsSign: "res/nodes/InstructionsSign.json",
    leaderboard: "res/nodes/Leaderboard.json",
    livesSign: "res/nodes/LivesSign.json",
    scoreSign: "res/nodes/ScoreSign.json",
    timerSign: "res/nodes/TimerSign.json",
    pausePopup: "res/nodes/PausePopup.json",
    reflectionPanel: "res/nodes/ReflectionPanel.json",
    titleSign: "res/nodes/TitleSign.json",
    
    titleLayer: "res/layers/TitleLayer.json",
    instructionsLayer: "res/layers/InstructionLayer.json",
    backgroundLayer: "res/layers/BackgroundLayer.json"
}

var g_resources = [];
for (var i in resSpriteSheet) {
    g_resources.push(resSpriteSheet[i]);
}

for (var i in resJson) {
    g_resources.push(resJson[i]);
}

for (var i in resImages) {
    g_resources.push(resImages[i]);
}

// color F88C19FF