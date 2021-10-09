import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateShift extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      duration: "",
      description: "",
      date: new Date(),
      users: [],
      shiftDays: [],
      shiftNumbers: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/users/")

      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
            username: response.data[0].username,
          });
        }
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDuration() {
    let select = document.getElementById("shift_number");

    this.setState({
      duration: select.options[select.selectedIndex].value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const shift = {
      username: this.state.username,
      date: this.state.date,
      duration: this.state.duration,
      description: this.state.description,
    };

    if (shift.duration === "") {
      shift.duration = "1";
      axios
        .post("http://localhost:5000/shifts/add", shift)
        .then((res) => console.log(res.data));
    } else {
      axios
        .post("http://localhost:5000/shifts/add", shift)
        .then((res) => console.log(res.data));
    }

    alert(
      `\n[ NUEVO TURNO ASIGNADO ]\n` +
        `\nRECURSO: ` +
        shift.username +
        `\n\nDÍA: ` +
        shift.date +
        `\n\nTURNO NRO: ` +
        shift.duration
    );

    //window.location = "/";
  }

  render() {
    return (
      <div style={{ width: 30 + "rem" }}>
        <h3 style={{ margin: 1 + "vw" }}>Asignar nuevo turno laboral</h3>

        <form onSubmit={this.onSubmit}>
          {/* User selection dropdown menu */}
          <div className="form-group" style={{ margin: 1 + "vw" }}>
            <label style={{ marginBottom: 0.5 + "vw" }}>
              Seleccionar recurso:
            </label>
            <select
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {/* Mapped users array retrieved from MongoDB Atlas */}
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Calendar for date selection */}
          <div className="form-group" style={{ margin: 1 + "vw" }}>
            <label style={{ marginBottom: 0.5 + "vw" }}>Día de trabajo:</label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          {/* Shift selection dropdown menu */}
          <div className="form-group" style={{ margin: 1 + "vw" }}>
            <label style={{ marginBottom: 0.5 + "vw" }}>
              Seleccionar turno de trabajo:
            </label>
            <select
              required
              id="shift_number"
              className="form-control"
              onChange={this.onChangeDuration}
            >
              <option value="1">Turno 1 [06:00 a 14:00 hs]</option>
              <option value="2">Turno 2 [14:00 a 22:00 hs]</option>
              <option value="3">Turno 3 [22:00 a 06:00 hs]</option>
            </select>
          </div>

          {/* Description input field */}
          <div className="form-group" style={{ margin: 1 + "vw" }}>
            <label style={{ marginBottom: 0.5 + "vw" }}>Comentario:</label>
            <input
              required
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>

          {/* Submit button */}
          <br />
          <div className="form-group" style={{ margin: 1 + "vw" }}>
            <input
              type="submit"
              value="Asignar Turno"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
