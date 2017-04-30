// var BaseCreep = require('BaseCreep');
let BaseSpawn = require('BaseSpawn');
let Harvester = require('Harvester');
let CreepManager = require('CreepManager');
let Cleanup = require('Cleanup');

// console.log('main.js')
let creepManager = new CreepManager();

module.exports.loop = function() {
  // console.log('loop')
  Cleanup.cleanup();
  creepManager.init();

  let baseSpawn = new BaseSpawn(Game.spawns['Spawn1']);

  creepManager.run(baseSpawn);

  baseSpawn.buildRoad();
  // let names = 'Harvesters: ';
  //   creepManager.creepTypes.get(Harvester.ROLE).creeps.forEach((creep) => names += creep.name + ', ')
  //   console.log(names);
  // console.log(JSON.stringify(creepManager.creepTypes.get(Harvester.ROLE).creeps));
  // if (creepManager.getNumOf(Harvester.ROLE) < 2) {
  //   baseSpawn.createCreep(Harvester.BODY, Harvester.ROLE, Harvester.COST);
  // }
  // console.log('end loop')
};
