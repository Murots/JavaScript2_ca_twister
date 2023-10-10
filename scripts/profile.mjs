import { fetchWithToken } from "./components/doFetch.mjs";
import { createPostListHTML } from "./components/createPostList.mjs";
import { errorMessage } from "./components/errorMessage.mjs";

import { profilesURL } from "./constants.mjs";
import { endpointWithAuthorURL } from "./constants.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const userId = params.get("id");

const userProfileURL = profilesURL + "/" + userId;
const userPostsURL = userProfileURL + "/posts" + endpointWithAuthorURL;

const postListContainer = document.getElementById("post-list-container");
const loaderDiv = document.querySelector(".loader");

const profileName = document.getElementById("profile-name");
const feedListName = document.getElementById("feed-list-name");
const title = document.querySelector("title");
profileName.innerText = userId;
title.innerText = userId + " | Twister";

async function createProfileImage(profileAvatar) {
  const profileImageContainer = document.getElementById("profile-img-container");
  const profileImage = document.createElement("img");
  profileImage.classList.add("img-fluid", "rounded-circle", "profile-picture", "profile-img", "bg-dark");
  if (profileAvatar) {
    profileImage.src = profileAvatar;
  } else {
    profileImage.src = "../../images/Default-profile.png";
  }
  profileImageContainer.append(profileImage);
}

async function fetchAvatar(url) {
  const profile = await fetchWithToken(url);
  const profileAvatar = profile.avatar;
  createProfileImage(profileAvatar);
}

fetchAvatar(userProfileURL);

if (userId === localStorage.getItem("username")) {
  document.getElementById("follow-button").style.display = "none";
  document.getElementById("avatar-button").style.display = "block";
  document.getElementById("log-out-button").style.display = "block";
  feedListName.innerText = "Your posts";
} else {
  document.getElementById("follow-button").style.display = "block";
  document.getElementById("avatar-button").style.display = "none";
  document.getElementById("log-out-button").style.display = "block";
  feedListName.innerText = userId + "'s posts";
}

const avatarButton = document.getElementById("avatar-button");
avatarButton.addEventListener("click", () => {
  avatarButton.disabled = true;
  const profileContent = document.getElementById("profile-content");

  const divAvatarLinkRow = document.createElement("div");
  divAvatarLinkRow.classList.add("d-flex", "justify-content-center", "mt-4", "avatar-link-row");
  profileContent.append(divAvatarLinkRow);

  const avatarLinkForm = document.createElement("input");
  avatarLinkForm.classList.add("form-control", "mb-2");
  avatarLinkForm.placeholder = "Avatar-URL...";
  divAvatarLinkRow.append(avatarLinkForm);

  const goButton = document.createElement("button");
  goButton.classList.add("btn", "btn-success", "follow-btn", "rounded-end", "rounded-start", "fw-bold", "ms-2");
  goButton.innerText = "GO!";
  goButton.style.height = avatarLinkForm.offsetHeight + "px";
  goButton.addEventListener("click", async (event) => {
    try {
      event.preventDefault();
      const banner = "";
      const avatar = avatarLinkForm.value;

      const dataToPost = {
        banner,
        avatar,
      };

      await fetchWithToken(userProfileURL + "/media", "PUT", dataToPost);
      window.location.href = `../profile/index.html?id=${userId}`;
    } catch (error) {
      console.error(error);
    }
  });
  divAvatarLinkRow.append(goButton);

  const xButton = document.createElement("button");
  xButton.classList.add("btn", "btn-danger", "follow-btn", "rounded-end", "rounded-start", "fw-bold", "ms-2");
  xButton.innerText = "X";
  xButton.style.height = avatarLinkForm.offsetHeight + "px";
  xButton.addEventListener("click", async (event) => {
    event.preventDefault();
    avatarButton.disabled = false;
    divAvatarLinkRow.remove();
    avatarLinkForm.remove();
    goButton.remove();
  });
  divAvatarLinkRow.append(xButton);
});

async function getPostsWithToken(url) {
  try {
    const userPosts = await fetchWithToken(url);
    return userPosts;
  } catch (error) {
    console.error(error);
    loaderDiv.remove();
    postListContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
  }
}

function createPostsHTML(twists) {
  twists.forEach((twist) => {
    createPostListHTML(twist);
  });
}

async function main() {
  try {
    const userPosts = await getPostsWithToken(userPostsURL);
    createPostsHTML(userPosts);
    loaderDiv.remove();
  } catch (error) {
    console.error(error);
    loaderDiv.remove();
    postListContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
  }
}

main();
