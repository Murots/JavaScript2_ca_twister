import { fetchWithToken } from "./components/doFetch.mjs";
import { createPostListHTML } from "./components/createPostList.mjs";
import { filterPosts } from "./components/filterPosts.mjs";

import { handlePostsWithAuthorURL } from "./constants.mjs";

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

  const filteredTwisterPosts = await getPostsWithToken(handlePostsWithAuthorURL);

  filterPosts(selectedOption, filteredTwisterPosts);
});

const searchField = document.getElementById("search-field");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", async () => {
  const searchQuery = searchField.value.toLowerCase();
  const filteredTwisterPosts = await getPostsWithToken(handlePostsWithAuthorURL);

  filterPosts(searchQuery, filteredTwisterPosts);
});

// function filterPosts(searchQuery) {
//   const postListContainer = document.getElementById("post-list-container");
//   postListContainer.innerHTML = "";

//   twists.forEach((twist) => {
//     const twistText = twist.body.toLowerCase();

//     if (searchQuery === "" || twistText.includes(searchQuery)) {
//       createPostListHTML(twist);
//     }
//   });
// }

// filterPosts("");

async function getPostsWithToken(url) {
  try {
    const json = await fetchWithToken(url);
    const filteredTwisterPosts = json.filter((index) => index.title === "TwisterApp");
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
    const filteredTwisterPosts = await getPostsWithToken(handlePostsWithAuthorURL);
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
  const title = "TwisterApp";
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

  savePost(handlePostsWithAuthorURL, dataToPost);
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
