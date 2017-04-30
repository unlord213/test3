class NameGenerator {
  /**
   * Generate a unique name for a creep based on role
   *
   * @param  {String} role creep role
   * @return {Generator<String>} unique name
   */
  static generate(role) {
    return role + Game.time.toString();
  }
}

module.exports = NameGenerator;
