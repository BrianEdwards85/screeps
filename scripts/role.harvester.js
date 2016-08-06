var util = require('util');

var roleHarvester = {

    run: function(creep) {
      var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: util.nonfullStructureFilter});
      if(target) {
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
          }
      } else {
        creep.memory.job = undefined;
      }
    }
};

module.exports = roleHarvester;
