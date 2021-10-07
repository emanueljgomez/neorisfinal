import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ShiftsList from "./components/shifts-list.component";
import EditShifts from "./components/edit-shifts.component";
import CreateShift from "./components/create-shift.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ShiftsList} />
        <Route path="/edit/:id" component={EditShifts} />
        <Route path="/create" component={CreateShift} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
