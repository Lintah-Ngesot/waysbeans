import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardImg,
  Col,
  Container,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import jumbotron from "../assets/jumbotron.png"
import ListProduct from "../components/ListProduct";
import NavbarAuth from "../components/Navbar";
import { API } from "../config/api";
import { UserContext } from "../context/useContext";

export default function LandingPages() {
  document.title = "WaysBeans";

  //modal Login
  const [show, setShow] = useState(false);
  const [state] = useContext(UserContext); //user data
  const handleClick = () => setShow(true);

  console.log(state.user);

  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });
  console.log(products);

  const [filter, setFilter] = useState("");

  let searchText = (e) => {
    setFilter(e.target.value);
  };

  let dataFilter = products?.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase())
    );
  });

  return (
    <div>
      <NavbarAuth setShow={setShow} show={show} />
      <Container className="mt-5 pt-5 container-fluid">
        <Card className="bgWhite imageHome my-4">
          <CardImg src={jumbotron} alt="landingimage" />
        </Card>
      </Container>
      <Container className="mt-5 mb-3 container-fluid">
        <Row>
          {dataFilter?.map((item, index) => (
            <Col xs={12} md={3} className="mb-2">
              <Link
                className="text-decoration-none"
                to={state.isLogin === true ? `/detail-product/${item.id}` : ""}
                onClick={state.isLogin === false ? handleClick : ""}
              >
                <ListProduct item={item} key={index} />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
