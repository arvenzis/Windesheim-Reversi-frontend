SPA.gameBoard = (function() {
    let fields = [];
    let hasTurn;
    let rows = 8;
    let columns = 8;

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
        calculatePossibleMoves();
    }

    function drawGameBoard() {
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

    function checkLeft(row, column) {
        let iteration = 1; //can this better?
        for (let i = column; i > -1; i--) { // ga rechts tot 0
            if (fields[row][column - iteration] === null) {
                $('div[data-row="' + row + '"]').filter('div[data-column="' + (column - iteration) + '"]').addClass('available');
                return;
            }
            iteration++;
        }
    }

    function checkRight(row, column) {
        let iteration = 1; //can this better?
        for (let i = column; i < 8; i++) { // ga rechts tot 0
            if (fields[row][column + iteration] === null) {
                $('div[data-row="' + row + '"]').filter('div[data-column="' + (column + iteration) + '"]').addClass('available');
                return;
            }
            iteration++;
        }
    }

    function checkAbove(row, column) {
        let iteration = 1; //can this better?
        for (let i = row; i > -1; i--) { // ga rechts tot 0
            if (fields[row - iteration][column] === null) {
                $('div[data-row="' + (row - iteration) + '"]').filter('div[data-column="' + column + '"]').addClass('available');
                return;
            }
            iteration++;
        }
    }

    function checkBelow(row, column) {
        let iteration = 1; //can this better?
        for (let i = row; i < 8; i++) { // ga rechts tot 0
            if (fields[row + iteration][column] === null) {
                $('div[data-row="' + (row  + iteration) + '"]').filter('div[data-column="' + column + '"]').addClass('available');
                return;
            }
            iteration++;
        }
    }

    $("#grid-container").click(function(e) {
        let clickedFieldId = $(e.target).closest('.available').attr('data-id').toString();
        $('.tile[data-id="'+clickedFieldId+'"]').removeClass('available');

        addNewDisc(clickedFieldId);
        changeTurn(hasTurn);

        drawGameBoard();
    });

    function addNewDisc(clickedFieldId) { // change name maybe?
        let newDisc = createDisc(hasTurn);

        $('.tile[data-id="'+clickedFieldId+'"]').append(newDisc);
    }

    function replaceOpponentDisc(selector, opponentDiscClass) {
        selector.find(opponentDiscClass).remove();
        let newDisc = createDisc(hasTurn);
        selector.append(newDisc);
    }

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