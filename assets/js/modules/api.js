SPA.api = (function() {

    function validateLogin(username, password, callback) {
         let loginData = JSON.stringify({"username" : username, "password" : password});
         SPA.data.doCall("api/auth", "POST", loginData).then(function(player) {
             callback(player);
         }).catch(function() {
             callback(false);
         })
    }

    function getGames(callback) {
        SPA.data.doCall("api/game", "GET").then(function(games) {
            callback(games);
        });
    }

    function getGame(id, callback) {
        SPA.data.doCall("api/game/" + id, "GET").then(function(game) {
            callback(game);
        });
    }

    function getPlayers(gameId, callback) {
        SPA.data.doCall("api/player/" + gameId, "GET").then(function(players) {
            callback(players);
        });
    }

    function createGame() {
        let gameBoard = [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, Disc.black, Disc.white, null, null, null],
            [null, null, null, Disc.white, Disc.black, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];

        let data = JSON.stringify({
            "gameBoard": JSON.stringify(gameBoard)
        });

        return SPA.data.doCall("api/game/", "POST", data);
    }

    function createPlayer(gameId, username, password, hasTurn, discColor) {
        let data = JSON.stringify({
            "gameId": gameId,
            "username": username,
            "password": password,
            "hasTurn": hasTurn,
            "discColor": discColor
        });

        return SPA.data.doCall("api/player", "POST", data);
    }

    function updateGame(id, gameBoard) {
        let data = JSON.stringify({
            "gameBoard" : JSON.stringify(gameBoard)
        });

        return SPA.data.doCall("api/game/" + id, "PUT", data);
    }

    function AddPlayerToGame(gameId, player, opponent) {
        player.discColor = opponent[0].discColor === Disc.white ? Disc.black : Disc.white;

        let data = JSON.stringify({
            "gameId": gameId,
            "username": player.username,
            "hasTurn": !opponent[0].hasTurn,
            "discColor": player.discColor
        });

        return SPA.data.doCall("api/player/" + player.id, "PUT", data);
    }

    function updatePlayerTurn(gameId, players) {
        players.forEach(function (player) {
            let data = JSON.stringify({
                "gameId": gameId,
                "username": player.username,
                "hasTurn": !player.hasTurn,
                "discColor": player.discColor
            });

            SPA.data.doCall("api/player/" + player.id, "PUT", data); // ToDo: Return?
        });
    }

    return {
        validateLogin,
        getGames,
        getGame,
        getPlayers,
        createGame,
        createPlayer,
        updateGame,
        AddPlayerToGame,
        updatePlayerTurn
    }
})();