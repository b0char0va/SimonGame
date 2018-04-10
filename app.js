var audio1 = document.getElementById('audio1');
var audio2 = document.getElementById('audio2');
var audio3 = document.getElementById('audio3');
var audio4 = document.getElementById('audio4');
var applause = document.getElementById('applause');
var array = [];
var id;
var randomNum;
var blinks = 1;
var guess = 0;
var blinkTimeOut;
var strict = false;
var clicks = 0;

$(document).ready(function () {
    $("#start").click(function () {
        if (clicks === 0) {
            clicks++;
            $(this).text("Stop");
            $("#strict").addClass("disabledButton");
            array = [];
            playGame();
        } else {
            $(this).text("Start");
            $("#count").html("&nbsp;");
            $("#strict").removeClass("disabledButton");
            $("#strict").removeClass("selectStrict");
            strict = false;
            clicks = 0;
            blinks = 1;
            clearTimeout(blinkTimeOut);
        }
    });
    $("#restart").click(function () {
        blinks = 1;
        array = [];
        playGame();
    });
    $("#strict").click(function () {
        if (strict === false) {
            $(this).addClass("selectStrict");
            strict = true;
        } else {
            $(this).removeClass("selectStrict");
            strict = false;
        }
    });
    $(".quarter").click(function () {
        id = $(this).attr("id");
        visual(id);
        check();
        guess++;
    })
});

function playGame() {
    randomNum = (Math.ceil(Math.random() * 4)).toString();
    array.push(randomNum);
    console.log(array);
    $("#count").text(blinks);
    for (var i = 0; i < array.length; i++) {
        blinkLights(i);
    }
    guess = 0;
    setTimeout(function () {
        $("#circle").removeClass("disabled");
    }, 1000 * blinks);
}

function strictPlay() {
    $("#count").text(blinks);
    for (var i = 0; i < array.length; i++) {
        blinkLights(i);
    }
    guess = 0;
    setTimeout(function () {
        $("#circle").removeClass("disabled");
    }, 1000 * blinks);
}

function blinkLights(i) {
    blinkTimeOut = setTimeout(function () {
        visual(array[i]);
    }, i * 1000);
}

function check() {
    if (id !== array[guess]) {
        $("#count").text("!!");
        if (strict === true) {
            blinks = 1;
            array = [];
            setTimeout(function () {
                $("#circle").addClass("disabled");
                playGame();
            }, 2000);
        } else {
            setTimeout(function () {
                $("#circle").addClass("disabled");
                strictPlay();
            }, 2000);
        }
    } else {
        if (guess === blinks - 1 && blinks < 20) {
            console.log(guess + "," + blinks);
            blinks++;
            setTimeout(function () {
                $("#circle").addClass("disabled");
                playGame();
            }, 2000);
        }
        if (guess === blinks - 1 && blinks === 20) {
            applause.play();
            $("#count").html("win");
            blinks = 1;
            array = [];
            setTimeout(function () {
                $("#circle").addClass("disabled");
                playGame();
            }, 8000);
        }
    }
}

function visual(id) {
    if (id === "1") {
        $("#1").css("background-color", "#08ff00");
        audio1.play();
        setTimeout(function () {
            $("#1").css("background-color", "#0e8229");
        }, 700);
    } else if (id === "2") {
        $("#2").css("background-color", "#f90202");
        audio2.play();
        setTimeout(function () {
            $("#2").css("background-color", "#872323");
        }, 700);
    } else if (id === "3") {
        $("#3").css("background-color", "#fff200");
        audio3.play();
        setTimeout(function () {
            $("#3").css("background-color", "#9b9906");
        }, 700);
    } else if (id === "4") {
        $("#4").css("background-color", "#0160f9");
        audio4.play();
        setTimeout(function () {
            $("#4").css("background-color", "#282c6b");
        }, 700);
    }
}