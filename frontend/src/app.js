import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import Routes from "./routes";
import { Menu, Form, Input, Button } from "antd";
import Visualizations from "./pages/vis";
const { Search } = Input;

class App extends React.Component {
  formRef = React.createRef();
  render() {
    return (
      <Fragment>
        <Menu
          mode="horizontal"
          theme="light"
          style={{
            backgroundColor: "#323776",
            paddingTop: 7.5,
            paddingLeft: 40,
            paddingRight: 40,
            color: "white",
            borderBottomColor: "#323776",
          }}
        >
          <Menu.Item
            style={{ paddingBottom: 7.5 }}
            className="ant-menu-horizontal"
          >
            <Link to="/">
              <h2 style={{ fontWeight: 800, fontSize: 20, color: "white" }}>
                COVID-19 DB
              </h2>
            </Link>
          </Menu.Item>
          <Menu.Item
            style={{ paddingBottom: 7.5 }}
            className="ant-menu-horizontal"
          >
            <Link
              to="/home"
              style={{ fontWeight: "bold", fontsize: 20, color: "white" }}
            >
              Home
            </Link>
          </Menu.Item>
          <Menu.Item style={{ paddingBottom: 7.5 }}>
            <Link
              to="/about"
              style={{ fontWeight: "bold", fontsize: 20, color: "white" }}
            >
              About
            </Link>
          </Menu.Item>
          <Menu.Item style={{ paddingBottom: 7.5 }}>
            <Link
              to="/countries"
              style={{ fontWeight: "bold", fontsize: 20, color: "white" }}
            >
              Countries
            </Link>
          </Menu.Item>
          <Menu.Item style={{ paddingBottom: 7.5 }}>
            <Link
              to="/case-statistics"
              style={{ fontWeight: "bold", fontsize: 20, color: "white" }}
            >
              Cases
            </Link>
          </Menu.Item>
          <Menu.Item style={{ paddingBottom: 7.5 }}>
            <Link
              to="/risk-factor-statistics"
              style={{ fontWeight: "bold", fontsize: 20, color: "white" }}
            >
              Risks
            </Link>
          </Menu.Item>
          <Menu.Item style={{ paddingBottom: 7.5 }}>
            <Link
              to="/global-news"
              style={{ fontWeight: "bold", fontsize: 20, color: "white" }}
            >
              Global News
            </Link>
          </Menu.Item>
          <Menu.Item style={{ paddingBottom: 7.5 }}>
            <Link
              to="/vis"
              style={{ fontWeight: "bold", fontsize: 20, color: "white" }}
            >
              Visualizations
            </Link>
          </Menu.Item>
          <Menu.Item style={{ paddingBottom: 7.5 }}>
            <Link
              to="/provider-vis"
              style={{ fontWeight: "bold", fontsize: 20, color: "white" }}
            >
              Provider Visualizations
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Form
              ref={this.formRef}
              style={{ backgroundColor: "red", marginBottom: -10 }}
            >
              <Form.Item name="search" style={{ backgroundColor: "yellow" }}>
                <Search
                  placeholder="Search"
                  defaultValue=""
                  allowClear
                  onSearch={(value) => {
                    this.props.history.push("/search", { query: value });
                    this.formRef.current.resetFields();
                  }}
                  style={{ width: 200, backgroundColor: "blue" }}
                />
              </Form.Item>
            </Form>
          </Menu.Item>
        </Menu>
        <Routes />
      </Fragment>
    );
  }
}

export default withRouter(App);
