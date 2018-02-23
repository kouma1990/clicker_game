

var AppClass = new Vue({
    el: '#app',
    data: {
        money: 5000,
        coal_object: {
            "volume": 0,
            "volume_max": 2000,
            "machine": {
                "count": 0,
                "power": 1,
            }
        },
        energy_object: {
            "volume": 0,
            "volume_max": 100,
            "machine": {
                "count": 0,
                "power": 1
            }
        }
    },
    methods: {
        buy_volume_max: function(index) {
            if(index==1) {
                this.coal_object.volume_max += 1
            } else if(index == 2) {
                this.energy_object.volume_max += 1
            }

            this.money -= 1
        },
        buy_machine: function(index) {
            if(index==1) {
                this.coal_object.machine.count += 1
            } else if(index == 2) {
                this.energy_object.machine.count += 1
            }

            this.money -= 1
        },
        sell: function(index) {
            if(index == 1) {
                this.coal_object.volume -= 1
                this.money += 1
            } else if(index == 2) {
                this.energy_object.volume -= 1
                this.money += 30
            }
        }
    },
    computed: {
        coal_volume_rate: function() {
            return  Math.round(this.coal_object.volume / this.coal_object.volume_max * 10000) / 100 
        },
        energy_volume_rate: function() {
            return  Math.round(this.energy_object.volume / this.energy_object.volume_max * 10000) / 100 
        }
        /*
        click_power: function () {
            return this.objects.reduce(function(prev, object){
                return prev + object.power*object.count; 
            },1);
        }
        */
    }
})
/*
$(function(){
    $("button"). keydown(function(e) {
        if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
            return false;
        } else {
            return true;
        }
    });
});
*/

setInterval(function() {
    var add_coal = AppClass.coal_object.machine.count * AppClass.coal_object.machine.power
    if(AppClass.coal_object.volume + add_coal > AppClass.coal_object.volume_max) {
        AppClass.coal_object.volume = AppClass.coal_object.volume_max
    } else {
        AppClass.coal_object.volume = AppClass.coal_object.volume + add_coal
    }

    var use_coal = AppClass.energy_object.machine.count * 10 > AppClass.coal_object.volume ? Math.floor(AppClass.coal_object.volume / 10) * 10 : AppClass.energy_object.machine.count * 10
    var add_energy = use_coal/10 * AppClass.energy_object.machine.power
    if(AppClass.energy_object.volume + add_energy > AppClass.energy_object.volume_max) {
        AppClass.energy_object.volume = AppClass.energy_object.volume_max
    } else {
        AppClass.energy_object.volume = AppClass.energy_object.volume + add_energy
        AppClass.coal_object.volume -= use_coal
    }
    /*
    for( var i=0; i<AppClass.kj_count.length; i++) {
        result += AppClass.kj_count[i] * AppClass.kj_power[i]
    }*/
    //AppClass.money += 1
    //AppClass.money
}, 1000)
