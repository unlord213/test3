let Harvester = require('Harvester');
let Builder = require('Builder');
let Upgrader = require('Upgrader');

/**
 * @typedef {CreepType}
 * @property {Array<String>} body - Body parts
 * @property {String} role - creep role
 * @property {number} max - max number ot creeps for role
 * @property {number} cost - energy cost to create
 * @property {boolean} roads - if should build roads to support this role
 * @property {function(String, Creep)} create - method to create creep for role
 * @property {Array<Creep>} creeps of this role
 */

/**
 * Map of role to creep information
 */
let creepTypes = new Map();
creepTypes.set(Harvester.ROLE, {
  body: Harvester.BODY,
  // role: Harvester.ROLE,
  max: Harvester.MAX,
  cost: Harvester.COST,
  roads: true,
  create: function(name, creep) {
    return new Harvester(name, creep);
  },
  creeps: []
});
creepTypes.set(Builder.ROLE, {
  body: Builder.BODY,
  max: Builder.MAX,
  cost: Builder.COST,
  roads: false,
  create: function(name, creep) {
    return new Builder(name, creep);
  },
  creeps: []
});
creepTypes.set(Upgrader.ROLE, {
  body: Upgrader.BODY,
  max: Upgrader.MAX,
  cost: Upgrader.COST,
  roads: false,
  create: function(name, creep) {
    return new Upgrader(name, creep);
  },
  creeps: []
});

module.exports = creepTypes;
