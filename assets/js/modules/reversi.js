SPA.reversi = (function() {

    function init() {
        $("#spa").empty();
        showLoader();
        searchGame();
    }

    function showLoader() {
        $("#spa").append('<div class="loader-container"><h2>Searching game</h2><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div');
    }

    function searchGame() {

        console.log("Searching game...");

        //Bestaat er al een spel (gameId)?
        //Zo ja, laad dat spel in
        //Zo nee, kijk of er andere spelers zijn die nog geen tegenstander hebben
        // Zo nee, maak een nieuw spel
        // Zo ja, vraag de gevonden speler of deze speler het spel mag joinen
        //Zo ja, voeg de speler toe aan het gevonden spel
        //Zo nee, zoek verder
    }

    return {
        init
    }
})();