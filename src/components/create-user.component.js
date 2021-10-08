import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };

    alert(`El recurso ` + user.username + ` fue creado con éxito.`);

    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data));

    this.setState({
      username: "",
    });
  }

  render() {
    return (
      <div style={{ width: 30 + "rem" }}>
        <h3 style={{ margin: 1 + "vw" }}>Alta de nuevo recurso</h3>
        <form onSubmit={this.onSubmit}>
          {/* Employee name field */}
          <div className="form-group" style={{ margin: 1 + "vw" }}>
            <label style={{ marginBottom: 0.5 + "vw" }}>
              Nombre y Apellido:
            </label>
            <input
              type="text"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          {/* Submit button */}
          <br />
          <div className="form-group" style={{ margin: 1 + "vw" }}>
            <input
              type="submit"
              value="Crear Recurso"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
