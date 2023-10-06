const apiBaseURL = "https://api.noroff.dev/api/v1";

const endpointRegisterURL = "/social/auth/register";
const endpointLoginURL = "/social/auth/login";
const endpointHandlePostsURL = "/social/posts";
const endpointWithAutorURL = "?_author=true";
const endpointProfilesURL = "/social/profiles";

export const registerURL = apiBaseURL + endpointRegisterURL;
export const loginURL = apiBaseURL + endpointLoginURL;
export const handlePostsURL = apiBaseURL + endpointHandlePostsURL + endpointWithAutorURL;
export const profilesURL = apiBaseURL + endpointProfilesURL;
