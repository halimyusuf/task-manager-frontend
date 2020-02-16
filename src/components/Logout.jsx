import { removeToken } from "../services/authServices";

const Logout = () => {
  removeToken();
  this.props.history.push("/");
};

export default Logout;
