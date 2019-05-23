SPA.gameBoard = (function() {
    let GameId;
    let GameBoard;
    let Players;
    let Player;
    let Opponent;
    let GridContainer = '#grid-container';

    window.setInterval(function(){
        prepareGameBoard();
    }, 1000);

    function init(id) {
        GameId = id;
        Player = SPA.sessionStorage.getPlayer();
        Opponent = getOpponentDisc();

        SPA.popup.show("Hi " + Player.username + "!", "The game has been loaded. You are " + Player.discColor + "!", AlertType.success);
        $(".chart-container").css("display", "block");

        prepareGameBoard().then(function() {
            SPA.chart.init($('.black-disc').length, $('.white-disc').length);
        });
    }

    function prepareGameBoard() {
        return new Promise(function(resolve) {
            SPA.api.getGame(GameId, function(game) {
                GameBoard = JSON.parse(game[0].gameBoard);

                Player = SPA.sessionStorage.getPlayer();

                SPA.api.getPlayers(GameId, function(players) {
                    Players = players;
                    players.forEach(function(player) {
                        if (player.id === SPA.sessionStorage.getPlayer().id)
                        {
                            SPA.sessionStorage.setPlayer(player);
                        }
                    });
                });
                $("#spa").empty().append("<div id='grid-container'></div>");

                showHasTurn();
                drawGameBoard();

                resolve();
            });
        });
    }

    function drawGameBoard(rows = 8, columns = 8) {
        $(GridContainer).empty(); // make sure the grid-container is redrawn
        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                let tile = document.createElement('div');

                tile.setAttribute('class', 'tile');
                tile.setAttribute('data-row', row.toString());
                tile.setAttribute('data-column', column.toString());

                $(tile).appendTo(GridContainer);

                if (GameBoard[row][column] === Disc.white) {
                    $(createDisc(Disc.white)).appendTo(tile);
                }
                else if (GameBoard[row][column] === Disc.black) {
                    $(createDisc(Disc.black)).appendTo(tile);
                }
            }
        }

        if (Player.hasTurn)
        {
            calculatePossibleMoves();
        }
    }

    function getOpponentDisc() {
        if (Player.discColor === Disc.white) {
            return Disc.black;
        }
        else if(Player.discColor === Disc.black) {
            return Disc.white;
        }
    }

    function showHasTurn() {
        if (Player.hasTurn)
        {
            return $('body').append(Reversi.assets.templates.showTurn({color: Player.discColor}));
        }
        return $('body').append(Reversi.assets.templates.showTurn({color: Opponent}));

    }

    function createDisc(color) {
        let className = color + '-disc';

        let disc = document.createElement('div');
        disc.setAttribute('class', className);

        return disc;
    }

    $(document).on('click', GridContainer, function(e) {
        let clickedRow = $(e.target).closest('.available').attr('data-row');
        let clickedColumn = $(e.target).closest('.available').attr('data-column');

        if (clickedRow !== undefined || clickedColumn !== undefined) {
            GameBoard[clickedRow][clickedColumn] = Player.discColor;
            replaceAdjacentOpponents(clickedRow, clickedColumn);

            SPA.api.updatePlayerTurn(GameId, Players);

            SPA.api.updateGame(GameId, GameBoard).then(function() {
                prepareGameBoard().then(function() {
                    SPA.chart.init($('.black-disc').length, $('.white-disc').length);
                    showHasTurn();
                });
            });
        }
    });

    function calculatePossibleMoves(rows = 8, columns = 8) {
        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {

                if (GameBoard[row][column] === Opponent) {
                    if (GameBoard[row][column + 1] === Player.discColor) {
                        checkLeft(row, column);
                    }
                    if (GameBoard[row][column - 1] === Player.discColor) {
                        checkRight(row, column);
                    }
                    if (GameBoard[row + 1][column] === Player.discColor) {
                        checkAbove(row, column);
                    }
                    if (GameBoard[row - 1][column] === Player.discColor) {
                        checkBelow(row, column);
                    }
                    if (GameBoard[row + 1][column + 1] === Player.discColor) {
                        checkLeftAbove(row, column);
                    }
                    if (GameBoard[row + 1][column - 1] === Player.discColor) {
                        checkRightAbove(row, column);
                    }
                    if (GameBoard[row - 1][column + 1] === Player.discColor) {
                        checkLeftBelow(row, column);
                    }
                    if (GameBoard[row - 1][column - 1] === Player.discColor) {
                        checkRightBelow(row, column);
                    }
                }
            }
        }
    }

    function checkLeft(row, column) {
        let iteration = 1;
        for (let i = column; i > -1; i--) {
            if (GameBoard[row][column - iteration] === null) {
                $('div[data-row="' + row + '"]').filter('div[data-column="' + (column - iteration) + '"]').addClass('available');
                return;
            } else if (GameBoard[row][column - iteration] === Player.discColor) {
                return;
            }
            iteration++;
        }
    }

    function checkRight(row, column) {
        let iteration = 1;
        for (let i = column; i < 8; i++) {
            if (GameBoard[row][column + iteration] === null) {
                $('div[data-row="' + row + '"]').filter('div[data-column="' + (column + iteration) + '"]').addClass('available');
                return;
            } else if (GameBoard[row][column + iteration] === Player.discColor) {
                return;
            }
            iteration++;
        }
    }

    function checkAbove(row, column) {
        let iteration = 1;
        for (let i = row; i > -1; i--) {
            if (GameBoard[row - iteration][column] === null) {
                $('div[data-row="' + (row - iteration) + '"]').filter('div[data-column="' + column + '"]').addClass('available');
                return;
            } else if (GameBoard[row - iteration][column] === Player.discColor) {
                return;
            }
            iteration++;
        }
    }

    function checkBelow(row, column) {
        let iteration = 1;
        for (let i = row; i < 8; i++) {
            if (GameBoard[row + iteration][column] === null) {
                $('div[data-row="' + (row  + iteration) + '"]').filter('div[data-column="' + column + '"]').addClass('available');
                return;
            } else if (GameBoard[row + iteration][column] === Player.discColor) {
                return;
            }
            iteration++;
        }
    }

    function checkLeftAbove(row, column) {
        let iteration = 1;
        for (let i = row; i > -1; i--) {
            let field = GameBoard[row - iteration][column - iteration];
            if (field === null) {
                $('div[data-row="' + (row - iteration) + '"]').filter('div[data-column="' + (column - iteration) + '"]').addClass('available');
                return;
            } else if (field === Player.discColor) {
                return;
            }
            iteration++;
        }
    }

    function checkRightAbove(row, column) {
        let iteration = 1;
        for (let i = row; i < 8; i--) {
            let field = GameBoard[row - iteration][column + iteration];
            if (field === null) {
                $('div[data-row="' + (row - iteration) + '"]').filter('div[data-column="' + (column + iteration) + '"]').addClass('available');
                return;
            } else if (field === Player.discColor) {
                return;
            }
            iteration++;
        }
    }

    function checkLeftBelow(row, column) {
        let iteration = 1;
        for (let i = row; i > -1; i--) {
            let field = GameBoard[row + iteration][column - iteration];
            if (field === null) {
                $('div[data-row="' + (row + iteration) + '"]').filter('div[data-column="' + (column - iteration) + '"]').addClass('available');
                return;
            } else if (field === Player.discColor) {
                return;
            }
            iteration++;
        }
    }

    function checkRightBelow(row, column) {
        let iteration = 1;
        for (let i = row; i < 8; i--) {
            let field = GameBoard[row + iteration][column + iteration];
            if (field === null) {
                $('div[data-row="' + (row + iteration) + '"]').filter('div[data-column="' + (column + iteration) + '"]').addClass('available');
                return;
            } else if (field === Player.discColor) {
                return;
            }
            iteration++;
        }
    }

    function replaceOpponentRight(row, column) {
        let iteration = 1;

        for (let i = column; i < 8; i++) {
            if ((GameBoard[row][column + iteration] === Opponent) && (GameBoard[row][column + iteration + 1] === Opponent || GameBoard[row][column + iteration + 1] === Player.discColor)) {
                GameBoard[row][column + iteration] = Player.discColor;
            }
            iteration++;
        }
    }

    function replaceOpponentLeft(row, column) {
        let iteration = 1;

        for (let i = column; i > -1; i--) {
            if ((GameBoard[row][column - iteration] === Opponent) && (GameBoard[row][column - iteration - 1] === Opponent || GameBoard[row][column - iteration - 1] === Player.discColor)) {
                GameBoard[row][column - iteration] = Player.discColor;
            }
            iteration++;
        }
    }

    function replaceOpponentAbove(row, column) {
        let iteration = 1;

        for (let i = (row - 1); i > -1; i--) {
            if ((GameBoard[row - iteration][column] === Opponent) && (GameBoard[row - iteration - 1][column] === Opponent || GameBoard[row - iteration - 1][column] === Player.discColor)) {
                GameBoard[row - iteration][column] = Player.discColor;
            }
            iteration++;
        }
    }

    function replaceOpponentBelow(row, column) {
        let iteration = 1;

        for (let i = (row + 1); i < 8; i++) {
            if ((GameBoard[row + iteration][column] === Opponent) && (GameBoard[row + iteration + 1][column] === Opponent || GameBoard[row + iteration + 1][column] === Player.discColor)) {
                GameBoard[row + iteration][column] = Player.discColor;
            }
            iteration++;
        }
    }

    function replaceOpponentRightAbove(row, column) {
        let iteration = 1;

        for (let i = (row - 1); i > -1; i--) {
            if ((GameBoard[row - iteration][column + iteration] === Opponent) && (GameBoard[row - iteration - 1][column + iteration + 1] === Opponent || GameBoard[row - iteration - 1][column + iteration + 1] === Player.discColor)) {
                GameBoard[row - iteration][column + iteration] = Player.discColor;
            }
            iteration++;
        }
    }

    function replaceOpponentLeftAbove(row, column) {
        let iteration = 1;

        for (let i = (row - 1); i > -1; i--) {
            if ((GameBoard[row - iteration][column - iteration] === Opponent) && (GameBoard[row - iteration - 1][column - iteration - 1] === Opponent || GameBoard[row - iteration - 1][column - iteration - 1] === Player.discColor)) {
                GameBoard[row - iteration][column - iteration] = Player.discColor;
            }
            iteration++;
        }
    }

    function replaceOpponentRightBelow(row, column) {
        let iteration = 1;

        for (let i = (row + 1); i < 8; i++) {
            if ((GameBoard[row + iteration][column + iteration] === Opponent) && (GameBoard[row + iteration + 1][column + iteration + 1] === Opponent || GameBoard[row + iteration + 1][column + iteration + 1] === Player.discColor)) {
                GameBoard[row + iteration][column + iteration] = Player.discColor;
            }
            iteration++;
        }
    }

    function replaceOpponentLeftBelow(row, column) {
        let iteration = 1;

        for (let i = (row + 1); i < 8; i++) {
            if ((GameBoard[row + iteration][column - iteration] === Opponent) && (GameBoard[row + iteration + 1][column - iteration - 1] === Opponent || GameBoard[row + iteration + 1][column - iteration - 1] === Player.discColor)) {
                GameBoard[row + iteration][column - iteration] = Player.discColor;
            }
            iteration++;
        }
    }

    function replaceAdjacentOpponents(row, column) {
        replaceOpponentRight(parseInt(row), parseInt(column));
        replaceOpponentLeft(parseInt(row), parseInt(column));
        replaceOpponentAbove(parseInt(row), parseInt(column));
        replaceOpponentBelow(parseInt(row), parseInt(column));

        replaceOpponentRightAbove(parseInt(row), parseInt(column));
        replaceOpponentLeftAbove(parseInt(row), parseInt(column));
        replaceOpponentRightBelow(parseInt(row), parseInt(column));
        replaceOpponentLeftBelow(parseInt(row), parseInt(column));
    }

    return {
        init
    }
}) ();