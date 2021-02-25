import React, { Component } from "react";
import { Link } from "react-router";
import { NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class HoverDropdown extends Component {
  constructor() {
    super();
    this.state = { isOpen: false };
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    var component = (
      <NavDropdown
        title={this.props.title}
        onMouseEnter={this.handleOpen}
        onMouseLeave={this.handleClose}
        show={this.state.isOpen}
        href={this.props.to}
      >
        {this.props.children}
      </NavDropdown>
    );

    // Conditionally add link if address is provided
    if (this.props.to) {
      component = (
        <Link to={this.props.to} className={this.props.to}>
          {component}
        </Link>
      );
    }
    return component;
  }
}

export default HoverDropdown;
