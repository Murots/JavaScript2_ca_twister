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

/**
 * Retrieves posts with authentication token and filters them based on the selected option.
 * @param {string} url
 * @returns {Promise<array>}
 */
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

/**
 * Creates objects of an array
 * @param {object} posts
 * @returns {void}
 */
function createPostsHTML(twists) {
  twists.forEach((twist) => {
    createPostListHTML(twist);
  });
}

/**
 * Main function to fetch and initiate process of displaying filtered posts.
 * @returns {void}
 */
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

/**
 * Updates the button status based on the input field value.
 * @returns {void}
 */
function updateButtonStatus() {
  if (postText.value) {
    postButton.disabled = false;
  } else {
    postButton.disabled = true;
  }
}

updateButtonStatus();

postText.addEventListener("input", updateButtonStatus);

/**
 * Creates post data and saves it to the server.
 * @param {Event} event
 * @returns {void}
 */
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

/**
 * Saves a post to the server.
 * @param {string} url
 * @param {object} postData
 * @returns {void}
 * @example
 * const url = "https://example.com/api/posts";
 * const postData = { title: "My Post", body: "This is my post content", tags: ["tag1"] };
 * savePost(url, postData);
 */
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
