async function getRequestWithToken(url) {
  try {
    console.log(url);
    const token = localStorage.getItem("accessToken", accessToken);
    console.log(token);
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify(userData),
    };
    const response = await fetch(url, fetchOptions);
    console.log(response);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

const postsURL = base + posts;

getToken(postsURL);
