

var AppClass = new Vue({
    el: '#app',
    data: {
        money: 50,
        coal_object: {
            "volume": 0,
            "volume_max": 500,
            "cap_cost": 5,
            "click_power": 1,
            "miner": {
                "cost": 30,
                "count": 0,
                "power": 1,
            },
            "machine": {
                "cost": 1000,
                "count": 0,
                "power": 1,
                "speed": 3200,
                "upgrade_speed_cost": 5000,
                "interval_id": null,
                "run_machine_function": null,
            },
            "value": 1,
        },
        energy_object: {
            "researched":false,
            "volume": 0,
            "volume_max": 200,
            "cap_cost": 15,
            "machine": {
                "cost": 5000,
                "count": 0,
                "use_coal": 10,
                "out_energy": 1,
                "speed": 6400,
                "upgrade_speed_cost": 25000,
                "interval_id": null,
                "run_machine_function": null,
            },
            "value" : 30,
        },
        factory_object: {
            "researched":false,
            "volume": 0,
            "volume_max": 10,
            "cap_cost": 30,
            "machine": {
                "cost": 100000,
                "count": 0,
                "use_energy": 100,
                "out_product": 1,
                "speed": 6400,
                "upgrade_speed_cost": 500000,
                "interval_id": null,
                "run_machine_function": null,
            },
            "value": 1000,
        },
        "research_energy_cost": 1000,
        "research_factory_cost": 20000,

        battle: {
            enemy_level: 1,
            health_max: 100,
            health: 100,
            attack: 0,
            speed: 500,
            interval_id: null,
            run_battle_function: null,
            cost: 100,
        }
    },
    methods: {
        hire: function(index) {
            if(index==1) {
                this.coal_object.miner.count += 1
                this.money -= this.coal_object.miner.cost
                this.coal_object.miner.cost = Math.ceil(this.coal_object.miner.cost * 1.2)
            }
        },
        buy_volume_max: function(index, amount=1) {
            var object = this.get_object(index)

            object.volume_max += 1 * amount
            this.money -= object.cap_cost * amount
        },
        buy_machine: function(index) {
            var object = this.get_object(index)

            object.machine.count += 1
            this.money -= object.machine.cost
            object.machine.cost = Math.ceil(object.machine.cost * 1.2)
        },
        upgrade_machine_speed: function(index) {
            var object = this.get_object(index)
            object.machine.speed = Math.ceil(object.machine.speed * 0.8)
            this.money -= object.machine.upgrade_speed_cost
            object.machine.upgrade_speed_cost *= 10
            
            clearInterval(object.machine.interval_id);
　　          object.machine.interval_id = setInterval(object.machine.run_machine_function, object.machine.speed);
        },
        sell: function(index, mode=1) {
            var sell_rate = 1.0
            var object = this.get_object(index)
            var sell_amount = mode == 1 ? 1 : Math.ceil(object.volume * sell_rate)
            
            object.volume -= sell_amount
            this.money += object.value * sell_amount
        },
        research: function(index) {
            if(index == 1) {
                this.energy_object.researched = true
                this.money -= this.research_energy_cost
            } else if(index == 2) {
                this.factory_object.researched = true
                this.money -= this.research_factory_cost
            }
        },
        get_object: function(index) {
            if(index == 1) {
                return this.coal_object
            } else if(index == 2) {
                return this.energy_object
            } else if(index == 3) {
                return this.factory_object
            }
        },

        // 戦闘--------------------
        buy_weapon: function(index) {
            this.money -= this.battle.cost
            this.battle.attack += 1
        }
    },
    computed: {
        coal_volume_rate: function() {
            return  Math.round(this.coal_object.volume / this.coal_object.volume_max * 10000) / 100 
        },
        energy_volume_rate: function() {
            return  this.energy_object.volume_max == 0 ? 0 : Math.round(this.energy_object.volume / this.energy_object.volume_max * 10000) / 100 
        },
        factory_volume_rate: function() {
            return  this.factory_object.volume_max == 0 ? 0 : Math.round(this.factory_object.volume / this.factory_object.volume_max * 10000) / 100 
        },
        energy_machine_use_coal: function() {
            return this.energy_object.machine.count * this.energy_object.machine.use_coal
        },
        coal_click_power: function () {
            return 1 + this.coal_object.miner.count * this.coal_object.miner.power 
            /*this.objects.reduce(function(prev, object){
                return prev + object.power*object.count; 
            },1);*/
        },
        health_volume_rate: function() {
            return  this.battle.health_max == 0 ? 0 : Math.round(this.battle.health / this.battle.health_max * 10000) / 100 
        },
    },
    filters: {
        numberDelimiter: function (value) {
            return value.toLocaleString()
        },
    },
})


// 採掘機の処理
AppClass.coal_object.machine.run_machine_function = function() {
    var add_coal = AppClass.coal_object.machine.count * AppClass.coal_object.machine.power
    if(AppClass.coal_object.volume + add_coal > AppClass.coal_object.volume_max) {
        AppClass.coal_object.volume = AppClass.coal_object.volume_max
    } else {
        AppClass.coal_object.volume = AppClass.coal_object.volume + add_coal
    }
}

// 発電機の処理
AppClass.energy_object.machine.run_machine_function = function() {
    var use_coal = AppClass.energy_machine_use_coal > AppClass.coal_object.volume ? Math.floor(AppClass.coal_object.volume / AppClass.energy_object.machine.use_coal) * AppClass.energy_object.machine.use_coal : AppClass.energy_machine_use_coal
    var add_energy = use_coal/ AppClass.energy_object.machine.use_coal * AppClass.energy_object.machine.out_energy
    if(AppClass.energy_object.volume + add_energy > AppClass.energy_object.volume_max) {
        AppClass.coal_object.volume -= (AppClass.energy_object.volume_max-AppClass.energy_object.volume)*10
        AppClass.energy_object.volume = AppClass.energy_object.volume_max
    } else {
        AppClass.energy_object.volume += add_energy
        AppClass.coal_object.volume -= use_coal
    }
}

// 工場の処理
AppClass.factory_object.machine.run_machine_function = function() {    
    var use_energy = AppClass.factory_object.machine.count * 100 > AppClass.energy_object.volume ? Math.floor(AppClass.energy_object.volume / 100) * 100 : AppClass.factory_object.machine.count * 100
    var add_product = use_energy/ AppClass.factory_object.machine.use_energy * AppClass.factory_object.machine.out_product
    if(AppClass.factory_object.volume + add_product > AppClass.factory_object.volume_max) {
        AppClass.energy_object.volume -= (AppClass.factory_object.volume_max-AppClass.factory_object.volume)*10
        AppClass.factory_object.volume = AppClass.factory_object.volume_max
    } else {
        AppClass.factory_object.volume += add_product
        AppClass.energy_object.volume -= use_energy
    }
    /*
    AppClass.energy_object.volume -= use_energy
    AppClass.money += use_energy / 100 * 1000 
    */
}

AppClass.coal_object.machine.interval_id = setInterval(AppClass.coal_object.machine.run_machine_function, AppClass.coal_object.machine.speed)
AppClass.energy_object.machine.interval_id = setInterval(AppClass.energy_object.machine.run_machine_function, AppClass.energy_object.machine.speed)
AppClass.factory_object.machine.interval_id = setInterval(AppClass.factory_object.machine.run_machine_function, AppClass.factory_object.machine.speed)


// 戦闘の処理
AppClass.battle.run_battle_function = function () {
    var battle_object = AppClass.battle

    battle_object.health -= battle_object.attack
    if(battle_object.health <= 0) {
        battle_object.enemy_level += 1
        if(battle_object.enemy_level % 10 == 0) {
            battle_object.health_max =  Math.round(battle_object.health_max*3.3)
        } else if(battle_object.enemy_level % 100 == 0) {
            battle_object.health_max =  Math.round(battle_object.health_max*33.3)
        } else {
            battle_object.health_max =  Math.round(battle_object.health_max*1.3)
        }
        battle_object.health = battle_object.health_max
    }
}

AppClass.battle.interval_id = setInterval(AppClass.battle.run_battle_function, AppClass.battle.speed)

/*
// enter禁止
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

// ダブルタップによる拡大を禁止
/*
var t = 0;
document.documentElement.addEventListener('touchend', function (e) {
    var now = new Date().getTime();
    if ((now - t) < 350){
        e.preventDefault();
    }
    t = now;
}, false);
*/