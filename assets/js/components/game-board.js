SPA.gameBoard = (function() {
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

        calculatePossibleMoves();
    }

    let fields = [];

    function getDiscLocations(color) {
        let discLocations = [];

        for (let i = 1; i < fields.length; i++) {
            if (fields[i] === color) {
                discLocations.push(i + 1); // because arrays start at 0 ;-)
            }
        }

        return discLocations;
    }

    function calculatePossibleMoves(color = Disc.black) {
        fields = [null, null, null, null, null, null, null, null,
                      null, null, null, null, null, null, null, null,
                      null, null, null, null, null, null, null, null,
                      null, null, null, Disc.white, Disc.black, null, null, null,
                      null, null, null, Disc.black, Disc.white, null, null, null,
                      null, null, null, null, null, null, null, null,
                      null, null, null, null, null, null, null, null,
                      null, null, null, null, null, null, null, null]; // Krijg ik straks van de server

        let blackDiscLocations = getDiscLocations(Disc.black); //me
        let whiteDiscLocations = getDiscLocations(Disc.white); //opponent

        whiteDiscLocations.forEach(function(location) {
            console.log("white: " + location);

        });

        let operators = {
            '+': function(first, second) { return first + second },
            '-': function(first, second) { return first - second },
        };

        let op = ['+', '-'];

        blackDiscLocations.forEach(function(location) {
            for (let i = 1; i < fields.length; i++) {
                for (let x = 0; x < op.length; x++) {
                    let whiteDiscLocation = operators[op[x]](location, i);
                    if ($.inArray(whiteDiscLocation, whiteDiscLocations) !== -1)
                    {
                        let availableField = operators[op[x]](whiteDiscLocation, i); //Misschien checken: is er links van de witte steen NOG een witte steen?
                        availableField = availableField.toString();
                        $('#' + availableField).addClass('available');
                    }
                }
            }
        });

        //Als ik het vak aanklik, ligt de zwarte steen (tegenstander) dan tussen twee van mijn eigen stenen?

    }

    $("#grid-container").click(function(e) {
        $(e.target).closest('.grid-item').addClass('clicked');
    });

    return {
        init,
    }
}) ();