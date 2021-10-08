import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateShift extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  // Hardcorded test user (erase later)
  componentDidMount() {
    this.setState({
      users: ["test user"],
      username: "test user",
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const shift = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    window.location = "/";
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
              ref="userInput"
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
              ref="userInput"
              required
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            >
              <option>Turno 1 [06:00 a 14:00 hs]</option>
              <option>Turno 2 [14:00 a 22:00 hs]</option>
              <option>Turno 3 [22:00 a 06:00 hs]</option>
            </select>
          </div>

          {/* Description input field */}
          <div className="form-group" style={{ margin: 1 + "vw" }}>
            <label style={{ marginBottom: 0.5 + "vw" }}>Comentario:</label>
            <input
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
