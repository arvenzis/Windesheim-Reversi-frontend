var SPA = (function() {
    function init(){
        //SPA.data.init('development', 'api/getGames');
        $("body").append("<section id='spa'></section>");
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

