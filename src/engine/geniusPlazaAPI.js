// Provide gameId before using the API
// When the game loads, it also loads the user data
// All submitions are done to the gameId and userId combination
// If no gameId and userId are provided, the API throws an invalid keys error
var GeniusPlazaAPI = {
    gameId: "",
    userId: "",
    username: "",
    siteUrl: "",
    loadGame: function () {
        $.post(
            "/en/games",
            {action: 'loadgame', gameid: this.gameid},
            function(response)
            {
                if (response.result=='ok')
                {
                    return response.data;
                }
                else
                {
                    console.log(response);
                    return null;
                }
            }
        );
    },
    loadUser: function () {
        $.post(
            "/en/check_login",
            function(response)
            {			
                if (response.result=='ok')
                {
                    this.userId = response.uid;
                    this.username = response.username;
                }
                else
                {
                    console.log("Error loading user data");
                }
            },
            'json'
        );
    },
    loadHighscores: function () {
        $.post(
            "/en/gethighscores",
            {resourceid:this.gameId},
            function(response)
            {			
                if (response.result=='ok')
                {
                    return = response.highscores;
                }
                else
                {
                    console.log(data);
                    return null;
                }
            },
            'json'
        );
    },
    submitHighFive: function (highFive) {},
    submitReflection: function (reflectionText) {},
    submitScore: function (score) {
        $.post(
            '/en/scoregames/submitscore/', 
            { userid: this.userId, score: score, gameid: this.gameId},
            function(data)
            {			
                console.log('Submiting scores.');
                console.log(data);
            },
            'json'
        );
    }
}