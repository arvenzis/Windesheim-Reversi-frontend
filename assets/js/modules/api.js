SPA.api = (function() {
    let configMap;
    const uri = "https://localhost:5003/";

    function init(env, endpoints){
        configMap = {
            environment: env,
            endpoints: endpoints,
        }
    }

    function validateLogin(username, password, callback) {
         if (configMap.environment === "production") {
             let loginData = JSON.stringify({"username" : username, "password" : password});
             SPA.data.doCall(uri + "api/auth", "POST", loginData).then(function(player) {
                 callback(player);
             });
        }
    }

    function getGames(callback) {
        if (configMap.environment === "production") {
            SPA.data.doCall(uri + configMap.endpoints, "GET").then(function(games) {
                callback(games);
            })
        }
    }

    function getGame(id, callback) {
        if (configMap.environment === "production") {
            SPA.data.doCall(uri + configMap.endpoints + id, "GET").then(function(game) {
                callback(game);
            })
        }
    }

    function getPlayers(gameId, callback) {
        if (configMap.environment === "production") {
            SPA.data.doCall(uri + "api/player/" + gameId, "GET").then(function(players) {
                callback(players);
            });
        }
    }

    function createGame(gameBoard) {
        if (configMap.environment === "production") {
            let data = JSON.stringify({"gameBoard" : JSON.stringify(gameBoard)});
            return SPA.data.doCall(uri + configMap.endpoints, "POST", data);
        }
    }

    function createPlayer(gameId, username, password, hasTurn, discColor) {
        if (configMap.environment === "production") {
            let data = JSON.stringify({"gameId" : gameId, "username" : username, "password" : password, "hasTurn" : hasTurn, "discColor" : discColor});
            return SPA.data.doCall(uri + "api/player", "POST", data);
        }
    }

    function updateGame(id, gameBoard) {
        if (configMap.environment === "production") {
            let data = JSON.stringify({"gameBoard" : JSON.stringify(gameBoard)});
            return SPA.data.doCall(uri + configMap.endpoints + id, "PUT", data);
        }
    }

    function updatePlayerTurn(gameId, players) {
        if (configMap.environment === "production") {
            players.forEach(function (player) {
                let data = JSON.stringify({"gameId": gameId, "username": player.username, "hasTurn": !player.hasTurn, "discColor": player.discColor});
                SPA.data.doCall(uri + "api/player/" + player.id, "PUT", data);
            });
        }
    }

    return {
        init,
        validateLogin,
        getGames,
        getGame,
        getPlayers,
        createGame,
        createPlayer,
        updateGame,
        updatePlayerTurn
    }
})();