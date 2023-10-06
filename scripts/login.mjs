import { loginURL } from "./constants.mjs";
import { errorFeedback } from "./components/errorFeedback.mjs";

const signinForm = document.getElementById("form-signin");

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

    const accessToken = json.accessToken;
    localStorage.setItem("accessToken", accessToken);

    const username = json.name;
    localStorage.setItem("username", username);

    if (json.errors) {
      errorFeedback(json.errors, signinForm);
    } else {
      window.location.href = `profile/index.html?id=${username}`;
    }
  } catch (error) {
    console.error(error);
  }
}

function getLoginData(event) {
  event.preventDefault();
  const email = document.getElementById("inputEmail").value;
  const password = document.getElementById("inputPassword").value;

  const userToLogin = {
    email,
    password,
  };

  const existingError = document.querySelector(".error");
  if (existingError) {
    existingError.remove();
  }

  loginUser(loginURL, userToLogin);
}

signinForm.addEventListener("submit", getLoginData);
