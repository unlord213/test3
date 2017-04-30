const Harvester = require('Harvester');
const Builder = require('Builder');
const Upgrader = require('Upgrader');
const Worker = require('Worker');

// let instance = null;

/**
 * Class  to manage creeps
 */
class CreepManager {
  /**
   * Return CreepManager
   *
   * @return {CreepManager} created CreepManager
   */
  constructor() {
    // if (!instance) {
    //   instance = this;
    /**
     * Map of RoleType to creeps of that role
     * @type {Map.<RoleType, Creep[]>}
     */
    this.roles = new Map();

    // this.roles.set(Harvester.ROLETYPE, []);
    // this.roles.set(Builder.ROLETYPE, []);
    // this.roles.set(Upgrader.ROLETYPE, []);
    this.roles.set(Worker.ROLETYPE, []);

    Object.entries(Game.creeps).forEach(([name, creep]) => {
      switch (creep.memory.role) {
        // case Harvester.ROLETYPE.name:
        //   this.roles.get(Harvester.ROLETYPE).push(new Harvester(creep));
        //   // this._addCreep(Harvester.ROLETYPE, new Harvester(creep));
        //   break;
        // case Builder.ROLETYPE.name:
        //   this.roles.get(Builder.ROLETYPE).push(new Builder(creep));
        //   break;
        // case Upgrader.ROLETYPE.name:
        //   this.roles.get(Upgrader.ROLETYPE).push(new Upgrader(creep));
        //   break;
        case Worker.ROLETYPE.name:
          this.roles.get(Worker.ROLETYPE).push(new Worker(creep));
          break;
        default:
      }
    });
    // }
    //
    // return instance;
  }

  // init() {
  //   this.roles.forEach((creeps, role) => creeps.length = 0);
  //   this._register(Harvester.ROLETYPE, new Harvester(name, creep));
  // }

  // createCreep(baseSpawn) {
  //   this.roles.forEach((creeps, roleType) => {
  //     let bool = creeps.length < roleType.max;
  //     // console.log(roleType.name + ":" + roleType.max + ":" + creeps.length + ":" + bool);
  //     if (creeps.length < roleType.max) {
  //       console.log('create');
  //       baseSpawn.createCreep(roleType);
  //       return;
  //     }
  //   });
  // }

  getRoleToCreate() {
    // let roleToCreate;

    for (const [roleType, creeps] of this.roles.entries()) {
      if (creeps.length < roleType.max) {
        return roleType;
      }
    }
    // this.roles.forEach((creeps, roleType) => {
    //   console.log('check ', JSON.stringify(roleType.name))
    //   let bool = creeps.length < roleType.max;
    //   if (creeps.length < roleType.max) {
    //     console.log('return ', roleType.name)
    //     roleToCreate = roleType;
    //     return;
    //   }
    // });

    // return roleToCreate;
  }

  run() {
    this.roles.forEach((creeps) => creeps.forEach(creep => creep.run()));
  }

  // _register(roleType) {
  //   let creeps = this.roles.get(roleType);
  //   if (undefined === creeps) {
  //     creeps = [];
  //     this.roles.set(roleType, creeps);
  //   }
  // }
  //
  // _addCreep(roleType, creep) {
  //   this.roles.get(roleType).push(creep);
  // }

  status() {
    this.roles.forEach((creeps, roleType) => {
      let info = roleType.name + ": [";
      creeps.forEach(creep => info += creep.gameCreep.name + ", ");
      info += "]";
      console.log(info);
    });
  }
}

module.exports = CreepManager;
