/**
 * Perform a fetch request with an access token.
 *
 * @param {string} url
 * @param {string} method
 * @param {object|array} data
 * @returns {Promise}
 * @example
 * ```js
 * getPostsWithToken(url);
 * ```
 */
export async function fetchWithToken(url, method = "GET", data = null) {
  const token = localStorage.getItem("accessToken");
  const fetchOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (data) {
    fetchOptions.body = JSON.stringify(data);
  }

  const response = await fetch(url, fetchOptions);

  return response.json();
}
