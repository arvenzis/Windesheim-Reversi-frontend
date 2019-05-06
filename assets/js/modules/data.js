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
            $.ajax({
                url: uri + configMap.endpoints + id,
                error: function() {
                    throw new Error("Failed to retrieve games");
                }
            }).done(function(data) {
                SPA.gameBoard.init(data.id, JSON.parse(data.gameBoard))
            });
        }
    }

    function getPlayers(gameId) {
        if (configMap.environment === "production") {
             $.ajax({
                url: uri + "api/player/" + gameId,
                error: function() {
                    throw new Error("Failed to retrieve players");
                }
            }).done(function(data) {
                 SPA.gameBoard.storePlayers(data);
                 SPA.gameBoard.getTurn();
            });
        }
    }

    function createGame(gameBoard) {
        if (configMap.environment === "production") {
            let data = JSON.stringify({"gameBoard" : JSON.stringify(gameBoard)});

            $.ajax({
                url: uri + configMap.endpoints,
                type: "POST",
                contentType: "application/json",
                data: data,
                error: function() {
                    throw new Error("Create game gave an error. Please try again.");
                }
            });
        }
    }

    function createPlayer(gameId, name, hasTurn, discColor) {
        if (configMap.environment === "production") {
            let data = JSON.stringify({"gameId" : gameId, "name" : name, "hasTurn" : hasTurn, "discColor" : discColor});

            $.ajax({
                url: uri + "api/player",
                type: "POST",
                contentType: "application/json",
                data: data,
                error: function() {
                    throw new Error("Create player gave an error. Please try again.");
                }
            });
        }
    }

    function updateGame(id, gameBoard) {
        if (configMap.environment === "production") {
            let data = JSON.stringify({"gameBoard" : JSON.stringify(gameBoard)});

            $.ajax({
                url: uri + configMap.endpoints + id,
                type: "PUT",
                contentType: "application/json",
                data: data,
                success: SPA.gameBoard.setTurn,
                error: function () {
                    throw new Error(`Failed to update game with id ${id}`);
                }
            }).done(function() {
               SPA.data.getGame(id);
            });
        }
    }

    function updatePlayerTurn(gameId, playerId, hasTurn) {
        if (configMap.environment === "production") {

            let data = JSON.stringify({"gameId" : gameId, "hasTurn" : hasTurn});

            $.ajax({
                url: uri + "api/player/" + playerId, //@ToDo: configure the endpoint via configMap
                type: "PUT",
                contentType: "application/json",
                data: data,
                error: function () {
                    throw new Error(`Failed to update player with id ${playerId}`);
                }
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
