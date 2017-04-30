const ErrorTypes = require('ErrorTypes');

/**
 * Class to handle errors
 */
class ErrorManager {
  /**
   * Log the error to the console
   *
   * @param  {String} action The action the error occured for
   * @param  {String} instance The instance the error occured for
   * @param  {number} error The error code
   */
  static logError(action, instance, error) {
    console.log('ERROR:' + instance + ":" + action + ":" + ErrorTypes[error.toString()]);
  }
}

module.exports = ErrorManager;
