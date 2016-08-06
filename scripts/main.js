var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleCollector = require('role.collect');
var roleReassign = require('role.reassign');
var roleSoldierer = require('role.soldier');
var util = require('util');

module.exports.loop = function () {

    for(var name in Game.rooms){
      if(Game.rooms[name].energyAvailable % 10 == 0){
        console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + '/' + Game.rooms[name].energyCapacityAvailable + ' energy');
      }
    }

    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
    var soldier = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
    var cap = Game.rooms['sim'].energyAvailable >= (Game.rooms['sim'].energyCapacityAvailable - (Game.rooms['sim'].energyCapacityAvailable % 100));

    if(cap && soldier.length < 3) {
      var newName = util.createSoldier(Game.spawns['Spawn1'],Game.rooms['sim']);
      console.log('Spawning new soldier: ' + newName  + " (" + soldier.length + "/12)");
      cap = false;
    }

    if(cap && builder.length < 10) {
      var newName = util.createWorker(Game.spawns['Spawn1'],Game.rooms['sim']);
      console.log('Spawning new builder: ' + newName + " (" + builder.length + "/12)");
      cap = false;
    }

    var soldier = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
    if(cap && soldier.length < 12) {
      var newName = util.createSoldier(Game.spawns['Spawn1'],Game.rooms['sim']);
      console.log('Spawning new soldier: ' + newName  + " (" + soldier.length + "/12)");
    }

    var hostiles = Game.rooms['sim'].find(FIND_HOSTILE_CREEPS);

    if(hostiles.length > 0) {
        var towers = Game.rooms[roomName].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
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
          roleSoldierer.run(creep);
          //creep.moveTo(Game.flags.Flag1);
        }

    }
}
