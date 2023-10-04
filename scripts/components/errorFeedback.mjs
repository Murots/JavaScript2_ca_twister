export function errorFeedback(errors, formElement) {
  const errorMessage = document.createElement("p");
  errorMessage.classList.add("error");
  errorMessage.innerText = errors[0].message;
  formElement.append(errorMessage);
}
