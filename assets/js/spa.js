var SPA = (function() {
    function init() {
        SPA.data.init('production');
        $("body").append("<section id='spa'></section>");
        SPA.login.init();


        //
        // $("#spa").append("<div id='grid-container'></div>");


        // SPA.api.createGame();
        // SPA.api.createGame();
        // SPA.api.createGame();
        // SPA.api.createPlayer(1, "Jantje", "Jan", false, Disc.black);
        // SPA.api.createPlayer(1, "Pietje", "Piet", true, Disc.white);z
        // SPA.api.createPlayer(2, "Floor", "Snoos", false, Disc.black);
        // SPA.api.createPlayer(null, "Karen", "Snaas", false, Disc.black);

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
             SPA.api.updateGame(2, gameBoard);

        //SPA.popup.show("Karen", "Is heel aardig", AlertType.success);
    }

    return {
        init,
    }
})();

