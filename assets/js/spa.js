var SPA = (function() {
    function init(){
        SPA.data.init('production', 'api/game/1');

        $("body").append("<section id='spa'></section>");
        SPA.data.getGames();
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

