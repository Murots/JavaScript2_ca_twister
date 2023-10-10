import { createPostListHTML } from "./createPostList.mjs";

/**
 * Filters and displays a list of posts based on the selected filter option.
 * @param {string} filterOption
 * @param {array} twists
 * @returns {void}
 * @example
 * // Filter posts by tag "Joke"
 * filterPosts("Joke", posts);
 */
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
