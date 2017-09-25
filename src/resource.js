var res = {
    bubbles1_plist: "res/sprites/bubbles/bubble/bubbles1.plist",
    bubbles1_png: "res/sprites/bubbles/bubble/bubbles1.png",
    bubbles2_plist: "res/sprites/bubbles/bubble2/bubbles2.plist",
    bubbles2_png: "res/sprites/bubbles/bubble2/bubbles2.png",
};

var resJson = {
//    enemyFish: "res/nodes/EnemyFish.json",
//    gameSign: "res/nodes/GameSign.json",
//    instructionsSign: "res/nodes/InstructionsSign.json",
//    leaderboard: "res/nodes/Leaderboard.json",
//    livesSign: "res/nodes/LivesSign.json",
//    pausePopup: "res/nodes/PausePopup.json",
//    reflectionPanel: "res/nodes/ReflectionPanel.json",
//    scoreSign: "res/nodes/ScoreSign.json",
//    timerSign: "res/nodes/TimerSign.json",
    titleSign_json: "res/nodes/TitleSign.json",
    
    titleLayer_json: "res/layers/TitleLayer.json",
//    startLayer: "res/layers/StartLayer.json",
//    pauseLayer: "res/layers/PauseLayer.json",
//    instructionsLayer: "res/layers/InstructionLayer.json",
    backgroundLayer_json: "res/layers/BackgroundLayer.json",
//    hudLayer: "res/layers/HudLayer.json",
//    reflectionLayer: "res/layers/ReflectionLayer.json",
//    leaderboardLayer: "res/layers/LeaderboardLayer.json",
}

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

for (var i in resJson) {
    g_resources.push(resJson[i]);
}

// color F88C19FF