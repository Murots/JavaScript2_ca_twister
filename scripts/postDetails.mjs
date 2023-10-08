import { fetchWithToken } from "./components/doFetch.mjs";
import { createPostListHTML } from "./components/createPostList.mjs";

import { handlePostsURL } from "./constants.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postId = params.get("id");
const userId = localStorage.getItem("username");

const handlePostById = handlePostsURL + "/" + postId;

async function getPostWithToken(url) {
  try {
    const userPost = await fetchWithToken(url);
    return userPost;
  } catch (error) {
    console.error(error);
  }
}

function createDetailsContent(userPost) {
  console.log(userPost);
  const postDetailsHeading = document.getElementById("post-name");
  const postTag = userPost.tags[0].charAt(0).toUpperCase() + userPost.tags[0].slice(1);
  postDetailsHeading.innerText = postTag + " by you";

  const editContainer = document.getElementById("edit-container");

  const timeRow = document.createElement("div");
  timeRow.classList.add("d-flex", "justify-content-center");
  editContainer.append(timeRow);

  const updated = document.createElement("p");
  updated.classList.add("time-and-date");
  const updatedDate = new Date(userPost.updated);
  const newUpdatedFormat = updatedDate.toLocaleString();
  updated.innerText = "Updated: " + newUpdatedFormat;
  timeRow.append(updated);

  const divOptionRow = document.createElement("div");
  divOptionRow.classList.add("d-flex", "justify-content-center");
  editContainer.append(divOptionRow);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("fw-bold", "me-4", "text-only-button");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", () => deletePostWarning(userPost.id, editContainer, deleteButton, editButton));
  divOptionRow.append(deleteButton);

  const editButton = document.createElement("button");
  editButton.classList.add("fw-bold", "text-only-button");
  editButton.innerText = "Edit";
  editButton.addEventListener("click", () => openEditModal(userPost, editContainer));
  divOptionRow.append(editButton);

  const hrLine = document.createElement("hr");
  hrLine.classList.add("hr-line");
  editContainer.append(hrLine);
}

function deletePostWarning(twistId, container, deleteButton, editButton) {
  deleteButton.disabled = true;
  editButton.disabled = true;
  const deleteMessage = document.createElement("p");
  deleteMessage.classList.add("mt-3", "mb-1");
  deleteMessage.innerText = "Are you sure you want to delete this Twist?";
  container.append(deleteMessage);

  const divDeleteOptionRow = document.createElement("div");
  divDeleteOptionRow.classList.add("d-flex", "justify-content-center");
  container.append(divDeleteOptionRow);

  const yesButton = document.createElement("button");
  yesButton.classList.add("fw-bold", "me-4", "text-only-button");
  yesButton.innerText = "YES";
  yesButton.addEventListener("click", async () => {
    try {
      await fetchWithToken(handlePostsURL + "/" + twistId, "DELETE");
      window.location.href = `../profile/index.html?id=${userId}`;
    } catch (error) {
      console.error(error);
    }
  });
  divDeleteOptionRow.append(yesButton);

  const noButton = document.createElement("button");
  noButton.classList.add("fw-bold", "text-only-button");
  noButton.innerText = "NO";
  noButton.addEventListener("click", () => {
    noButton.remove();
    yesButton.remove();
    deleteMessage.remove();
    deleteButton.disabled = false;
    editButton.disabled = false;
  });
  divDeleteOptionRow.append(noButton);
}

function openEditModal(twist, container) {
  const updateMessage = document.createElement("p");
  updateMessage.classList.add("mt-3", "mb-2");
  updateMessage.innerText = "Please update your Twist:";
  container.append(updateMessage);

  const updateForm = document.createElement("textarea");
  updateForm.classList.add("form-control");
  updateForm.value = twist.body;
  container.append(updateForm);

  const divUpdateRow = document.createElement("div");
  divUpdateRow.classList.add("d-flex", "justify-content-center");
  container.append(divUpdateRow);

  const updateButton = document.createElement("button");
  updateButton.classList.add("fw-bold", "me-4", "text-only-button");
  updateButton.innerText = "UPDATE";
  updateButton.addEventListener("click", async (event) => {
    try {
      event.preventDefault();
      const title = "TwisterApp";
      const body = updateForm.value;
      const tags = twist.tags;

      const dataToPost = {
        title,
        body,
        tags,
      };

      await fetchWithToken(handlePostsURL + "/" + twist.id, "PUT", dataToPost);
      window.location.href = `../profile/index.html?id=${userId}`;
    } catch (error) {
      console.error(error);
    }
  });
  divUpdateRow.append(updateButton);

  // const noButton = document.createElement("button");
  // noButton.classList.add("fw-bold", "text-only-button");
  // noButton.innerText = "NO";
  // noButton.addEventListener("click", () => {
  //   noButton.remove();
  //   yesButton.remove();
  //   deleteMessage.remove();
  //   deleteButton.disabled = false;
  //   editButton.disabled = false;
  // });
  // divDeleteOptionRow.append(noButton);
}

async function main() {
  try {
    const userPost = await getPostWithToken(handlePostById);

    createPostListHTML(userPost);
    createDetailsContent(userPost);

    const loaderDiv = document.querySelector(".loader");
    loaderDiv.remove();
  } catch (error) {
    console.error(error);
    // blogListContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
  }
}

main();

// const userProfileURL = profilesURL + "/" + userId;
// const userPostsURL = userProfileURL + "/posts";

// const profileName = document.getElementById("profile-name");
// const feedListName = document.getElementById("feed-list-name");
// const title = document.querySelector("title");
// profileName.innerText = userId;
// title.innerText = userId + " | Twister";

// if (userId === localStorage.getItem("username")) {
//   document.getElementById("follow-button").style.display = "none";
//   document.getElementById("avatar-button").style.display = "block";
//   feedListName.innerText = "Your posts";
// } else {
//   document.getElementById("follow-button").style.display = "block";
//   document.getElementById("avatar-button").style.display = "none";
//   feedListName.innerText = userId + "'s posts";
// }
