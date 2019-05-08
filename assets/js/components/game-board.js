SPA.gameBoard = (function() {
    let gameId;
    let _gameBoard = [];
    let _players;
    let hasTurn;
    let gridContainer = '#grid-container';

    function init(id, gameBoard) {
        gameId = id;
        _gameBoard = gameBoard;
        drawGameBoard();
    }

    function storePlayersLocally(players) {
        return new Promise(function(resolve) {
            _players = players;
            resolve(_players);
        });
    }

    function getTurn() {
        console.log("get die turn G");
        return new Promise(function(resolve) {
            _players.forEach(function (player) {
                if (player.hasTurn === true) {
                    hasTurn = player.discColor;
                    resolve();
                }
            });
        });
    }

    let rows = 8;
    let columns = 8;

    function drawGameBoard() {
        console.log("Draw gameboard. This player has to make a move: " + hasTurn);
        $(gridContainer).empty(); // make sure the grid-container is redrawn
        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                let tile = document.createElement('div');

                tile.setAttribute('class', 'tile');
                tile.setAttribute('data-row', row.toString());
                tile.setAttribute('data-column', column.toString());

                $(tile).appendTo('#grid-container');

                if (_gameBoard[row][column] === Disc.white) {
                    $(createDisc(Disc.white)).appendTo(tile);
                }
                else if (_gameBoard[row][column] === Disc.black) {
                    $(createDisc(Disc.black)).appendTo(tile);
                }
            }
        }
        calculatePossibleMoves();
    }

    function createDisc(color) {
        let className = color + '-disc';

        let disc = document.createElement('div');
        disc.setAttribute('class', className);

        return disc;
    }

    function calculatePossibleMoves() {
        let opponent = getOpponentDisc();
        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {

                if (_gameBoard[row][column] === opponent) {
                    if (_gameBoard[row][column + 1] === hasTurn) {
                        checkLeft(row, column);
                    }
                    if (_gameBoard[row][column - 1] === hasTurn) {
                        checkRight(row, column);
                    }
                    if (_gameBoard[row + 1][column] === hasTurn) {
                        checkAbove(row, column);
                    }
                    if (_gameBoard[row - 1][column] === hasTurn) {
                        checkBelow(row, column);
                    }
                    if (_gameBoard[row + 1][column + 1] === hasTurn) {
                        checkLeftAbove(row, column);
                    }
                    if (_gameBoard[row + 1][column - 1] === hasTurn) {
                        checkRightAbove(row, column);
                    }
                    if (_gameBoard[row - 1][column + 1] === hasTurn) {
                        checkLeftBelow(row, column);
                    }
                    if (_gameBoard[row - 1][column - 1] === hasTurn) {
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
            if (_gameBoard[row][column - iteration] === null) {
                $('div[data-row="' + row + '"]').filter('div[data-column="' + (column - iteration) + '"]').addClass('available');
                return;
            } else if (_gameBoard[row][column - iteration] === hasTurn) {
                return;
            }
            iteration++;
        }
    }

    function checkRight(row, column) {
        let iteration = 1;
        for (let i = column; i < 8; i++) {
            if (_gameBoard[row][column + iteration] === null) {
                $('div[data-row="' + row + '"]').filter('div[data-column="' + (column + iteration) + '"]').addClass('available');
                return;
            } else if (_gameBoard[row][column + iteration] === hasTurn) {
                return;
            }
            iteration++;
        }
    }

    function checkAbove(row, column) {
        let iteration = 1;
        for (let i = row; i > -1; i--) {
            if (_gameBoard[row - iteration][column] === null) {
                $('div[data-row="' + (row - iteration) + '"]').filter('div[data-column="' + column + '"]').addClass('available');
                return;
            } else if (_gameBoard[row - iteration][column] === hasTurn) {
                return;
            }
            iteration++;
        }
    }

    function checkBelow(row, column) {
        let iteration = 1;
        for (let i = row; i < 8; i++) {
            if (_gameBoard[row + iteration][column] === null) {
                $('div[data-row="' + (row  + iteration) + '"]').filter('div[data-column="' + column + '"]').addClass('available');
                return;
            } else if (_gameBoard[row + iteration][column] === hasTurn) {
                return;
            }
            iteration++;
        }
    }

    function checkLeftAbove(row, column) {
        let iteration = 1;
        for (let i = row; i > -1; i--) {
            let field = _gameBoard[row - iteration][column - iteration];
            if (field === null) {
                $('div[data-row="' + (row - iteration) + '"]').filter('div[data-column="' + (column - iteration) + '"]').addClass('available');
                return;
            } else if (field === hasTurn) {
                return;
            }
            iteration++;
        }
    }

    function checkRightAbove(row, column) {
        let iteration = 1;
        for (let i = row; i < 8; i--) {
            let field = _gameBoard[row - iteration][column + iteration];
            if (field === null) {
                $('div[data-row="' + (row - iteration) + '"]').filter('div[data-column="' + (column + iteration) + '"]').addClass('available');
                return;
            } else if (field === hasTurn) {
                return;
            }
            iteration++;
        }
    }

    function checkLeftBelow(row, column) {
        let iteration = 1;
        for (let i = row; i > -1; i--) {
            let field = _gameBoard[row + iteration][column - iteration];
            if (field === null) {
                $('div[data-row="' + (row + iteration) + '"]').filter('div[data-column="' + (column - iteration) + '"]').addClass('available');
                return;
            } else if (field === hasTurn) {
                return;
            }
            iteration++;
        }
    }

    function checkRightBelow(row, column) {
        let iteration = 1;
        for (let i = row; i < 8; i--) {
            let field = _gameBoard[row + iteration][column + iteration];
            if (field === null) {
                $('div[data-row="' + (row + iteration) + '"]').filter('div[data-column="' + (column + iteration) + '"]').addClass('available');
                return;
            } else if (field === hasTurn) {
                return;
            }
            iteration++;
        }
    }

    $(gridContainer).click(function(e) {
            let clickedRow = $(e.target).closest('.available').attr('data-row');
            let clickedColumn = $(e.target).closest('.available').attr('data-column');

            if (clickedRow !== undefined || clickedColumn !== undefined) {
                _gameBoard[clickedRow][clickedColumn] = hasTurn;
                let opponent = getOpponentDisc();
                replaceOpponentRight(parseInt(clickedRow), parseInt(clickedColumn), opponent);
                replaceOpponentLeft(parseInt(clickedRow), parseInt(clickedColumn), opponent);
                replaceOpponentAbove(parseInt(clickedRow), parseInt(clickedColumn), opponent);
                replaceOpponentBelow(parseInt(clickedRow), parseInt(clickedColumn), opponent);

                SPA.api.updatePlayerTurn(gameId, _players);

                SPA.api.getPlayers(gameId).then(function(players) {
                    SPA.gameBoard.storePlayersLocally(players);
                    SPA.api.updateGame(gameId, _gameBoard);
                    SPA.gameBoard.getTurn();
                });
                SPA.api.getGame(gameId).then(function(result) {
                    SPA.gameBoard.init(result.id, JSON.parse(result.gameBoard));
                });
            }
    });

    function replaceOpponentRight(row, column, opponent) {
        let iteration = 1;

        for (let i = column; i < 8; i++) {
            if (_gameBoard[row][column + iteration] === opponent) {
                _gameBoard[row][column + iteration] = hasTurn;
                return;
            }
            else if(_gameBoard[row][column + iteration] === hasTurn || _gameBoard[row][column + iteration] === null) {
                return;
            }
            iteration++;
        }
    }

    function replaceOpponentLeft(row, column, opponent) {
        let iteration = 1;

        for (let i = column; i > -1; i--) {
            if (_gameBoard[row][column - iteration] === opponent) {
                _gameBoard[row][column - iteration] = hasTurn;
                return;
            }
            else if(_gameBoard[row][column - iteration] === hasTurn || _gameBoard[row][column - iteration] === null) {
                return;
            }
            iteration++;
        }
    }

    function replaceOpponentAbove(row, column, opponent) {
        let iteration = 1;

        for (let i = column; i > -1; i--) {
            if (_gameBoard[row - iteration][column] === opponent) {
                _gameBoard[row - iteration][column] = hasTurn;
                return;
            }
            else if(_gameBoard[row - iteration][column] === hasTurn || _gameBoard[row - iteration][column] === null) {
                return;
            }
            iteration++;
        }
    }

    function replaceOpponentBelow(row, column, opponent) {
        let iteration = 1;

        for (let i = column; i < 8; i++) {
            if (_gameBoard[row + iteration][column] === opponent) {
                _gameBoard[row + iteration][column] = hasTurn;
                return;
            }
            else if(_gameBoard[row + iteration][column] === hasTurn || _gameBoard[row + iteration][column] === null) {
                return;
            }
            iteration++;
        }
    }

    function getOpponentDisc() {
        if (hasTurn === Disc.white) {
            return Disc.black;
        }
        else if(hasTurn === Disc.black) {
            return Disc.white;
        }
    }

    return {
        init,
        storePlayersLocally,
        getTurn
    }
}) ();