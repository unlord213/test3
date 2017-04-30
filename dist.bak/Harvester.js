let BaseCreep = require('BaseCreep');

/**
 * Harvester creep
 */
class Harvester extends BaseCreep {
  /**
   * @param  {String} name creep name
   * @param  {Creep} creep creep
   * @return {Harvester} created Harvester
   */
  constructor(name, creep) {
    super(Harvester.BODY, Harvester.ROLE, Harvester.COST, name, creep);
  }

  run() {
    // let creep = Game.creeps[this.name];
    let creep = this.creep;

    if (creep.carry.energy < creep.carryCapacity) {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
      }
    } else {
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
            structure.energy < structure.energyCapacity;
        }
      });
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {
            visualizePathStyle: {
              stroke: '#ffffff'
            }
          });
        }
      }
    }
  }
}
Harvester.BODY = [WORK, CARRY, MOVE];
Harvester.ROLE = 'HARVESTER';
Harvester.COST = 300;
Harvester.MAX = 1;

module.exports = Harvester;
