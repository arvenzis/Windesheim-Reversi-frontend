var SPA = (function() {
    function init(){
        SPA.data.init('production', 'api/game/');

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
        //SPA.data.updateGame(1, gameBoard);
       SPA.data.getGame(1);

        //SPA.popup.show("Karen", "Is heel aardig", AlertType.success);
    }

    function Model() {

    }

    function Reversi() {

    }

    return {
        init,
    }
})();

