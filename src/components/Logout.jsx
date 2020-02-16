import { removeToken } from "../services/authServices";

const Logout = () => {
  removeToken();
  window.location = "/login";
};

export default Logout;
