function reset() {
    $('#board button').css('background-color', 'rgb(235, 235, 235)');
    $('#winner').hide();
    isPlayer1Turn = false;
    changeTurn();
    enableDiscs();
    $('#turn-player-name').show();

}

function changeTurn() {
    if (!isPlayer1Turn) {
        $('#turn-player-name').text(player1.name);
        $('#turn-player-name').css('color', player1.color);
    } else {
        $('#turn-player-name').text(player2.name);
        $('#turn-player-name').css('color', player2.color);
    }
    isPlayer1Turn = !isPlayer1Turn;
}

function showWinner(winnerPlayer) {
    $('#winner-name').text(winnerPlayer.name)
    $('#winner-name').css('color', winnerPlayer.color)
    $('#winner').show();
}

function changeColor(row, col, color) {
    var table = document.getElementById('board-table');
    table.rows[row].cells[col].querySelector('button').style.backgroundColor = color;
}

function getColor(row, col) {
    var table = document.getElementById('board-table');
    var color = table.rows[row].cells[col].querySelector('button').style.backgroundColor;
    return color;
}

function getButtomDiscRow(col) {
    for (var i = 0; i < 6; ++i) {
        if (getColor(5 - i, col) === 'rgb(235, 235, 235)') {
            return 5 - i;
        }
    }
}

function are4ColorsMatching(one, two, three, four) {
    return (one !== 'rgb(235, 235, 235)' && one === two && two === three && three === four && one !== undefined);
}

function checkHorizantalColors() {
    for (var i = 0; i < 6; ++i) {
        for (var j = 0; j < 7; ++j) {
            if (j + 3 < 7) {
                if (are4ColorsMatching(getColor(i, j), getColor(i, j + 1), getColor(i, j + 2), getColor(i, j + 3))) {
                    return true;
                }
            }
        }
    }
    return false;
}

function checkVerticaColors() {
    for (var i = 0; i < 6; ++i) {
        for (var j = 0; j < 7; ++j) {
            if (i + 3 < 6) {
                if (are4ColorsMatching(getColor(i, j), getColor(i + 1, j), getColor(i + 2, j), getColor(i + 3, j))) {
                    return true;
                }
            }
        }
    }
    return false;
}

function checkDiagonalColors() {
    for (var i = 0; i < 6; ++i) {
        for (var j = 0; j < 7; ++j) {
            if (i + 3 < 6 && j + 3 < 7) {
                if (are4ColorsMatching(getColor(i, j), getColor(i + 1, j + 1), getColor(i + 2, j + 2), getColor(i + 3, j + 3))) {
                    return true;
                }               
            }
            if (i - 3 >= 0 && j + 3 < 7) {
                if (are4ColorsMatching(getColor(i, j), getColor(i - 1, j + 1), getColor(i - 2, j + 2), getColor(i - 3, j + 3))) {
                    return true;
                }
            }
            
        }
    }
    return false;
}

function isThereAWinner() {
    return (checkHorizantalColors() || checkVerticaColors() || checkDiagonalColors());
}

function disableDiscs() {
    $('#board button').prop('disabled', true);
}

function enableDiscs() {
    $('#board button').prop('disabled', false);
}

$('#start-btn').on('click', function() {
    var p1 = $('#player1');
    var p2 = $('#player2');
    if (p1.val().length > 0) {
        player1.name = p1.val();
        player1.color = $('#color-selector1>option:selected').text();
    }
    if (p2.val().length > 0) {
        player2.name = p2.val();
        player2.color = $('#color-selector2>option:selected').text();
    }
    reset();
    $('#startup-form').hide();
    $('#winner').hide();
    $('#game-sect').show();    
});

$('#new-game-btn').on('click', function() {
    $('#game-sect').hide();
    $('#startup-form').show();
    reset()
});

$('#restart-btn').on('click', function() {
    reset();
});

$('#board-table button').on('click', function() {
    var col = $(this).closest('td').index();
    var row = getButtomDiscRow(col);
    var color = null;
    if (isPlayer1Turn) {
        color = player1.color;
    } else {
        color = player2.color;
    }
    changeColor(row, col, color);
    if (isThereAWinner()) {
        if (isPlayer1Turn) {
            showWinner(player1);
        } else {
            showWinner(player2);
        }
        disableDiscs();
    } else {
        changeTurn();
    }
});

var player1 = {
    "name": "",
    "color": ""
}
var player2 = {
    "name": "",
    "color": ""
}
