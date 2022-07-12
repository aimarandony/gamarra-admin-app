import React from "react";
import { NavLink } from "react-router-dom";
import { HomeOutlined, ShopOutlined, LogoutOutlined } from '@ant-design/icons'

import Logo from '../images/Logo.svg'
import Profile from '../images/Profile.png'
import './Sidebar.css'

export default function Navbar({ auth, setAuth }) {

  const logout = () => {
    localStorage.removeItem("user");
    setAuth(false);
  };

  return (
    <div className="navbar" style={display(auth)}>
      <div className="c-image">
        <img src={Logo} className="logo" alt="Logo GAMARRA" />
      </div>
      <div className="c-user">
        <img src={Profile} className="user-img" alt="User" />
        <div className="user-data">
          <h2 className="name">Antonio Rivas,</h2>
          <h6 className="role">Administrador</h6>
        </div>
      </div>
      <ul>
        <li className="nav-item">
          <NavLink activeClassName="active" to="/inicio">
            <HomeOutlined />
            <span className="name">Inicio</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeClassName="active" to="/producto">
            <ShopOutlined />
            <span className="name">Productos</span>
          </NavLink>
        </li>
      </ul>
      <button className="btn-logout" onClick={logout}>
        <LogoutOutlined/>
        <span className="content">CERRAR SESIÖN</span>
      </button>
    </div>
  );
}

function display(auth) {
  return {
    display: auth ? "block" : "none",
  };
}
