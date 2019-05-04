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
                    SPA.gameBoard.init(JSON.parse(gameData.gameBoard));
                },
                error: function() {
                    throw new Error("Failed to retrieve games");
                }
            });
        }
    }

    function createGame(playerOneId, playerTwoId, gameBoard) {
        if (configMap.environment === "production") {
            gameBoard = JSON.stringify(gameBoard);
            let data = JSON.stringify({"playerOneId" : playerOneId, "playerTwoId" : playerTwoId, "gameBoard" : gameBoard});

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

    function createPlayer(name, hasTurn, discColor) {
        if (configMap.environment === "production") {
            let data = JSON.stringify({"name" : name, "hasTurn" : hasTurn, "DiscColor" : discColor});

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

    function updateGame(id, HasTurn, gameBoard) {
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
                },
                error: function () {
                    throw new Error(`Failed to update game with id ${id}`);
                }
            });

            //Update HasTurn of player
        }
    }

    function updatePlayer(id, HasTurn) {
        if (configMap.environment === "production") {

            $.ajax({
                url: uri + "api/player/" + id, //endpoint configured differently
                type: "PUT",
                async: true,
                contentType: "application/json",
                data: HasTurn,
                success: function () {
                    console.log("I switched the turn of the player for ya");
                },
                error: function () {
                    throw new Error(`Failed to update game with id ${id}`);
                }
            });

            //Update HasTurn of player
        }
    }

    return {
        init,
        getGame,
        createGame,
        createPlayer,
        updateGame
    }
})();
