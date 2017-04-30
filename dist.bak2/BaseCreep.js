const ErrorManager = require('ErrorManager');
/**
 * Class to hold common creep functionality
 */
class BaseCreep {
  /**
   * @param  {Creep} gameCreep Game creep object
   *
   * @return {Harvester} Created creep
   */
  constructor(gameCreep) {
    /**
     * Game creep object
     * @type {String}
     */
    this.gameCreep = gameCreep;
  }

  harvest(target) {
    const result = this.gameCreep.harvest(target);

    if (result === ERR_NOT_IN_RANGE) {
      this.move(target);
    } else if (result !== OK) {
      ErrorManager.logError("harvest", this.gameCreep.name, result);
    }

    return result;
  }

  transfer(target) {
    const result = this.gameCreep.transfer(target, RESOURCE_ENERGY);
    if (result === OK) {
      return;
    }

    if (result === ERR_NOT_IN_RANGE) {
      this.move(target);
      return;
    }

    ErrorManager.logError("transfer", this.gameCreep.name, result);
  }

  build(target) {
    const result = this.gameCreep.build(target);
    if (result === OK) {
      return;
    }

    if (result === ERR_NOT_IN_RANGE) {
      this.move(target);
      return;
    }

    ErrorManager.logError("build", this.gameCreep.name, result);
  }

  move(target) {
    const result = this.gameCreep.moveTo(target, {
      visualizePathStyle: {
        stroke: '#ffaa00'
      }
    });

    if (result === OK) {
      return;
    }

    ErrorManager.logError("move", this.gameCreep.name, result);
  }

  upgradeController(target) {
    const result = this.gameCreep.upgradeController(target);
    if (result === OK) {
      return;
    }

    if (result === ERR_NOT_IN_RANGE) {
      this.move(target);
      return;
    }

    ErrorManager.logError("upgradeController", this.gameCreep.name, result);
  }
}

module.exports = BaseCreep;
