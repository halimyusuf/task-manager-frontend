import { removeToken } from "../services/authServices";

const Logout = () => {
  removeToken();
  window.location = "/";
};

export default Logout;
