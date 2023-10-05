const apiBaseURL = "https://api.noroff.dev/api/v1";

const endpointRegisterURL = "/social/auth/register";
const endpointLoginURL = "/social/auth/login";
const endpointHandlePost = "/social/posts";
const endpointWithAutor = "?_author=true";

export const registerURL = apiBaseURL + endpointRegisterURL;
export const loginURL = apiBaseURL + endpointLoginURL;
export const handlePostURL = apiBaseURL + endpointHandlePost + endpointWithAutor;
