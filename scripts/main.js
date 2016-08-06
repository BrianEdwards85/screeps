var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleCollector = require('role.collect');
var roleReassign = require('role.reassign');





module.exports.loop = function () {

    for(var name in Game.rooms){
      if(Game.rooms[name].energyAvailable % 5 == 0){
        console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + '/' + Game.rooms[name].energyCapacityAvailable + ' energy');
      }
    }

    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');

    if(builder.length < 7) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'worker', job: 'collect'});
        console.log('Spawning new builder: ' + newName);
    }

    var soldier = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
    if(soldier.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                                                        TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH], undefined, {role: 'soldier'});
        console.log('Spawning new soldier: ' + newName);
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role =='worker'){
          if((creep.memory.job === undefined &&
             creep.carry.energy < creep.carryCapacity) ||
             creep.carry.energy == 0){
            creep.memory.job = 'collect';
          }

          if(creep.memory.job == 'collect') {
            roleCollector.run(creep);
          }
          if(creep.memory.job === undefined){
            roleReassign.run(creep);
          }


          if(creep.memory.job == 'harvest') {
              roleHarvester.run(creep);
          }
          if(creep.memory.job == 'build') {
              roleBuilder.run(creep);
          }
          if(creep.memory.job == 'upgrade') {
              roleUpgrader.run(creep);
          }
        } else if(creep.memory.role =='soldier'){
          creep.moveTo(Game.flags.Troops);
        }

    }
}
