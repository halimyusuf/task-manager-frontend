import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
class SideNav extends Component {
  state = {};

  myAccFunc() {
    let x = document.getElementById("demoAcc");
    if (x.className.indexOf("w3-show") === -1) {
      x.className += " w3-show";
      x.previousElementSibling.className += " w3-green";
    } else {
      x.className = x.className.replace(" w3-show", "");
      x.previousElementSibling.className = x.previousElementSibling.className.replace(
        " w3-green",
        ""
      );
    }
  }

  myDropFunc() {
    let x = document.getElementById("demoDrop");
    if (x.className.indexOf("w3-show") === -1) {
      x.className += " w3-show";
      x.previousElementSibling.className += " w3-green";
    } else {
      x.className = x.className.replace(" w3-show", "");
      x.previousElementSibling.className = x.previousElementSibling.className.replace(
        " w3-green",
        ""
      );
    }
  }
  render() {
    const { user } = this.props;
    return (
      <div>
        <div
          className="w3-sidebar w3-bar-block w3-light-grey w3-card"
          style={{ width: "160px", position: "fixed", top: "0" }}
        >
          <div className="w3-dropdown-click">
            <button className="w3-button" onClick={this.myDropFunc}>
              Projects <i className="fa fa-caret-down"></i>
            </button>
            <div
              id="demoDrop"
              className="w3-dropdown-content w3-bar-block w3-white w3-card"
            >
              {user.isAdmin && (
                <Link to="/project/new" className="w3-bar-item w3-button">
                  New Project
                </Link>
              )}
              <Link to="/" className="w3-bar-item w3-button">
                All Projects
              </Link>
              <Link to="/my-projects" className="w3-bar-item w3-button">
                My Projects
              </Link>
            </div>
          </div>

          <Link to="/users" className="w3-bar-item w3-button">
            Users
          </Link>

          <Link to="" className="w3-button" onClick={Logout}>
            Logout
          </Link>
        </div>
      </div>
    );
  }
}

export default SideNav;
