import { removeToken } from '../services/authServices';

const Logout = () => {
  // removes token from local storage
  removeToken();
  window.location.reload();
  // window.location = "/";
};

export default Logout;
