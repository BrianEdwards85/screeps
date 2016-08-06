var util = require('util');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
      var targets = creep.room.find(FIND_STRUCTURES, {filter: util.nonfullStructureFilter});
      if(targets.length > 0) {
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
          }
      } else {
        creep.memory.job = undefined;
      }
    }
};

module.exports = roleHarvester;
