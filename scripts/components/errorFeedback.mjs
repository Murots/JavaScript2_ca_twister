/**
 * Display an error message in a form element.
 * @param {object} errors
 * @param {HTMLElement} formElement
 * @returns {void}
 * @example
 * // Display an error message in a form
 * const form = document.getElementById("myForm");
 * errorFeedback(errors, form);
 */
export function errorFeedback(errors, formElement) {
  const errorMessage = document.createElement("p");
  errorMessage.classList.add("error");
  errorMessage.innerText = errors[0].message;
  formElement.append(errorMessage);
}
