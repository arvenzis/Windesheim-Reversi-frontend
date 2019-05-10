var SPA = (function() {
    function init() {
        SPA.api.init('production', 'api/game/');
        $("body").append("<section id='spa'></section>");
        SPA.login.init();

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

        //
        // $("#spa").append("<div id='grid-container'></div>");


        //SPA.api.createGame(gameBoard);
        //SPA.api.createPlayer(1, "Karen", "Snaas", true, Disc.white);
        //SPA.api.createPlayer(1, "Floor", "Snoos", false, Disc.black);
        // let gameId = 1;
        // SPA.api.getPlayers(gameId).then(function(players) {
        //      SPA.gameBoard.storePlayersLocally(players);
        //     SPA.api.updateGame(gameId, gameBoard);
        //     SPA.gameBoard.getTurn();
        // });
        // SPA.api.getGame(gameId).then(function(result) {
        //     SPA.gameBoard.init(result.id, JSON.parse(result.gameBoard));
        // });

        //SPA.popup.show("Karen", "Is heel aardig", AlertType.success);
    }

    return {
        init,
    }
})();

