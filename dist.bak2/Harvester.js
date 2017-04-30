const RoleType = require('RoleType');
const BaseCreep = require('BaseCreep');

class Harvester extends BaseCreep {
  /**
   * @param  {Creep} gameCreep Game creep object
   *
   * @return {Harvester} Created Harvester creep
   */
  constructor(gameCreep) {
    super(gameCreep);
  }

  run() {
    // let creep = Game.creeps[this.name];
    const creep = this.gameCreep;

    if (creep.carry.energy < creep.carryCapacity) {
      const sources = creep.room.find(FIND_SOURCES);
      this.harvest(sources[0]);
    } else {
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
            structure.energy < structure.energyCapacity;
        }
      });

      if (targets.length > 0) {
        this.transfer(targets[0]);
        // if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //   creep.moveTo(targets[0], {
        //     visualizePathStyle: {
        //       stroke: '#ffffff'
        //     }
        //   });
        // }
      }
    }
  }
}
Harvester.ROLETYPE = new RoleType("HARVESTER", [WORK, CARRY, MOVE], 300, 2, true);

module.exports = Harvester;
