var SPA = (function() {
    function init() {
        SPA.api.init('production', 'api/game/');

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

        $("body").append("<section id='spa'></section>");


        //SPA.data.createGame(gameBoard);
        //SPA.data.createPlayer(1, "Karen", true, Disc.white);
        //SPA.data.createPlayer(1, "Floor", false, Disc.black);
        let gameId = 1;
        SPA.api.getPlayers(gameId).then(function(players) {
             SPA.gameBoard.storePlayersLocally(players);
            SPA.api.updateGame(gameId, gameBoard);
            SPA.gameBoard.getTurn();
        });
        SPA.api.getGame(gameId).then(function(result) {
            SPA.gameBoard.init(result.id, JSON.parse(result.gameBoard));
        });

        //SPA.popup.show("Karen", "Is heel aardig", AlertType.success);
    }

    return {
        init,
    }
})();

