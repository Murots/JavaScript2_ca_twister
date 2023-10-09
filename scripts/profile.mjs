import { fetchWithToken } from "./components/doFetch.mjs";
import { createPostListHTML } from "./components/createPostList.mjs";

import { profilesURL } from "./constants.mjs";
import { endpointWithAuthorURL } from "./constants.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const userId = params.get("id");

const userProfileURL = profilesURL + "/" + userId;
const userPostsURL = userProfileURL + "/posts" + endpointWithAuthorURL;

const profileName = document.getElementById("profile-name");
const feedListName = document.getElementById("feed-list-name");
const title = document.querySelector("title");
profileName.innerText = userId;
title.innerText = userId + " | Twister";

async function createProfileImage(profileAvatar) {
  console.log(profileAvatar);

  const profileImageContainer = document.getElementById("profile-img-container");
  const profileImage = document.createElement("img");
  profileImage.classList.add("img-fluid", "rounded-circle", "profile-picture", "profile-img");
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

fetchAvatar(profilesURL);

if (userId === localStorage.getItem("username")) {
  document.getElementById("follow-button").style.display = "none";
  document.getElementById("avatar-button").style.display = "block";
  feedListName.innerText = "Your posts";
} else {
  document.getElementById("follow-button").style.display = "block";
  document.getElementById("avatar-button").style.display = "none";
  feedListName.innerText = userId + "'s posts";
}

async function getPostsWithToken(url) {
  try {
    const userPosts = await fetchWithToken(url);
    return userPosts;
  } catch (error) {
    console.error(error);
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
    const loaderDiv = document.querySelector(".loader");
    loaderDiv.remove();
  } catch (error) {
    console.error(error);
    // blogListContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
  }
}

main();
