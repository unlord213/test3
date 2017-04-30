let Harvester = require('Harvester');
let creepTypes = require('CreepTypes');

let instance = null;

/**
 * Class to sort and run creeps
 */
class CreepManager {
  constructor() {
    if (!instance) {
      instance = this;
      this.creepTypes = creepTypes;
    }

    return instance;
  }

  /**
   * sort all the creeps
   */
  init() {
    this.creepTypes.forEach((creepType) => creepType.creeps.length = 0);

    for (let name of Object.keys(Game.creeps)) {
      let creep = Game.creeps[name];
      let creepType = this.creepTypes.get(creep.memory.role);
      creepType.creeps.push(creepType.create(name, creep));
    }
  }

  /**
   * Run all the creeps
   * @param {BaseSpawn} baseSpawn
   */
  run(baseSpawn) {
    let spawning = false;
    this.creepTypes.forEach((creepType, role) => {
      if (!spawning && creepType.creeps.length < creepType.max) {
        spawning = true;
        baseSpawn.createCreep(creepType.body, role, creepType.cost);
      }

      creepType.creeps.forEach((creep) => creep.run());
    });
  }

  /**
   * Return the creeps that want road support
   *
   * @return {Array<Creep>} number of creeps
   */
  getRoadCreeps() {
    for (let creepType of this.creepTypes.values()) {

    }
    // this.creepTypes.values.reduce((creepType) => {});
  }

  // /**
  //  * Return the number of creeps of the give type
  //  *
  //  * @param {String} role role to count
  //  * @return {number} number of creeps
  //  */
  // getNumOf(role) {
  //   return this.creepTypes.get(role).creeps.length;
  // }
}

module.exports = CreepManager;
