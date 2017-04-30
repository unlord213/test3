/**
 * Class to generate a unique name
 */
class NameGenerator {
  /**
   * Generate a unique name for a creep based on role
   *
   * @param  {String} roleName Role name
   *
   * @return {String} Unique creep name
   */
  static generate(roleName) {
    return roleName + Game.time.toString();
  }
}

module.exports = NameGenerator;
