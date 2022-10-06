import React, { useContext } from "react";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import icon from "../assets/icon.png"
import { UserContext } from "../context/useContext";
import { Dropdown, Image, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import beans from "../assets/beans.png";
import { IoLogOut } from "react-icons/io5";

export default function NavAdmin() {
  const [state, dispatch] = useContext(UserContext);

  const beans1 = <Image src={beans} width="15" height="15" />;
  let navigate = useNavigate();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  return (
    <div>
      <Container>
        <Navbar fixed="top d-flex bg-white justify-content-between shadow">
          <NavbarBrand className="ms-5">
            <Link to={"/transaction"}>
              <img src={icon} style={{ maxWidth: "150px" }} alt="logobrand" />
            </Link>
          </NavbarBrand>
          <Nav>
            <Nav.Link className="align-item-center justify-content-center me-5 pe-5 fw-bolder text-primer">
              <div style={{ display:"flex", marginRight:"40px"}}>
              <AiFillGithub style={{width:"35" , height:"35"}}/>
              <NavDropdown 
              // title={profilToggle}
              >
                <Dropdown.Item className="text-danger">
                  <Link
                    to="/add-product"
                    className="text-primer text-decoration-none"
                  >
                    {beans1}
                    <span className="text-primer"> Add Product</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="text-danger">
                  <Link
                    to="/list-product"
                    className="text-primer text-decoration-none"
                  >
                    {beans1}
                    <span className="text-primer"> List Product</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="text-primer">
                <IoLogOut className="text-danger" style={{width:"20px",height:"30px"}}/>
                  <span className="text-primer" onClick={logout}>
                    {" "}
                    Logout
                  </span>
                </Dropdown.Item>
              </NavDropdown>
              </div>
            </Nav.Link>
          </Nav>
        </Navbar>
      </Container>
    </div>
  );
}
