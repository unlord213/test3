let BaseCreep = require('BaseCreep');

/**
 * Builder creep
 */
class Builder extends BaseCreep {
  /**
   * @param  {String} name creep name
   * @param  {Creep} creep creep
   * @return {Builder} created Builder
   */
  constructor(name, creep) {
    super(Builder.BODY, Builder.ROLE, Builder.COST, name, creep);
  }

  run() {
    let creep = this.creep;

    if (creep.memory.building && creep.carry.energy === 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    if (creep.memory.building) {
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {
            visualizePathStyle: {
              stroke: '#ffffff'
            }
          });
        }
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
Builder.BODY = [WORK, CARRY, MOVE];
Builder.ROLE = 'BUILDER';
Builder.COST = 300;
Builder.MAX = 1;

module.exports = Builder;
