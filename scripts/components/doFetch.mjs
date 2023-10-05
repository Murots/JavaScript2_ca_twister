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
