let NameGenerator = require('NameGenerator');
let CreepManager = require('CreepManager');

/**
 * Wrapper for a StructureSpawn
 */
class BaseSpawn {
  /**
   * @param  {StructureSpawn} structureSpawn
   */
  constructor(structureSpawn) {
    this.structureSpawn = structureSpawn;
  }

  /**
   * Spawn a creep
   *
   * @param  {Array<String>} body Body parts
   * @param  {String} role Role
   * @param  {number} cost Energy cost
   * @return {string|undefined}
   */
  createCreep(body, role, cost) {
    if (this.structureSpawn.energy < cost) {
      return;
    }

    let name = NameGenerator.generate(role);
    let newName = this.structureSpawn.createCreep(body, name, {
      role: role
    });

    if (_.isString(newName)) {
      console.log('Spawning: ' + newName);
      return newName;
    }

    switch (newName) {
      case -1:
        console.log('ERROR spawning' + role + ': You are not the owner of this spawn.');
        break;
      case -3:
        console.log('ERROR spawning ' + role + ': There is a creep with the same name already.');
        break;
      case -4:
        console.log('ERROR spawning ' + role + ': The spawn is already in process of spawning another creep.');
        break;
      case -6:
        console.log('ERROR spawning ' + role + ': The spawn and its extensions contain not enough energy to create a creep with the given body.');
        break;
      case -10:
        console.log('ERROR spawning ' + role + ': Body is not properly described.');
        break;
      case -14:
        console.log('ERROR spawning ' + role + ': Your Room Controller level is insufficient to use this spawn.');
        break;
      default:
    }
  }

  buildRoad() {
    let creepManager = new CreepManager();
    creepManager.getRoadCreeps();
  }
}

module.exports = BaseSpawn;
