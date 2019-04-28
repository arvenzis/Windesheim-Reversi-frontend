SPA.gameBoard = (function() {
    let hasTurn;

    function init() {
        for(let i = 1; i < 65; i++) {
            let gridItem = document.createElement('div');
            gridItem.setAttribute('class', 'grid-item');
            gridItem.setAttribute('id', i.toString());

            document.getElementById('grid-container').appendChild(gridItem);

            if (i === 28 || i === 37) {
                let whiteDisc = document.createElement('div');
                whiteDisc.setAttribute('class', 'white-disc');
                $(whiteDisc).appendTo(gridItem);
            }
            else if (i === 29 || i === 36) {
                let blackDisc = document.createElement('div');
                blackDisc.setAttribute('class', 'black-disc');
                $(blackDisc).appendTo(gridItem);
            }
        }

        hasTurn = Disc.black;

        fields = [null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, Disc.white, Disc.black, null, null, null,
            null, null, null, Disc.black, Disc.white, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null]; // Krijg ik straks van de server

        updateGameBoard();
    }

    function updateGameBoard() {
        let blackDiscLocations = getDiscLocations(Disc.black);
        let whiteDiscLocations = getDiscLocations(Disc.white);

        if (hasTurn === Disc.white) {
            whiteDiscLocations.forEach(function(whiteDiscLocation) {
                calculatePossibleMoves(blackDiscLocations, whiteDiscLocation);
            });
        }
        else if (hasTurn === Disc.black) {
            blackDiscLocations.forEach(function(blackDiscLocation) {
                calculatePossibleMoves(whiteDiscLocations, blackDiscLocation);
            });
        }
    }

    let fields = [];

    function getDiscLocations(color) {
        let discLocations = [];
        let className = '.' + color + '-disc';

        $(className).each(function(i, obj) {
            discLocations.push(parseInt($(obj).parent().attr('id')));
        });

        return discLocations;
    }

    function calculatePossibleMoves(opponentDiscLocations, myDiscLocation) {
        let operators = {
            '+': function(first, second) { return first + second },
            '-': function(first, second) { return first - second },
        };

        let op = ['+', '-'];

        for (let i = 1; i < fields.length; i++) {
            for (let x = 0; x < op.length; x++) {
                let opponentDiscLocation = operators[op[x]](myDiscLocation, i);
                if ($.inArray(opponentDiscLocation, opponentDiscLocations) !== -1)
                {
                    let availableField = operators[op[x]](opponentDiscLocation, i).toString(); //Misschien checken: is er links van de witte steen NOG een witte steen?
                    $('#' + availableField).addClass('available');
                }
            }
        }
    }

    $("#grid-container").click(function(e) {
        let clickedFieldId = $(e.target).closest('.available').attr('id').toString();
        $('#' + clickedFieldId).removeClass('available');

        addNewDisc(clickedFieldId);
        changeTurn(hasTurn);

        updateGameBoard();
    });

    function addNewDisc(clickedFieldId) { // change name maybe?
        let className = hasTurn + '-disc';

        let newDisc = document.createElement('div');
        newDisc.setAttribute('class', className);

        document.getElementById(clickedFieldId).appendChild(newDisc);



        let operators = {
            '+': function(first, second) { return first + second },
            '-': function(first, second) { return first - second },
        };

        let op = ['+', '-'];
        let opponentDiscLocations = getDiscLocations(Disc.white);
        let myDiscLocations = getDiscLocations(Disc.black);

        opponentDiscLocations.forEach(function(opponentDiscLocation, i) {

                for (let x = 0; x < op.length; x++) {

                    if (operators[op[x]](myDiscLocations[i], i) === opponentDiscLocation) {
                        //Misschien checken: is er links van de witte steen NOG een witte steen?
                        let newDisc = document.createElement('div');
                        newDisc.setAttribute('class', className);

                        let newDiscId = operators[op[x]](myDiscLocations[i], i).toString();

                        while (document.getElementById(newDiscId).hasChildNodes()) {
                            document.getElementById(newDiscId).removeChild(document.getElementById(newDiscId).lastChild);
                        }

                        document.getElementById(newDiscId).appendChild(newDisc);
                    }
                }

        });
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