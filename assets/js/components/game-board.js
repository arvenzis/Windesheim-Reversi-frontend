SPA.gameBoard = (function() {
    function init() {
        for(let $i = 1; $i < 65; $i++) {
            let gridItem = document.createElement('div');
            gridItem.setAttribute('class', 'grid-item');
            document.getElementById('grid-container').appendChild(gridItem);

            if ($i === 28 || $i === 37) {
                let whiteDisc = document.createElement('div');
                whiteDisc.setAttribute('class', 'white-disc');
                $(whiteDisc).appendTo(gridItem);
            }
            else if ($i === 29 || $i === 36) {
                let blackDisc = document.createElement('div');
                blackDisc.setAttribute('class', 'black-disc');
                $(blackDisc).appendTo(gridItem);
            }
        }
    }

    return {
        init,
    }
}) ();