// let Harvester = require('Harvester');
// let SpawnStructure = require('structure/SpawnStructure');
const CreepManager = require('CreepManager');
const StructureManager = require('StructureManager');

module.exports.loop = function() {
  // let spawnStructure = new SpawnStructure(Game.spawns.Spawn1);

  const structureManager = new StructureManager();
  const creepManager = new CreepManager();

  structureManager.run(creepManager);
  creepManager.run();

  // creepManager.init();
  // creepManager.createCreep(spawnStructure);
  structureManager.status();
  creepManager.status();
};
