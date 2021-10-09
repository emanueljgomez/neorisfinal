import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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

  render() {
    return (
      <div>
        <p>SHIFTS LIST COMPONENT</p>
      </div>
    );
  }
}
