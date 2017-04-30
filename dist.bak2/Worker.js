const ErrorManager = require('ErrorManager');
const Actions = require('Actions');
const RoleType = require('RoleType');

/**
 * Class to hold common creep functionality
 */
class Worker {
  /**
   * @param  {Creep} gameCreep Game creep object
   *
   * @return {Worker} Created creep
   */
  constructor(gameCreep) {
    /**
     * Game creep object
     * @type {String}
     */
    this.gameCreep = gameCreep;
  }

  _harvest2() {

  }
  run() {
    const carryLoad = _.sum(this.gameCreep.carry);

    if (this.gameCreep.memory.action) {
      switch (this.gameCreep.memory.action) {
        case Actions.HARVESTING:
        /**
         * if harvesting
         *   stop harvesting if necessary
         *
         *   if at havest position
         *     harvset
         *   else
         *     move
         */
        /**
         * if harvesting
         *   stop harvesting if necessary
         *   harvest current
         *   if source mapping not complete
         *     register harvest spot
         *
         * if need to harvest
         *   find suitable sources
         *   claim harvest spot
         *   if at harvset spot
         *     harvset
         *   else
         *     move
         *
         *
         * --find suitable source
         * find source with usued access point
         *
         * --finding source
         * find memory source
         * if source has open harvest position
         *   move to unclaimed harvest position
         *   claim harvest position
         * else
         *   if source mapping complete
         *     check next source
         *   else
         *     move to source
         *
         *
         *
         */
          if (!this._shouldHarvest(carryLoad)) {
            this._resetAction();
            break;
          }

          this._harvest();
          break;
        case Actions.TRANSFERING:
          this._transfer();
          break;
        case Actions.UPGRADING_CONTROLLER:
          this._upgradeController();
          break;
        default:
      }
    }

    if (!this.gameCreep.memory.action) {
      if (this._shouldHarvest(carryLoad)) {
        this.gameCreep.memory.action = Actions.HARVESTING;
        this.gameCreep.memory.target = this.gameCreep.room.find(FIND_SOURCES)[0].id;
        return;
        // this._findHarvestTarget();
      }

      const structuresNeedingEnergy = this._findStructuresNeedingEnergy();
      if (structuresNeedingEnergy.length) {
        this.gameCreep.memory.action = Actions.TRANSFERING;
        this.gameCreep.memory.target = structuresNeedingEnergy[0].id;
        return;
      }

      this.gameCreep.memory.action = Actions.UPGRADING_CONTROLLER;
      this.gameCreep.memory.target = this.gameCreep.room.controller.id;
    }
  }

  _findStructuresNeedingEnergy() {
    return this.gameCreep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN) &&
          structure.energy < structure.energyCapacity;
      }
    });
  }

  _shouldHarvest(carryLoad) {
    return carryLoad < this.gameCreep.carryCapacity;
  }

  _resetAction() {
    this.gameCreep.memory.action = undefined;
    this.gameCreep.memory.target = undefined;
  }

  _findHarvestTarget() {
    const sources = this.gameCreep.room.find(FIND_SOURCES);

    for (const source of sources) {
      const moveResult = this._move(source);
      if (moveResult === ERR_NO_PATH) {
        continue;
      }

      const result = this._harvestTarget(source);
      if (result === OK || result === ERR_NOT_IN_RANGE) {
        this.gameCreep.memory.action = Actions.HARVESTING;
        this.gameCreep.memory.target = source.id;
        return;
      }
    }
  }

  _harvest() {
    // const structures = this._findStructuresNeedingEnergy();
    const target = Game.getObjectById(this.gameCreep.memory.target);

    const moveResult = this._move(target);
    if (moveResult === ERR_NO_PATH) {
      this._resetAction();
      this._findHarvestTarget();
      // return moveResult;
    }

    return this._harvestTarget(target);
  }

  _harvestTarget(target) {
    const result = this.gameCreep.harvest(target);

    if (result !== OK && result !== ERR_NOT_IN_RANGE) {
      ErrorManager.logError("harvest", this.gameCreep.name, result);
    }

    return result;

    // if (result === ERR_NOT_IN_RANGE) {
    //   return this._move(target);
    // } else if (result !== OK) {
    //   ErrorManager.logError("harvest", this.gameCreep.name, result);
    // }

    // return result;
  }

  _transfer() {
    if (this.gameCreep.carry.energy === 0) {
      this._resetAction();
      return;
    }

    const target = Game.getObjectById(this.gameCreep.memory.target);

    if (target.energy === target.energyCapacity) {
      this._resetAction();
      return;
    }

    const result = this.gameCreep.transfer(target, RESOURCE_ENERGY);

    if (result === ERR_NOT_IN_RANGE) {
      return this._move(target);
    } else if (result !== OK) {
      ErrorManager.logError("transfer", this.gameCreep.name, result);
    }

    return result;
  }

  _build(target) {
    const result = this.gameCreep.build(target);

    if (result === ERR_NOT_IN_RANGE) {
      return this._move(target);
    } else if (result !== OK) {
      ErrorManager.logError("build", this.gameCreep.name, result);
    }

    return result;
  }

  _upgradeController() {
    if (this.gameCreep.carry.energy === 0) {
      this._resetAction();
      return;
    }

    const target = Game.getObjectById(this.gameCreep.memory.target);
    const result = this.gameCreep.upgradeController(target);

    if (result === ERR_NOT_IN_RANGE) {
      return this._move(target);
    } else if (result !== OK) {
      ErrorManager.logError("upgradeController", this.gameCreep.name, result);
    }

    return result;
  }

  _move(target) {
    const result = this.gameCreep.moveTo(target, {
      visualizePathStyle: {
        stroke: '#ffaa00'
      }
    });

    if (result !== OK) {
      ErrorManager.logError("move", this.gameCreep.name, result);
    }

    return result;
  }
}
Worker.ROLETYPE = new RoleType("WORKER", [WORK, CARRY, MOVE], 300, 10, true);

module.exports = Worker;
