SPA.gameBoard = (function() {
    function init() {
        for(let i = 1; i < 65; i++) {
            let gridItem = document.createElement('div');
            gridItem.setAttribute('class', 'grid-item');
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
                discLocations.push(i);
            }
        }

        return discLocations;
    }

    function calculatePossibleMoves() {
        fields = [null, null, null, null, null, null, null, null,
                      null, null, null, null, null, null, null, null,
                      null, null, null, null, null, null, null, null,
                      null, null, null, Disc.white, Disc.black, null, null, null,
                      null, null, null, Disc.black, Disc.white, null, null, null,
                      null, null, null, null, null, null, null, null,
                      null, null, null, null, null, null, null, null,
                      null, null, null, null, null, null, null, null]; // Krijg ik straks van de server

        let blackDiscLocations = getDiscLocations(Disc.black);
        let whiteDiscLocations = getDiscLocations(Disc.white);


    }

    $("#grid-container").click(function(e) {
        $(e.target).closest('.grid-item').addClass('clicked');
    });

    return {
        init,
    }
}) ();