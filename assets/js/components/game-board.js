SPA.gameBoard = (function() {
    let fields = [];
    let hasTurn;

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

        drawGameBoard();

        hasTurn = Disc.black;
    }

    function drawGameBoard() {
        for (let row = 0; row < fields.length; row++) {
            for (let column = 0; column < fields.length; column++) {
                let tile = document.createElement('div');

                tile.setAttribute('class', 'tile');
                tile.setAttribute('data-row', row.toString());
                tile.setAttribute('data-column', column.toString());

                $(tile).appendTo('#grid-container');

                if (fields[row][column] === 'white') {
                    $(createDisc('white')).appendTo(tile);
                }
                else if (fields[row][column] === 'black') {
                    $(createDisc('black')).appendTo(tile);
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

    function getDiscLocations(color) {
        let discLocations = [];
        let className = '.' + color + '-disc';

        $(className).each(function(i, obj) {
            discLocations.push(parseInt($(obj).parent().attr('id')));
            discLocations.push(parseInt($(obj).parent().attr('data-id')));
        });

        return discLocations;
    }

    function calculatePossibleMoves(opponentDiscLocations, myDiscLocation) {
        // let operators = {
        //     '+': function(first, second) { return first + second },
        //     '-': function(first, second) { return first - second },
        // };
        //
        // let op = ['+', '-'];


        // for (let i = 1; i < fields.length; i++) {
        //     for (let x = 0; x < op.length; x++) {
        //         let opponentDiscLocation = operators[op[x]](myDiscLocation, i);
        //         if ($.inArray(opponentDiscLocation, opponentDiscLocations) !== -1)
        //         {
        //             let availableField = operators[op[x]](opponentDiscLocation, i).toString(); //Misschien checken: is er links van de witte steen NOG een witte steen?
        //             $('.tile[data-id="'+availableField+'"]').addClass('available');
        //         }
        //     }
        // }
    }

    function canPutDiscOnTile() {


        for (let i = 0; i < grid2D.length; i++) {
            for (let x = 0; x < grid2D[i].length; x++) {
                console.log(grid2D[i][x]);
            }
        }
    }

    $("#grid-container").click(function(e) {
        let clickedFieldId = $(e.target).closest('.available').attr('data-id').toString();
        $('.tile[data-id="'+clickedFieldId+'"]').removeClass('available');

        addNewDisc(clickedFieldId);
        changeTurn(hasTurn);

        updateGameBoard();
    });

    function addNewDisc(clickedFieldId) { // change name maybe?
        let newDisc = createDisc(hasTurn);

        $('.tile[data-id="'+clickedFieldId+'"]').append(newDisc);
        // -9 is altijd schuin boven het item
        // +9 is altijd schuin onder het item
        // -1 is ernaast, -1 + -1 is twee ernaast. Snap je me nog? Ja
    }

    function replaceOpponentDisc(selector, opponentDiscClass) {
        selector.find(opponentDiscClass).remove();
        let newDisc = createDisc(hasTurn);
        selector.append(newDisc);
    }

    function opponentDisc() {
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