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
        prepareGameBoard();
    }

    function prepareGameBoard() {
        console.log("Uitgevoerd");
        SPA.api.getGame(GameId, function(game) {
            GameBoard = JSON.parse(game[0].gameBoard);

            Player = SPA.sessionStorage.getPlayer();
            if (Player.discColor === Disc.white) {
                Opponent = Disc.black;
            }
            else if(Player.discColor === Disc.black) {
                Opponent = Disc.white;
            }
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
            drawGameBoard();
        });
    }

    let rows = 8;
    let columns = 8;

    function drawGameBoard() {
        console.log("This player has to make a move: " + Player.discColor);
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
            replaceOpponentRight(parseInt(clickedRow), parseInt(clickedColumn));
            replaceOpponentLeft(parseInt(clickedRow), parseInt(clickedColumn));
            replaceOpponentAbove(parseInt(clickedRow), parseInt(clickedColumn));
            replaceOpponentBelow(parseInt(clickedRow), parseInt(clickedColumn));

            SPA.api.updatePlayerTurn(GameId, Players);

            SPA.api.updateGame(GameId, GameBoard).then(function() {
                prepareGameBoard();
            });
        }
    });

    function calculatePossibleMoves() {
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

    /** Kan dit niet beter? **/
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
            if (GameBoard[row][column + iteration] === Opponent) {
                GameBoard[row][column + iteration] = Player.discColor;
                return;
            }
            else if(GameBoard[row][column + iteration] === Player.discColor || GameBoard[row][column + iteration] === null) {
                return;
            }
            iteration++;
        }
    }

    function replaceOpponentLeft(row, column) {
        let iteration = 1;

        for (let i = column; i > -1; i--) {
            if (GameBoard[row][column - iteration] === Opponent) {
                GameBoard[row][column - iteration] = Player.discColor;
                return;
            }
            else if(GameBoard[row][column - iteration] === Player.discColor || GameBoard[row][column - iteration] === null) {
                return;
            }
            iteration++;
        }
    }

    function replaceOpponentAbove(row, column) {
        let iteration = 1;

        for (let i = column; i > -1; i--) {
            if (GameBoard[row - iteration][column] === Opponent) {
                GameBoard[row - iteration][column] = Player.discColor;
                return;
            }
            else if(GameBoard[row - iteration][column] === Player.discColor || GameBoard[row - iteration][column] === null) {
                return;
            }
            iteration++;
        }
    }

    function replaceOpponentBelow(row, column) {
        let iteration = 1;

        for (let i = column; i < 8; i++) {
            if (GameBoard[row + iteration][column] === Opponent) {
                GameBoard[row + iteration][column] = Player.discColor;
                return;
            }
            else if(GameBoard[row + iteration][column] === Player.discColor || GameBoard[row + iteration][column] === null) {
                return;
            }
            iteration++;
        }
    }

    return {
        init
    }
}) ();