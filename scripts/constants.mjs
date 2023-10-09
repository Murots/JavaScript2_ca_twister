const apiBaseURL = "https://api.noroff.dev/api/v1";

const endpointRegisterURL = "/social/auth/register";
const endpointLoginURL = "/social/auth/login";
const endpointHandlePostsURL = "/social/posts";
const endpointProfilesURL = "/social/profiles";
export const endpointWithAuthorURL = "?_author=true";

export const registerURL = apiBaseURL + endpointRegisterURL;
export const loginURL = apiBaseURL + endpointLoginURL;
export const handlePostsWithAuthorURL = apiBaseURL + endpointHandlePostsURL + endpointWithAuthorURL;
export const profilesURL = apiBaseURL + endpointProfilesURL;
export const handlePostsURL = apiBaseURL + endpointHandlePostsURL;
