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
        //SPA.data.getGame(1);
        SPA.data.createPlayer("Karen", true, Disc.white);
        //SPA.data.createGame(1, 2, gameBoard);
        //SPA.data.updateGame(8, 2, gameBoard);
        //SPA.data.getGame(1);

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

