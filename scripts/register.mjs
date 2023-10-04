import { registerURL } from "./constants.mjs";
import { errorFeedback } from "./components/errorFeedback.mjs";

const registerForm = document.getElementById("form-register");

/**
 * API call that registers the user
 * @param {string} url
 * @param {any} userData
 * ```js
 * registerUser(registerURL, user);
 * ```
 */
async function registerUser(url, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(url, postData);
    const json = await response.json();
    console.log(json);

    if (json.errors) {
      errorFeedback(json.errors, registerForm);
    }
  } catch (error) {
    console.log(error);
  }
}

function getRegistrationData(event) {
  event.preventDefault();
  const name = document.getElementById("inputUsername").value;
  const email = document.getElementById("inputEmail").value;
  const password = document.getElementById("inputPassword").value;

  const userToRegister = {
    name,
    email,
    password,
  };

  const existingError = document.querySelector(".error");
  if (existingError) {
    existingError.remove();
  }

  registerUser(registerURL, userToRegister);
}

registerForm.addEventListener("submit", getRegistrationData);
