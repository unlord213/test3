/**
 * Clean up memory
 */
class Cleanup {
  /**
   * Remove expired creeps from memory
   */
  static cleanup() {
    for (var name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
      }
    }
  }
}

module.exports = Cleanup;
