var SPA = (function() {
    function init(){
        SPA.data.init('production', 'api/game/1');

        $("body").append("<section id='spa'></section>");
        SPA.data.getGames();
        SPA.Popup.show("Karen", "Is heel aardig", AlertTypeEnum.success);
    }

    function Model() {

    }

    function Reversi() {

    }

    return {
        init,
    }
})();

