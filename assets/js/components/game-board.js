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

        initGameShizzles();
    }

    function initGameShizzles() { //Geef goede naam en/of zet dit ergens anders neer
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

        for (let i = 1; i < fields.length; i++) {
            $(className).each(function(i, obj) {
                discLocations.push(parseInt($(obj).parent().attr('id')));
            });
        }

        return discLocations;
    }

    function calculatePossibleMoves(discLocations, location) {
        let operators = {
            '+': function(first, second) { return first + second },
            '-': function(first, second) { return first - second },
        };

        let op = ['+', '-'];

        for (let i = 1; i < fields.length; i++) {
            for (let x = 0; x < op.length; x++) {
                let opponentDiscLocation = operators[op[x]](location, i);
                if ($.inArray(opponentDiscLocation, discLocations) !== -1)
                {
                    let availableField = operators[op[x]](opponentDiscLocation, i).toString(); //Misschien checken: is er links van de witte steen NOG een witte steen?
                    $('#' + availableField).addClass('available');
                }
            }
        }
    }

    $("#grid-container").click(function(e) {
        let clickedFieldNr = $(e.target).closest('.available').attr('id').toString();
        $('#' + clickedFieldNr).removeClass('available');

        changeTurn(hasTurn);

        initGameShizzles();
    });

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