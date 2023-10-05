import { fetchWithToken } from "./components/doFetch.mjs";
import { handlePostURL } from "./constants.mjs";

async function getPostsWithToken(url) {
  try {
    const json = await fetchWithToken(url);
    const filteredTwisterPosts = json.filter((index) => index.title === "TwisterApp");
    return filteredTwisterPosts;
  } catch (error) {
    console.error(error);
  }
}

async function createPostListHTML(twist) {
  try {
    const feed = document.getElementById("feed");
    const twistText = twist.body;
    const twistTag = twist.tags[0].charAt(0).toUpperCase() + twist.tags[0].slice(1);
    const username = twist.author.name;

    const divRow = document.createElement("div");
    divRow.classList.add("row", "mt-4", "mx-1");
    feed.append(divRow);

    const divCard = document.createElement("div");
    divCard.classList.add("card");
    divRow.append(divCard);

    const divCardBody = document.createElement("div");
    divCardBody.classList.add("card-body", "text-start");
    divCard.append(divCardBody);

    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerText = twistText;
    divCardBody.append(cardText);

    const spanContainer = document.createElement("div");
    spanContainer.classList.add("d-flex", "justify-content-between", "align-items-center");
    divCardBody.append(spanContainer);

    const spanTag = document.createElement("span");
    spanTag.classList.add("badge", "bg-success");
    spanTag.innerText = twistTag;
    spanContainer.append(spanTag);

    const spanUser = document.createElement("span");
    spanUser.classList.add("text-muted");
    spanUser.textContent = "Posted by: ";
    spanContainer.append(spanUser);

    const anchorTag = document.createElement("a");
    anchorTag.href = "../profile/index.html";
    anchorTag.textContent = username;
    spanUser.append(anchorTag);
  } catch (error) {
    console.error(error);
    // blogListContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
  }
}

function createPostsHTML(twists) {
  twists.forEach((twist) => {
    createPostListHTML(twist);
  });
}

async function main() {
  try {
    const filteredTwisterPosts = await getPostsWithToken(handlePostURL);
    createPostsHTML(filteredTwisterPosts);

    // const loaderDiv = document.querySelector(".loader");
    // loaderDiv.remove();
  } catch (error) {
    console.error(error);
    // blogListContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
  }
}

main();

// import { handlePostURL } from "./constants.mjs";

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

  savePost(handlePostURL, dataToPost);
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
