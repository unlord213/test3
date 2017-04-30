const NameGenerator = require('NameGenerator');
const StructureType = require('StructureType');
const ErrorManager = require('ErrorManager');

/**
 * Wrapper for a StructureSpawn
 */
class SpawnStructure {
  /**
   * @param  {StructureSpawn} structureSpawn
   *
   * @return {SpawnStructure} Created SpawnStructure
   */
  constructor(structureSpawn) {
    this.gameStructure = structureSpawn;
  }

  run(creepManager) {
    const roleToCreate = creepManager.getRoleToCreate();
    if(undefined !== roleToCreate) {
      this._createCreep(roleToCreate);
    }
  }

  /**
   * Spawn a creep
   *
   * @param  {RoleType} roleType
   *
   * @return {string|undefined}
   */
  _createCreep(roleType) {
    if (this.gameStructure.energy < roleType.cost) {
      return;
    }

    const name = NameGenerator.generate(roleType.name);
    const result = this.gameStructure.createCreep(roleType.body, name, {
      role: roleType.name
    });

    if (_.isString(result)) {
      console.log('Spawning: ' + result);
      return result;
    }

    ErrorManager.logError('spawning', roleType.name, result);
  }

  // buildRoad() {
  //   let creepManager = new CreepManager();
  //   creepManager.getRoadCreeps();
  // }
}
SpawnStructure.STRUCTURETYPE = new StructureType("SPAWN");

module.exports = SpawnStructure;
