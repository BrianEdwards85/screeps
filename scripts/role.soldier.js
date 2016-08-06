var roleSoldierer = {
  run: function(creep) {
    var soldier = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
    var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
      var rangedTargets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
      if(rangedTargets.length > 0) {
        creep.rangedAttack(rangedTargets[0]);
      } else {
        creep.moveTo(hostiles[0]);
      }
    } else {
      creep.moveTo(Game.flags.Flag1);
    }
  }

};

module.exports = roleSoldierer;
