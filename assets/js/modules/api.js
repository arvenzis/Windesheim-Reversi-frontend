SPA.api = (function() {
    let configMap;
    const uri = "https://localhost:5003/";

    function init(env, endpoints){
        configMap = {
            environment: env,
            endpoints: endpoints,
        }
    }

    function validateLogin(username, password) {
         if (configMap.environment === "production") {
             console.log("validate die login g");
            let data = JSON.stringify({"username" : username, "password": password});
            return SPA.data.doCall(uri + "api/auth", "POST", data);
        }
    }

    function getGame(id) {
        if (configMap.environment === "production") {
            return SPA.data.doCall(uri + configMap.endpoints + id, "GET");
        }
    }

    function getPlayers(gameId) {
        if (configMap.environment === "production") {
            return SPA.data.doCall(uri + "api/player/" + gameId, "GET");
        }
    }

    function createGame(gameBoard) {
        if (configMap.environment === "production") {
            let data = JSON.stringify({"gameBoard" : JSON.stringify(gameBoard)});
            return SPA.data.doCall(uri + configMap.endpoints, "POST", data);
        }
    }

    function createPlayer(gameId, name, hasTurn, discColor) {
        if (configMap.environment === "production") {
            let data = JSON.stringify({"gameId" : gameId, "name" : name, "hasTurn" : hasTurn, "discColor" : discColor});
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
                let data = JSON.stringify({"gameId": gameId, "name": player.username, "hasTurn": !player.hasTurn, "discColor": player.discColor});
                SPA.data.doCall(uri + "api/player/" + player.id, "PUT", data);
            });
        }
    }

    return {
        init,
        validateLogin,
        getGame,
        getPlayers,
        createGame,
        createPlayer,
        updateGame,
        updatePlayerTurn
    }
})();