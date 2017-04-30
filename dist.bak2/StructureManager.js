let SpawnStructure = require('SpawnStructure');

class StructureManager {
  /**
   * @return {StructureManager} created StructureManager
   */
  constructor() {
    /**
     * Map of Structure to structures of that type
     * @type {Map.<Structure, Structure[]>}
     */
    this.structureMap = new Map();
    this.structureMap.set(SpawnStructure.STRUCTURETYPE, []);

    Object.entries(Game.structures).forEach(([name, structure]) => {
      switch (structure.structureType) {
        case STRUCTURE_SPAWN:
          this.structureMap.get(SpawnStructure.STRUCTURETYPE).push(new SpawnStructure(structure));
          break;
      }
    });
  }

  run(creepManager) {
    this.structureMap.forEach((structures) => structures.forEach(structure => structure.run(creepManager)));
  }

  // _register(structure) {
  //   console.log("before ", JSON.stringify(structure), JSON.stringify(this.structureMap));
  //   // let structures = this.structureMap.get(structure);
  //   // console.log("structures:", structures)
  //   // if (undefined === structures) {
  //   //   structures = [];
  //   //   console.log('set', JSON.stringify(structure), JSON.stringify(structures))
  //   this.structureMap.set(structure, []);
  //   //   console.log('after set', JSON.stringify(structure), JSON.stringify(structures), JSON.stringify(this.structureMap))
  //   // }
  //   console.log("after ", structure.name, JSON.stringify(this.structureMap));
  // }
  //
  // _addStructure(structureType, structure) {
  //   this.structureMap.get(structureType).push(structure);
  // }

  status() {
    this.structureMap.forEach((structures, structureType) => {
      let info = structureType.name + ": [";
      structures.forEach(structure => info += structure.gameStructure.name + ", ");
      info += "]";
      console.log(info);
    });
  }
}

module.exports = StructureManager;
