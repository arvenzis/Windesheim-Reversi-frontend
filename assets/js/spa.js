var SPA = (function() {
    function init(){
         SPA.data.init('production', 'api/game/');

        let gameBoard = [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];

        $("body").append("<section id='spa'></section>");
        //SPA.data.getGame(8);
        //SPA.data.createGame(2, gameBoard);
        SPA.data.updateGame(8, 2, gameBoard);
        SPA.data.getGame(8);
        SPA.gameBoard.init();

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

