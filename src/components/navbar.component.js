import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          Turnos laborales
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Turnos
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">
                Asignar Turno
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link">
                Alta Empleado
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
