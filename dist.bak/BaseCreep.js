/**
 * Base creep class for others to extend
 */
class BaseCreep {
  /**
   * @param  {Array<String>} body Body parts
   * @param  {String} role Role
   * @param  {number} cost Energy cost
   * @param  {String} name Name
   * @param  {Creep} creep
   */
  constructor(body, role, cost, name, creep) {
    /**
     * Parts of the creep
     * @type {Array<String>}
     */
    this.body = body;
    /**
     * Creep role
     * @type {String}
     */
    this.role = role;
    /**
     * Energy cost to create
     * @type {number}
     */
    this.cost = cost;
    /**
     * Creep Name
     * @type {String}
     */
    this.name = name;
    /**
     * Creep
      @type {Creep}
     */
    this.creep = creep;
  }

  run() {
    console.log("ERROR: BaseCreep has no run");
  }
}

module.exports = BaseCreep;
