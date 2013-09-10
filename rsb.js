$(document).ready(function() {

    $('#action, #score, #moves, #reset, #winScore, #result, .alert').hide();
    $('.alert > .close').click(function() {
        $(this).parent().hide('fast');
    });
    var pScore = 0;
    var cScore = 0;
    $('#pScore, #cScore').html('0');

    var winScore = null;
    $("#btn1").click(function() {
        winScore = $('#winScoreInput').val();
        if (winScore === undefined || parseInt(winScore) === NaN || winScore === "" || winScore < 1) {
            $('#invalid-alert').append('Your input was not a valid number. Try again.').show('fast');
            return false;
        };
        $('#invalid-alert').hide('fast');
        winScore = parseInt(winScore);
        $('#winScore, #score, #winScore .alert').show();
        $('#winScore span').html(winScore);
        $(this).hide();
        $('#winputCont').hide();
        $('#action').show();
        $('#reset').show();
        return winScore;
    });

    $("#reset").click(function() {
        $('#moves, #score, #action, #winScore, #result').hide();
        $(this).hide();
        $('#moves > ol').html('');
        $('#pScore, #cScore').html('0');
        $('#btn1, #winputCont').show();
        pScore = 0;
        cScore = 0;
        $('#cScore, #pScore').removeClass('winning');
        $('#shake').removeAttr('disabled');
    });

    $("#shake").click(function() {

        var userChoice = "";
        userChoice = $('.btn-group > label.active > input').attr('id');
        if (userChoice === undefined) {
            $('#invalid-alert').append("You didn't pick an option. Try again.").show('fast');
            return false;
        };
        $('#invalid-alert').hide('fast');


        var computerChoice = Math.random();
        if (computerChoice < 0.34) {
            computerChoice = "rock";
        } else if (computerChoice <= 0.67) {
            computerChoice = "paper";
        } else {
            computerChoice = "scissors";
        };

        var compSign = "";

        var winner = function(choice) {
            $('#result h2').html("You win!").parent().removeClass('alert-warning').removeClass('alert-danger').addClass('alert-success');
            compSign = "beats";
            pScore = pScore + 1;
        };

        var loser = function(choice) {
            $('#result h2').html("You lose.").parent().removeClass('alert-warning').addClass('alert-danger').removeClass('alert-success');
            compSign = "loses to";
            cScore = cScore + 1;
        };


        var compare = function(choice1, choice2) {
            if (choice1 === choice2) {
                $('#result h2').html("It's a tie.").parent().addClass('alert-warning').removeClass('alert-danger').removeClass('alert-success');
                compSign = "ties with";
            } else if (choice1 === "rock") {
                if (choice2 === "scissors") {
                    winner(choice1);
                } else {
                    loser(choice2);
                }
            } else if (choice1 === "paper") {
                if (choice2 === "rock") {
                    winner(choice1);
                } else {
                    loser(choice2);
                }
            } else if (choice1 === "scissors") {
                if (choice2 === "rock") {
                    loser(choice2);
                } else {
                    winner(choice1);
                }
            }
        };

        compare(userChoice, computerChoice);

        $('#moves, #result, #result .alert').show('fast');


        $("#moves > ol").append("<li><b>You:</b>" + " " + userChoice + " <i>" + compSign + "</i> <b>Computer:</b> " + computerChoice + ".</li>");
        $("#pScore").html(pScore);
        $("#cScore").html(cScore);

        if (pScore > cScore) {
            $('#pScore').addClass('winning');
            $('#cScore').removeClass('winning');
        } else if (cScore > pScore) {
            $('#cScore').addClass('winning');
            $('#pScore').removeClass('winning');
        } else {
            $('#cScore, #pScore').removeClass('winning');
        };

        var pAgain = "";
        var checkConf = function() {
            if (pAgain === true) {
                $('#reset').click();
            } else {
                $('#shake').attr('disabled', 'disabled');
            };
        };
        if (winScore === pScore) {
            pAgain = confirm("You win the match! Play again?");
            checkConf();
        } else if (winScore === cScore) {
            pAgain = confirm("You lost the match. Sorry. Play again?");
            checkConf();
        };



        $('.btn-group > label').removeClass('active');
    });



});