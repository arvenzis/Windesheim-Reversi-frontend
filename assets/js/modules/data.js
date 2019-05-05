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
                success: function(gameData) {
                    SPA.gameBoard.init(gameData.id, JSON.parse(gameData.gameBoard));
                },
                error: function() {
                    throw new Error("Failed to retrieve games");
                }
            });
        }
    }

    function getPlayer(gameId) {
        if (configMap.environment === "production") {
            $.ajax({
                url: uri + "api/player/" + gameId,
                success: function(player) {
                    //SPA.gameBoard.init(gameData.id, JSON.parse(gameData.gameBoard));
                    console.log("doar hejjem weh! " + player);
                },
                error: function() {
                    throw new Error("Failed to retrieve players");
                }
            });
        }
    }

    function createGame(gameBoard) {
        if (configMap.environment === "production") {
            let data = JSON.stringify({"gameBoard" : JSON.stringify(gameBoard)});

            $.ajax({
                url: uri + configMap.endpoints,
                async: true,
                type: "POST",
                contentType: "application/json",
                data: data,
                success: function() {
                    console.log('A new game has been created');
                },
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
                async: true,
                type: "POST",
                contentType: "application/json",
                data: data,
                success: function() {
                    console.log('A new player has been created');
                },
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
                async: true,
                contentType: "application/json",
                data: data,
                success: function () {
                    console.log("I've updated the game board for ya");
                    //SPA.data.updatePlayerTurn(id, )
                    SPA.data.getGame(id);
                },
                error: function () {
                    throw new Error(`Failed to update game with id ${id}`);
                }
            });

            //Update HasTurn of player
        }
    }

    function updatePlayerTurn(gameId, playerId, hasTurn) {
        if (configMap.environment === "production") {

            let data = JSON.stringify({"gameId" : gameId, "hasTurn" : hasTurn});

            $.ajax({
                url: uri + "api/player/" + playerId, //@ToDo: configure the endpoint via configMap
                type: "PUT",
                async: true,
                contentType: "application/json",
                data: data,
                success: function () {
                    console.log("I switched the turn of the player for ya");
                },
                error: function () {
                    throw new Error(`Failed to update player with id ${playerId}`);
                }
            });

            //Update HasTurn of player
        }
    }

    return {
        init,
        getGame,
        getPlayer,
        createGame,
        createPlayer,
        updateGame,
        updatePlayerTurn
    }
})();
