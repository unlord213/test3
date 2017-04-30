/**
 * Class to define properties of creep role type
 */
class RoleType {
  /**
   * @param  {String} name RoleType name
   * @param  {Array<String>} body Body parts for the role
   * @param  {number} cost Energy cost to create a creep with this role
   * @param  {number} max Max number of creeps of this role to have
   * @param  {boolean} roads If this role needs road support
   *
   * @return {RoleType} Created RoleType
   */
  constructor(name, body, cost, max, roads) {
    /**
     * RoleType name
     * @type {String}
     */
    this.name = name;

    /**
     * Body parts for the role
     * @type {Array<String>}
     */
    this.body = body;

    /**
     * Energy cost to create a creep with this role
     * @type {number}
     */
    this.cost = cost;

    /**
     * Max number of creeps of this role to have
     * @type {number}
     */
    this.max = max;

    /**
     * If this role needs road support
     * @type {boolean}
     */
    this.roads = roads;
  }
}

module.exports = RoleType;
