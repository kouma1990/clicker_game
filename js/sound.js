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

se_ids = [
    "#se-pickel",
    "#se-cash-1",
    "#se-cash-2",
    "#se-cash-3",
    "#se-hajime",
    "#se-drill",
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

var bgm_volume_slider = document.getElementById("myRangeBGM");
bgm_volume_slider.oninput = function() {
    bgm_volume = this.value/100;
    var se = $(bgm_name)[0];
    se.volume = bgm_volume
}

var se_volume_slider = document.getElementById("myRangeSE");
se_volume_slider.oninput = function() {
    se_volume = this.value/100;
    setSEVolume()
}

fadein = function (bgm_name2, bgm_volume)
{
    var bgm_obj = $(bgm_name2)[0]
    bgm_obj.play();
    var vl = bgm_obj.volume;
    if (vl < bgm_volume)
    {
        bgm_obj.volume = Math.ceil((vl+0.1)*10)/10 > bgm_volume ? bgm_volume : Math.ceil((vl+0.1)*10)/10 ;
        setTimeout(function(){fadein(bgm_name2, bgm_volume)},200);
    }
}

fadeout = function(bgm_name1, bgm_name2, bgm_volume)
{
    var bgm_obj = $(bgm_name1)[0]
    var vl = bgm_obj.volume;
    if (vl > 0)
    {
        bgm_obj.volume = Math.floor((vl-0.1)*10)/10;
        setTimeout(function(){fadeout(bgm_name1, bgm_name2, bgm_volume)}, 200);
    } else {
        bgm_obj.pause()
        var se = $(bgm_name2)[0]
        se.volume = 0
        se.currentTime = 0;
        
        setTimeout(function(){fadein(bgm_name2, bgm_volume)},2000);
    }
}
