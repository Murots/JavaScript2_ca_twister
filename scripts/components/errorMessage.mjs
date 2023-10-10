/**
 * Generates an error message HTML element with an optional custom message.
 * @param {string} message
 * @returns {string}
 * @example
 * // Create an error message with a custom message
 * const customErrorMessage = errorMessage("Could not fetch data...");
 */
export function errorMessage(message = "Unknown error") {
  return `<div class="error-message">${message}</div>`;
}
