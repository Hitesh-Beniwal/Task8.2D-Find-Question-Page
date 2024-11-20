import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'; 

function Navbar() {
  return (
    <div className="navbar">
     
      <div className="navbar-left">
        Dev@Deakin
      </div>

      
      <div className="navbar-right">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/find-questions">
          Find Questions
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
