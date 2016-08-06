var util = require('util');


var roleCollecter = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var source = creep.room.findClosestByPath(FIND_SOURCES, {filter: util.sourcesWithEnergy});

            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
         creep.memory.job = undefined;
         creep.say('Loaded');
        }
    }
};

module.exports = roleCollecter;
