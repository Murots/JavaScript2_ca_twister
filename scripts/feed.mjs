import { fetchWithToken } from "./components/doFetch.mjs";
import { createPostListHTML } from "./components/createPostList.mjs";
import { filterPosts } from "./components/filterPosts.mjs";
import { errorMessage } from "./components/errorMessage.mjs";

import { handlePostsWithAuthorURL } from "./constants.mjs";
import { endpointSortByTitle } from "./constants.mjs";

const allPostsByTitle = handlePostsWithAuthorURL + "&" + endpointSortByTitle;

const postListContainer = document.getElementById("post-list-container");
const loaderDiv = document.querySelector(".loader");

const userId = localStorage.getItem("username");
const divNavProfile = document.getElementById("nav-profile");
const navProfileLink = document.createElement("a");
navProfileLink.href = `../profile/index.html?id=${userId}`;
divNavProfile.append(navProfileLink);

const profileLinkText = document.createElement("h4");
profileLinkText.innerText = "Profile";
navProfileLink.append(profileLinkText);

const sortByForm = document.getElementById("sort-by-form");

sortByForm.addEventListener("change", async () => {
  const selectedOption = sortByForm.value;

  const filteredTwisterPosts = await getPostsWithToken(allPostsByTitle);

  filterPosts(selectedOption, filteredTwisterPosts);
});

const searchField = document.getElementById("search-field");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", async () => {
  const searchQuery = searchField.value.toLowerCase();
  const filteredTwisterPosts = await getPostsWithToken(allPostsByTitle);

  filterPosts(searchQuery, filteredTwisterPosts);
});

async function getPostsWithToken(url) {
  try {
    const json = await fetchWithToken(url);
    const filteredTwisterPosts = json.filter((index) => index.title === "zzzzzzzzzzTwisterApp");
    return filteredTwisterPosts;
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
    const filteredTwisterPosts = await getPostsWithToken(allPostsByTitle);
    createPostsHTML(filteredTwisterPosts);
    loaderDiv.remove();
  } catch (error) {
    console.error(error);
    loaderDiv.remove();
    postListContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
  }
}

main();

const postButton = document.getElementById("post-button");
const postText = document.getElementById("inputPostText");
postButton.disabled = true;

function updateButtonStatus() {
  if (postText.value) {
    postButton.disabled = false;
  } else {
    postButton.disabled = true;
  }
}

updateButtonStatus();

postText.addEventListener("input", updateButtonStatus);

function createPostData(event) {
  event.preventDefault();
  const title = "zzzzzzzzzzTwisterApp";
  const body = postText.value;

  let tags = ["Other"];
  const radios = document.querySelectorAll("#joke, #riddle, #quote");
  radios.forEach((radio) => {
    if (radio.checked) {
      tags = [radio.id];
    }
  });

  const dataToPost = {
    title,
    body,
    tags,
  };

  savePost(allPostsByTitle, dataToPost);
}

postButton.addEventListener("click", createPostData);

async function savePost(url, postData) {
  try {
    const json = await fetchWithToken(url, "POST", postData);
    if (json) {
      location.reload();
    }
  } catch (error) {
    console.error(error);
  }
}
