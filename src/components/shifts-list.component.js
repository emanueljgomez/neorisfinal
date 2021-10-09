import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Single shift component to display in the list
const Shift = (props) => (
  <tr>
    <td>{props.shift.username}</td>
    <td>{props.shift.date.substring(0, 10)}</td>
    <td>{props.shift.duration}</td>
    <td>{props.shift.description}</td>
    <td>
      <Link to={"/edit/" + props.shift._id}>Editar</Link> |{" "}
      <Link
        to={"/"}
        onClick={() => {
          props.deleteShift(props.shift._id);
        }}
      >
        Borrar
      </Link>
    </td>
  </tr>
);

// Shift list container component
export default class ShiftsList extends Component {
  constructor(props) {
    super(props);

    this.deleteShift = this.deleteShift.bind(this);
    this.state = { shifts: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/shifts/")
      .then((response) => {
        this.setState({ shifts: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteShift(id) {
    axios
      .delete("http://localhost:5000/shifts/" + id)
      .then((res) => console.log(res.data));

    // 'Filter' searches and returns all the elements
    // that does not contain a matching ID for deletion
    // '_id' is the way Atlas database displays it
    this.setState({
      shifts: this.state.shifts.filter((el) => el._id !== id),
    });

    alert("Turno borrado.");
  }

  shiftsList() {
    return this.state.shifts.map((currentshift) => {
      return (
        <Shift
          shift={currentshift}
          deleteShift={this.deleteShift}
          key={currentshift._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Lista de Turnos Asignados</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Recurso</th>
              <th>Día</th>
              <th>Turno</th>
              <th>Comentario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{this.shiftsList()}</tbody>
        </table>
      </div>
    );
  }
}
