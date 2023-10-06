import { fetchWithToken } from "./components/doFetch.mjs";
import { createPostListHTML } from "./components/createPostList.mjs";

import { profilesURL } from "./constants.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const UserId = params.get("id");

const userProfileURL = profilesURL + "/" + UserId;
const userPostsURL = userProfileURL + "/posts";

const profileName = document.getElementById("profile-name");
const feedListName = document.getElementById("feed-list-name");
profileName.innerText = UserId;
feedListName.innerText = UserId;

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
    console.log(twist);
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
