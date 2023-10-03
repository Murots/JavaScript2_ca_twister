import { loginURL } from "./constants.mjs";

/**
 * API call that let the user sign in
 * @param {string} url
 * @param {any} userData
 * ```js
 * loginUser(loginURL, userToLogin);
 * ```
 */
async function loginUser(url, userData) {
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

const signinForm = document.getElementById("form-signin");

function getLoginData(event) {
  event.preventDefault();
  const email = document.getElementById("inputEmail").value;
  const password = document.getElementById("inputPassword").value;

  const userToLogin = {
    email,
    password,
  };

  loginUser(loginURL, userToLogin);
}

signinForm.addEventListener("submit", getLoginData);
