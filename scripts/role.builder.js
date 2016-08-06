var util = require('util');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.job = undefined;
            creep.say('Built');
        } else {
            var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES,{filter: util.extentionConstructionSiteFilter});
            if(!target){
              target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            }

            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
              creep.memory.job = undefined;
              creep.say('Built');
            }
        }
    }
};

module.exports = roleBuilder;
