import { registerURL } from "./constants.mjs";

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
  } catch (error) {
    console.log(error);
  }
}

const registerForm = document.getElementById("form-register");

function getRegistrationData(event) {
  event.preventDefault();
  const name = document.getElementById("inputUsername").value;
  const email = document.getElementById("inputEmail").value;
  const password = document.getElementById("inputPassword").value;

  const user = {
    name,
    email,
    password,
  };

  registerUser(registerURL, user);
}

registerForm.addEventListener("submit", getRegistrationData);
