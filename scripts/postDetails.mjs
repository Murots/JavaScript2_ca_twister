import { fetchWithToken } from "./components/doFetch.mjs";
import { createPostListHTML } from "./components/createPostList.mjs";

import { handlePostsURL } from "./constants.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postId = params.get("id");
const userId = localStorage.getItem("username");

const handlePostById = handlePostsURL + "/" + postId;

const divNavProfile = document.getElementById("nav-profile");
const navProfileLink = document.createElement("a");
navProfileLink.href = `../profile/index.html?id=${userId}`;
divNavProfile.append(navProfileLink);

const profileLinkText = document.createElement("h4");
profileLinkText.innerText = "Profile";
navProfileLink.append(profileLinkText);

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
  deleteButton.classList.add("fw-bold", "me-2", "text-only-button");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", () => deletePostWarning(userPost.id, editContainer, deleteButton, editButton));
  divOptionRow.append(deleteButton);

  const editButton = document.createElement("button");
  editButton.classList.add("fw-bold", "ms-2", "text-only-button");
  editButton.innerText = "Edit";
  editButton.addEventListener("click", () => openEditModal(userPost, editContainer, deleteButton, editButton));
  divOptionRow.append(editButton);

  const hrLine = document.createElement("hr");
  hrLine.classList.add("hr-line");
  editContainer.append(hrLine);
}

function deletePostWarning(twistId, container, deleteButton, editButton) {
  deleteButton.disabled = true;
  editButton.disabled = true;

  const deleteMessage = document.createElement("p");
  deleteMessage.classList.add("mt-4", "mb-1");
  deleteMessage.innerText = "Are you sure you want to delete this Twist?";
  container.append(deleteMessage);

  const divDeleteOptionRow = document.createElement("div");
  divDeleteOptionRow.classList.add("d-flex", "justify-content-center");
  container.append(divDeleteOptionRow);

  const yesButton = document.createElement("button");
  yesButton.classList.add("fw-bold", "me-2", "text-only-button");
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
  noButton.classList.add("fw-bold", "ms-2", "text-only-button");
  noButton.innerText = "NO";
  noButton.addEventListener("click", () => {
    noButton.remove();
    yesButton.remove();
    deleteMessage.remove();
    divDeleteOptionRow.remove();
    deleteButton.disabled = false;
    editButton.disabled = false;
  });
  divDeleteOptionRow.append(noButton);
}

function openEditModal(twist, container, deleteButton, editButton) {
  deleteButton.disabled = true;
  editButton.disabled = true;

  const updateMessage = document.createElement("p");
  updateMessage.classList.add("mt-4", "mb-2");
  updateMessage.innerText = "Please update your Twist:";
  container.append(updateMessage);

  const updateForm = document.createElement("textarea");
  updateForm.classList.add("form-control", "mb-2");
  updateForm.value = twist.body;
  container.append(updateForm);

  const divUpdateRow = document.createElement("div");
  divUpdateRow.classList.add("d-flex", "justify-content-center");
  container.append(divUpdateRow);

  const updateButton = document.createElement("button");
  updateButton.classList.add("fw-bold", "me-2", "text-only-button");
  updateButton.innerText = "UPDATE";
  updateButton.addEventListener("click", async (event) => {
    try {
      event.preventDefault();
      const title = "zzzzzzzzzzTwisterApp";
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

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("fw-bold", "ms-2", "text-only-button");
  cancelButton.innerText = "CANCEL";
  cancelButton.addEventListener("click", () => {
    updateMessage.remove();
    updateForm.remove();
    divUpdateRow.remove();
    cancelButton.remove();
    updateButton.remove();
    deleteButton.disabled = false;
    editButton.disabled = false;
  });
  divUpdateRow.append(cancelButton);
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
