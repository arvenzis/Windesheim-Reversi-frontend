SPA.reversi = (function() {
    let player;
    let loadingText;

    function init() {
        $("#spa").empty();
        let json = sessionStorage.getItem("player");
        player = $.parseJSON(json);
        showLoader();
        searchOpponent();
    }

    function showLoader() {
        $("#spa").append('<div class="loader-container"><h2 class="loading-text">Searching for opponents</h2><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>');
        loadingText = $(".loading-text");
    }

    function searchOpponent() {
        //Heeft deze speler al een spel (gameId)?

        loadExistingGame().catch(function() {
            //Zo nee, kijk of er andere spelers zijn die nog geen tegenstander hebben
            addPlayerToExistingGame().then(function(game) {
                SPA.gameBoard.init(player.gameId, game.gameBoard);
            }).catch(function() {
                // Zo nee, maak een nieuw spel
                loadingText.text("Creating new game");
                SPA.api.createGame();
            });
        });
    }

    function loadExistingGame() {
        return new Promise(function (resolve, reject) {
            if (player.gameId !== null) {
                //Zo ja, laad dat spel in
                SPA.api.getGame(player.gameId, function (result) {
                    if (result) {
                        loadingText.text("Loading game");
                        SPA.gameBoard.init(player.gameId, result[0].gameBoard);
                        resolve();
                    }
                    loadingText.text("The game doesn't seem to exist anymore");
                });
            } else {
                reject();
            }
        });
    }

    function addPlayerToExistingGame() {
        return new Promise(function(resolve, reject) {
            //get all gameIds
            SPA.api.getGames(function(games) {
                games.forEach(function(game) {
                    //for every gameId, check if there is only one player who has the GameId
                    SPA.api.getPlayers(game.id, function(opponent) {
                        if (Object.keys(opponent).length === 1) {
                            loadingText.text("Loading game");
                            //Todo: Zo ja, vraag de gevonden speler of deze speler het spel mag joinen
                            //Zo ja, voeg de speler toe aan het gevonden spel
                            SPA.api.AddPlayerToGame(game.id, player, opponent);
                            //storage updaten
                            player.gameId = game.id;
                            sessionStorage.setItem("player", JSON.stringify(player));
                            resolve(game);
                            //Todo: Zo nee, voer dezelfde actie uit tot er een game is waarbij de speler mag joinen OF tot er geen spelers meer zijn die geen spel hebben
                        }
                    });
                });
                reject();
            });
        });
    }

    return {
        init
    }
})();