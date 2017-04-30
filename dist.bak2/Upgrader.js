const RoleType = require('RoleType');
const BaseCreep = require('BaseCreep');

class Upgrader extends BaseCreep {
  /**
   * @param  {Creep} gameCreep Game creep object
   *
   * @return {Upgrader} Created Upgrader creep
   */
  constructor(gameCreep) {
    super(gameCreep);
  }

  run() {
    const creep = this.gameCreep;

    if (creep.memory.upgrading && creep.carry.energy === 0) {
      creep.memory.upgrading = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
      creep.say('⚡ upgrade');
    }

    if (creep.memory.upgrading) {
      this.upgradeController(creep.room.controller);
    } else {
      const sources = creep.room.find(FIND_SOURCES);
      this.harvest(sources[0]);
    }
  }
}
Upgrader.ROLETYPE = new RoleType("UPGRADER", [WORK, CARRY, MOVE], 300, 2, true);

module.exports = Upgrader;
