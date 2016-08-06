var util = require('util');

var reassign = {

  run: function(creep) {
    if(creep.room.controller.ticksToDowngrade < 2000){
      creep.say('Upgrade');
      creep.memory.job = 'upgrade';
      return;
    }

    var targets = creep.room.find(FIND_STRUCTURES, { filter: util.nonfullStructureFilter });

    if(targets.length > 0){
      var harvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker' && creep.memory.job == 'harvest');
      if(harvester.length < 3){
        creep.say('Harvest');
        creep.memory.job = 'harvest';
        return;
      }
    }

    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if(targets.length) {
        var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker' && creep.memory.job == 'build');
        if(builder.length < 3){
          creep.say('Build');
          creep.memory.job = 'build';
          return;
        }
    }

    creep.say('Upgrade');
    creep.memory.job = 'upgrade';
  }

};

module.exports = reassign;
