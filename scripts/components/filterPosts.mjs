import { createPostListHTML } from "./createPostList.mjs";

export function filterPosts(filterOption, twists) {
  const postListContainer = document.getElementById("post-list-container");
  postListContainer.innerHTML = "";

  twists.forEach((twist) => {
    const twistText = twist.body.toLowerCase();

    if (filterOption === "All" || twist.tags[0].toLowerCase() === filterOption.toLowerCase() || filterOption === "" || twistText.includes(filterOption)) {
      createPostListHTML(twist);
    }
  });
}
