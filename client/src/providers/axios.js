import axios from 'axios';

export const setAxiosHeaders = (accessToken) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${accessToken}`,
  };
};

export default axios;
