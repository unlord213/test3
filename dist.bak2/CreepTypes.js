let Harvester = require('Harvester');

/**
 * @typedef {CreepType}
 * @property {Array<String>} body - Body parts
 * @property {String} role - creep role
 * @property {number} cost - energy cost to create
 */

/**
 * Map of role to creep information
 */
// TODO: turn array into map to remove creeps
let creepTypes = new Map();
creepTypes.set(Harvester.ROLE, {
  body: Harvester.BODY,
  role: Harvester.ROLE,
  cost: Harvester.COST,
  creeps: []
});

module.exports = creepTypes;
