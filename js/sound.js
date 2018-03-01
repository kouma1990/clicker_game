(function (window, $) {
    'use strict';
    $.fn.useSound = function (_event, _id) {
        var se = $(_id);
        this.on(_event, function(){
            se[0].currentTime = 0;
            se[0].play();
        });
        return this;
    };
})(this, this.jQuery);

$('.se-pickel').useSound('mousedown touchstart', '#se-pickel');
$('.se-cash-1').useSound('mousedown touchstart', '#se-cash-1');
$('.se-cash-2').useSound('mousedown touchstart', '#se-cash-2');
$('.se-cash-3').useSound('mousedown touchstart', '#se-cash-3');
$('.se-hajime').useSound('mousedown touchstart', '#se-hajime');
$('.se-drill').useSound('mousedown touchstart', '#se-drill');
$('.se-quest-complete').useSound('mousedown touchstart', '#se-quest-complete');

se_ids = [
    "#se-pickel",
    "#se-cash-1",
    "#se-cash-2",
    "#se-cash-3",
    "#se-hajime",
    "#se-drill",
    "#quest-complete",
];

var vid = document.getElementById("game-bgm-1");
vid.volume = 0.3;
vid.play();

bgm_on = true
bgm_name = "#game-bgm-1"
bgm_volume = 0.3

se_on = true
se_volume = 0.3

setSEVolume()

function setSEVolume() {
    for( var i=0; i<se_ids.length; i++) {
        var vid = $(se_ids[i])[0];
        vid.volume = se_volume
    }
}

// BGM ON/OFF
function turnSound() {
    if(bgm_on) {
        var se = $(bgm_name);
        se[0].pause();
        bgm_on = false
    } else {
        var se = $(bgm_name);
        se[0].currentTime = 0;
        se[0].volume = bgm_volume;
        se[0].play();
        bgm_on=true
    }
}



// SE ON/OFF
function turnSE() 
{
    for( var i=0; i<se_ids.length; i++) {
        var vid = $(se_ids[i])[0];
        if(se_on) {
            vid.volume = 0.0;
        } else {
            vid.volume = se_volume;
        }
    }

    se_on = !se_on
}

