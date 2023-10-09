export function createPostListHTML(twist) {
  try {
    const postListContainer = document.getElementById("post-list-container");
    const twistText = twist.body;
    const twistTag = twist.tags[0].charAt(0).toUpperCase() + twist.tags[0].slice(1);
    const twistId = twist.id;

    let username;
    if (twist.author) {
      username = twist.author.name;
    } else {
      username = localStorage.getItem("username");
    }

    const divRow = document.createElement("div");
    divRow.classList.add("row", "mt-4", "mx-1");
    postListContainer.append(divRow);

    const divCard = document.createElement("a");
    divCard.classList.add("card");
    divCard.href = `../post-details/index.html?id=${twistId}`;
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
    anchorTag.href = `../profile/index.html?id=${username}`;
    anchorTag.textContent = username;
    spanUser.append(anchorTag);

    const heading = document.querySelector("h1").innerText;
    if (heading === localStorage.getItem("username")) {
      const hrLine = document.createElement("hr");
      hrLine.classList.add("hr-line");
      divCardBody.append(hrLine);

      const divOptionRow = document.createElement("div");
      divOptionRow.classList.add("d-flex", "justify-content-end");
      divCardBody.append(divOptionRow);

      const deleteButton = document.createElement("a");
      deleteButton.classList.add("fw-bold", "me-4");
      deleteButton.innerText = "Delete";
      deleteButton.addEventListener("click", () => deletePost(twist.id));
      divOptionRow.append(deleteButton);

      const editButton = document.createElement("a");
      editButton.classList.add("fw-bold");
      editButton.innerText = "Edit";
      editButton.addEventListener("click", () => openEditModal(twist));
      divOptionRow.append(editButton);
    }
  } catch (error) {
    console.error(error);
    // blogListContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
  }
}
