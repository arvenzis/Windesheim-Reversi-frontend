SPA.gameBoard = (function() {
    let fields = [];
    let hasTurn;

    function init() {
        fields = [null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, Disc.white, Disc.black, null, null, null,
            null, null, null, Disc.black, Disc.white, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null]; // Krijg ik straks van de server

        drawGameBoard();

        hasTurn = Disc.black;

        updateGameBoard();
    }

    function drawGameBoard() {
        // let row = 1;
        // let field = 1;
        // for(let i = 0; i < fields.length; i++) {
        //     let rowEl;
        //     if (i % 9 === 0) {
        //         rowEl = document.createElement('div');
        //         rowEl.setAttribute('class', 'row-' + row);
        //
        //         document.getElementById('grid-container').appendChild(rowEl);
        //
        //         for(let x = 1; x < 9; x++) {
        //             let gridItem = document.createElement('div');
        //             gridItem.setAttribute('class', 'grid-item');
        //             gridItem.setAttribute('id', field.toString());
        //             $(gridItem).appendTo(rowEl);
        //
        //             field++;
        //         }
        //
        //         row++;
        //     }
        // }

        var rows = 8;
        var cols = 8;
        var size = 64;
        let gridContainer = "#grid-container";

        $(gridContainer).css({
            width: size*rows+'px',
            height: size*cols+'px'
        });

        for(var i = 0; i < rows*cols; i++){
            $(gridContainer).append('<div class="tile" data-id="'+(i+1)+'" style="width: '+size+'px; height: '+size+'px"></div>');
        }

        let whiteDisc = document.createElement('div');
        whiteDisc.setAttribute('class', 'white-disc');

        let blackDisc = document.createElement('div');
        blackDisc.setAttribute('class', 'black-disc');


        $(whiteDisc).appendTo('.tile[data-id="28"], .tile[data-id="37"]');
        $(blackDisc).appendTo('.tile[data-id="29"], .tile[data-id="36"]');
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
                    $('.tile[data-id="'+availableField+'"]').addClass('available');
                }
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
        checkAdjacentPossibilities(clickedFieldId);
        // -9 is altijd schuin boven het item
        // +9 is altijd schuin onder het item
        // -1 is ernaast, -1 + -1 is twee ernaast. Snap je me nog? Ja
    }

    function checkAdjacentPossibilities(id){
        id = parseInt(id);

        let opponentDiscClass = '.' + opponentDisc() + '-disc';

        let bottomSelector = $(`.tile[data-id=${id + 8}]`);
        let topSelector = $(`.tile[data-id=${id - 8}]`);
        let rightSelector = $(`.tile[data-id=${id + 1}]`);
        let leftSelector = $(`.tile[data-id=${id - 1}]`);

        let rightBottomSelector = $(`.tile[data-id=${id + 9}]`);
        let rightTopSelector = $(`.tile[data-id=${id - 7}]`);
        let leftTopSelector = $(`.tile[data-id=${id - 9}]`);
        let leftBottomSelector = $(`.tile[data-id=${id + 7}]`);

        if (bottomSelector.find(opponentDiscClass).length){
            for (let i = 8; i < 64; i++) {
                if ($(`.tile[data-id=${i}]`).find('.' + hasTurn + '-disc').length) {
                    replaceOpponentDisc(bottomSelector, opponentDiscClass);
                    return;
                }
            }

            return;
        }
        else if (topSelector.find(opponentDiscClass).length) {
            for (let i = 8; i > 64; i--) {
                if ($(`.tile[data-id=${i}]`).find('.' + hasTurn + '-disc').length) {
                    replaceOpponentDisc(topSelector, opponentDiscClass);
                    return;
                }
            }
            return;
        }
        else if (rightSelector.find(opponentDiscClass).length) {
            for (let i = 0; i < 9; i++) {
                if ($(`.tile[data-id=${i}]`).find('.' + hasTurn + '-disc').length) {
                    replaceOpponentDisc(rightSelector, opponentDiscClass);
                    return;
                }
            }
            return;
        }
        else if (leftSelector.find(opponentDiscClass).length) {
            for (let i = 8; i > 0; i--) {
                if ($(`.tile[data-id=${i}]`).find('.' + hasTurn + '-disc').length) {
                    replaceOpponentDisc(leftSelector, opponentDiscClass);
                    return;
                }
            }
            return;
        }

        else if (rightBottomSelector.find(opponentDiscClass).length){
            for (let i = 9; i < 64; i++) {
                if ($(`.tile[data-id=${i}]`).find('.' + hasTurn + '-disc').length) {
                    replaceOpponentDisc(rightBottomSelector, opponentDiscClass);
                    return;
                }
            }
            return;
        }
        else if (rightTopSelector.find(opponentDiscClass).length) {
            for (let i = 8; i < 64; i++) {
                if ($(`.tile[data-id=${i}]`).find('.' + hasTurn + '-disc').length) {
                    replaceOpponentDisc(rightTopSelector, opponentDiscClass);
                    return;
                }
            }
            return;
        }
        else if (leftTopSelector.find(opponentDiscClass).length) {
            for (let i = 8; i < 64; i++) {
                if ($(`.tile[data-id=${i}]`).find('.' + hasTurn + '-disc').length) {
                    replaceOpponentDisc(leftTopSelector, opponentDiscClass);
                    return;
                }
            }
            return;
        }
        else if (leftBottomSelector.find(opponentDiscClass).length) {
            for (let i = 8; i < 64; i++) {
                if ($(`.tile[data-id=${i}]`).find('.' + hasTurn + '-disc').length) {
                    replaceOpponentDisc(leftBottomSelector, opponentDiscClass);
                    return;
                }
            }
            return;
        }
    }

    function replaceOpponentDisc(selector, opponentDiscClass) {
        selector.find(opponentDiscClass).remove();
        let newDisc = createDisc(hasTurn);
        selector.append(newDisc);
    }

    function createDisc(color) {
        let className = color + '-disc';

        let disc = document.createElement('div');
        disc.setAttribute('class', className);

        return disc;
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