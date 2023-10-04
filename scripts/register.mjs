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
    } else {
      const successMessage = document.createElement("p");
      successMessage.classList.add("success");
      successMessage.textContent = "Congratulations on your new Twister account. Click ";

      const signInLink = document.createElement("a");
      signInLink.href = "../index.html";
      signInLink.textContent = "HERE";

      successMessage.append(signInLink);
      successMessage.append(" to sign in.");
      registerForm.append(successMessage);
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

  const existingFeedback = document.querySelector(".error, .success");
  if (existingFeedback) {
    existingFeedback.remove();
  }

  registerUser(registerURL, userToRegister);
}

registerForm.addEventListener("submit", getRegistrationData);
