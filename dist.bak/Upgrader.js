let BaseCreep = require('BaseCreep');

/**
 * Builder creep
 */
class Upgrader extends BaseCreep {
  /**
   * @param  {String} name creep name
   * @param  {Creep} creep creep
   * @return {Upgrader} created Upgrader
   */
  constructor(name, creep) {
    super(Upgrader.BODY, Upgrader.ROLE, Upgrader.COST, name, creep);
  }

  run() {
    let creep = this.creep;

    if (creep.memory.upgrading && creep.carry.energy === 0) {
      creep.memory.upgrading = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
      creep.say('⚡ upgrade');
    }

    if (creep.memory.upgrading) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {
          visualizePathStyle: {
            stroke: '#ffffff'
          }
        });
      }
    } else {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
      }
    }
  }
}
Upgrader.BODY = [WORK, CARRY, MOVE];
Upgrader.ROLE = 'UPGRADER';
Upgrader.COST = 300;
Upgrader.MAX = 1;

module.exports = Upgrader;
