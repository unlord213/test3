const RoleType = require('RoleType');
const BaseCreep = require('BaseCreep');

class Builder extends BaseCreep {
  /**
   * @param  {Creep} gameCreep Game creep object
   *
   * @return {Builder} Created Upgrader creep
   */
  constructor(gameCreep) {
    super(gameCreep);
  }

  run() {
    const creep = this.gameCreep;

    if (creep.memory.building && creep.carry.energy === 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    if (creep.memory.building) {
      const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        this.build(targets[0]);
      }
    } else {
      const sources = creep.room.find(FIND_SOURCES);
      this.harvest(sources[0]);
    }
  }
}
Builder.ROLETYPE = new RoleType("BUILDER", [WORK, CARRY, MOVE], 300, 2, true);

module.exports = Builder;
