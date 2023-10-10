import { fetchWithToken } from "./components/doFetch.mjs";
import { createPostListHTML } from "./components/createPostList.mjs";
import { filterPosts } from "./components/filterPosts.mjs";

import { handlePostsWithAuthorURL } from "./constants.mjs";
import { endpointSortByTitle } from "./constants.mjs";

const allPostsByTitle = handlePostsWithAuthorURL + "&" + endpointSortByTitle;

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
    console.log(json);
    const filteredTwisterPosts = json.filter((index) => index.title === "zzzzzzzzzzTwisterApp");
    console.log(filteredTwisterPosts);
    return filteredTwisterPosts;
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
    const filteredTwisterPosts = await getPostsWithToken(allPostsByTitle);
    console.log(filteredTwisterPosts);
    createPostsHTML(filteredTwisterPosts);
    const loaderDiv = document.querySelector(".loader");
    loaderDiv.remove();
  } catch (error) {
    console.error(error);
    // blogListContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
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
