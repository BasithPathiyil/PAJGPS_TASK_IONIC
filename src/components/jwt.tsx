import api from "./api";

const handleToken = (accessToken: string | null) => {
  if (accessToken) {
    // localStorage.setItem('accessToken', accessToken);
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('isAuthenticate');
    // localStorage.removeItem('user');
    delete api.defaults.headers.common.Authorization;
  }
};

// const storedAccessToken = localStorage.getItem('accessToken');
// if (storedAccessToken) {
//   api.defaults.headers.common.Authorization = storedAccessToken;
// }

export { handleToken };
