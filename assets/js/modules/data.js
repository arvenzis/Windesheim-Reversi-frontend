SPA.data = (function() {
    let configMap;
    const uri = "https://localhost:5003/";

    function init(env, endpoints){
        configMap = {
            environment: env,
            endpoints: endpoints,
        }
    }

    function getGame(id) {
        if (configMap.environment === "production") {
            return new Promise(function(resolve, reject) {
                $.ajax({
                    url: uri + configMap.endpoints + id,
                    success: function (result) {
                        resolve(result);
                    },
                    error: function () {
                        reject("Failed to retrieve games");
                    }
                });
            });
        }
    }

    function getPlayers(gameId) {
        if (configMap.environment === "production") {
            return new Promise(function(resolve, reject) {
                $.ajax({
                    url: uri + "api/player/" + gameId,
                    success: function (result) {
                        resolve(result);
                    },
                    error: function () {
                        reject("Failed to retrieve players");
                    }
                });
            });
        }
    }

    function createGame(gameBoard) {
        if (configMap.environment === "production") {
            return new Promise(function(resolve, reject) {
                let data = JSON.stringify({"gameBoard" : JSON.stringify(gameBoard)});

                $.ajax({
                    url: uri + configMap.endpoints,
                    type: "POST",
                    contentType: "application/json",
                    data: data,
                    success: function (result) {
                        resolve(result);
                    },
                    error: function () {
                        reject("Create game gave an error. Please try again.");
                    }
                });
            });
        }
    }

    function createPlayer(gameId, name, hasTurn, discColor) {
        if (configMap.environment === "production") {
            return new Promise(function(resolve, reject) {
                let data = JSON.stringify({"gameId" : gameId, "name" : name, "hasTurn" : hasTurn, "discColor" : discColor});

                $.ajax({
                    url: uri + "api/player",
                    type: "POST",
                    contentType: "application/json",
                    data: data,
                    success: function (result) {
                        resolve(result);
                    },
                    error: function () {
                        reject("Create player gave an error. Please try again.");
                    }
                });
            });
        }
    }

    function updateGame(id, gameBoard) {
        if (configMap.environment === "production") {
            return new Promise(function(resolve, reject) {
                let data = JSON.stringify({"gameBoard" : JSON.stringify(gameBoard)});

                $.ajax({
                    url: uri + configMap.endpoints + id,
                    type: "PUT",
                    contentType: "application/json",
                    data: data,
                    success: function (result) {
                        resolve(result);
                    },
                    error: function () {
                        reject(`Failed to update game with id ${id}`);
                    }
                });
            });
        }
    }

    function updatePlayerTurn(gameId, playerId, hasTurn) {
        if (configMap.environment === "production") {
            return new Promise(function(resolve, reject) {
                let data = JSON.stringify({"gameId" : gameId, "hasTurn" : hasTurn});

                $.ajax({
                    url: uri + "api/player/" + playerId, //@ToDo: configure the endpoint via configMap
                    type: "PUT",
                    contentType: "application/json",
                    data: data,
                    success: function (result) {
                        resolve(result);
                    },
                    error: function () {
                        reject(`Failed to update player with id ${playerId}`);
                    }
                });
            });
        }
    }

    return {
        init,
        getGame,
        getPlayers,
        createGame,
        createPlayer,
        updateGame,
        updatePlayerTurn
    }
})();
