SPA.reversi = (function() {

    function init() {
        $("#spa").empty();
        showLoader();
        searchOpponent();
    }

    function showLoader() {
        //Ideetje:
        //Loading game, searching for opponents
        $("#spa").append('<div class="loader-container"><h2>Searching for opponents</h2><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>');
    }

    function searchOpponent() {
        let json = sessionStorage.getItem("player");
        let player = $.parseJSON(json);
        console.log("Searching game for player: " + player.username);

        //Heeft deze speler al een spel (gameId)?
        if (player.gameId !== null) {
            //Zo ja, laad dat spel in
            SPA.api.getGame(player.gameId, function(result) {
                if (result) {
                    return SPA.gameBoard.init(player.id, result.gameBoard);
                }

                throw Error("The game doesn't seem to exist anymore");
            });
        }

        //Zo nee, kijk of er andere spelers zijn die nog geen tegenstander hebben

       //get all gameIds
       SPA.api.getGames(function(games) {
           games.forEach(function(game) {
                //for every gameId, check if there is only one player who has the GameId
               SPA.api.getPlayers(game.id, function(players) {
                   if (Object.keys(players).length === 1) {
                       console.log("Deze speler heeft nog geen tegenstandig: " + players.name);
                       return true;
                       // Zo ja, vraag de gevonden speler of deze speler het spel mag joinen
                       //Zo ja, voeg de speler toe aan het gevonden spel
                       //Zo nee, voer dezelfde actie uit tot er een game is waarbij de speler mag joinen OF tot er geen spelers meer zijn die geen spel hebben
                   }
                });
           });

           throw Error("It seems that there aren't any players that don't have an opponent yet");
            // Zo nee, maak een nieuw spel
        });
    }

    return {
        init
    }
})();