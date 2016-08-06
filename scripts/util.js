function structureFilter(structure){
    return structure.structureType == STRUCTURE_EXTENSION ||
      structure.structureType == STRUCTURE_SPAWN ||
      structure.structureType == STRUCTURE_TOWER;
}

var util = {
  structureFilter: structureFilter,
  nonfullStructureFilter: function(structure){
    return structureFilter(structure) && structure.energy < structure.energyCapacity;
  },
  sourcesWithEnergy: functions(source){
      return source.energy > 0;
  }


};


module.exports = util;
