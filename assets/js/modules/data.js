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

    function createGame(playerId, gameBoard) {
        if (configMap.environment === "production") {
            gameBoard = JSON.stringify(gameBoard);
            let data = JSON.stringify({"playerId" : playerId, "gameBoard" : gameBoard});

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

    function updateGame(id, playerId, gameBoard){
        if (configMap.environment === "production") {
            gameBoard = JSON.stringify(gameBoard);
            let data = JSON.stringify({"playerId" : playerId, "gameBoard" : gameBoard});

            $.ajax({
                url: uri + configMap.endpoints + id,
                type: "PUT",
                async: true,
                contentType: "application/json",
                data: data,
                success: function () {
                    console.log();
                },
                error: function () {
                    throw new Error(`Failed to update game with id ${id}`);
                }
            });
        }
    }

    return {
        init,
        getGame,
        createGame,
        updateGame
    }
})();
