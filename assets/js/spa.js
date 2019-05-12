var SPA = (function() {
    function init() {
        SPA.api.init('production', 'api/game/');
        $("body").append("<section id='spa'></section>");
        SPA.login.init();


        //
        // $("#spa").append("<div id='grid-container'></div>");


        // SPA.api.createGame();
        // SPA.api.createGame();
        // SPA.api.createGame();
        // SPA.api.createPlayer(1, "Jantje", "Jan", false, Disc.black);
        // SPA.api.createPlayer(1, "Pietje", "Piet", true, Disc.white);
        // SPA.api.createPlayer(2, "Floor", "Snoos", false, Disc.black);
        // SPA.api.createPlayer(null, "Karen", "Snaas", false, Disc.black);
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

