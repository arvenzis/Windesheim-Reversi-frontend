SPA.gameBoard = (function() {
    let fields = [];
    let hasTurn;
    let rows = 8;
    let columns = 8;
    let gridContainer = '#grid-container';

    function init() {
        fields = [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, Disc.white, Disc.black, null, null, null],
            [null, null, null, Disc.black, Disc.white, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];

        hasTurn = Disc.black;

        drawGameBoard();
    }

    function drawGameBoard() {
        $(gridContainer).empty(); // make sure the grid-container is redrawn
        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                let tile = document.createElement('div');

                tile.setAttribute('class', 'tile');
                tile.setAttribute('data-row', row.toString());
                tile.setAttribute('data-column', column.toString());

                $(tile).appendTo('#grid-container');

                if (fields[row][column] === Disc.white) {
                    $(createDisc(Disc.white)).appendTo(tile);
                }
                else if (fields[row][column] === Disc.black) {
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

                if (fields[row][column] === opponent) {
                    if (fields[row][column + 1] === hasTurn) {
                        checkLeft(row, column);
                    }
                    if (fields[row][column - 1] === hasTurn) {
                        checkRight(row, column);
                    }
                    if (fields[row + 1][column] === hasTurn) {
                        checkAbove(row, column);
                    }
                    if (fields[row - 1][column] === hasTurn) {
                        checkBelow(row, column);
                    }

                }
            }
        }
    }

    /** Kan dit niet beter? **/
    function checkLeft(row, column) {
        let iteration = 1;
        for (let i = column; i > -1; i--) {
            if (fields[row][column - iteration] === null) {
                $('div[data-row="' + row + '"]').filter('div[data-column="' + (column - iteration) + '"]').addClass('available');
                return;
            }
            iteration++;
        }
    }

    function checkRight(row, column) {
        let iteration = 1;
        for (let i = column; i < 8; i++) {
            if (fields[row][column + iteration] === null) {
                $('div[data-row="' + row + '"]').filter('div[data-column="' + (column + iteration) + '"]').addClass('available');
                return;
            }
            iteration++;
        }
    }

    function checkAbove(row, column) {
        let iteration = 1;
        for (let i = row; i > -1; i--) {
            if (fields[row - iteration][column] === null) {
                $('div[data-row="' + (row - iteration) + '"]').filter('div[data-column="' + column + '"]').addClass('available');
                return;
            }
            iteration++;
        }
    }

    function checkBelow(row, column) {
        let iteration = 1;
        for (let i = row; i < 8; i++) {
            if (fields[row + iteration][column] === null) {
                $('div[data-row="' + (row  + iteration) + '"]').filter('div[data-column="' + column + '"]').addClass('available');
                return;
            }
            iteration++;
        }
    }

    $(gridContainer).click(function(e) {
            console.log(fields);
            let clickedRow = $(e.target).closest('.available').attr('data-row');
            let clickedColumn = $(e.target).closest('.available').attr('data-column');

            for (let row = 0; row < rows; row++) {
                for (let column = 0; column < columns; column++) {
                    fields[clickedRow][clickedColumn] = hasTurn;
                    // Vervang tegenstandig
                }
            }

            changeTurn(hasTurn);
            drawGameBoard();
    });

    function getOpponentDisc() {
        if (hasTurn === Disc.white) {
            return Disc.black;
        }
        else if(hasTurn === Disc.black) {
            return Disc.white;
        }
    }

    function changeTurn(color) {
        if (color === Disc.white) {
            hasTurn = Disc.black;
        }
        else if (color === Disc.black) {
            hasTurn = Disc.white;
        }
    }

    return {
        init,
    }
}) ();