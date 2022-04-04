import * as React from "react";
import { Link } from "react-router-dom";
import "./Parent.css";

const Parent = props => {
  return (
    <div className="wrapper">
      <ul className="header">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/manage"}>Manage</Link>
        </li>
        <li>
          <Link to={"/cancel"}>Cancel payment</Link>
        </li>
      </ul>
      <div>{props.children && props.children}</div>
    </div>
  );
};

export default Parent;
