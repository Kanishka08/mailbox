import React from "react";
import "./InboxPage.css";
import { Container, Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import InboxList from "./InboxList";
import InboxNavbar from "./InboxNavbar";
import { getmailHandler } from "../../store/Mail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const InboxPage = () => {
  const Disptach = useDispatch();
  useEffect(() => {
    Disptach(getmailHandler());
  }, []);
  return (
    <>
      <InboxNavbar></InboxNavbar>
      <Container fluid>
        <Row style={{ height: "600px" }}>
          <Col xs={2} className=" bg-info" variant="primary">
            <ListGroup className="p-2" as="ul">
              <ListGroup.Item className="m-1 bg-" action>
                Compose
              </ListGroup.Item>
              <ListGroup.Item className="m-1 bg-" action>
                inbox
              </ListGroup.Item>
              <ListGroup.Item className="m-1" action>
                sendMail
              </ListGroup.Item>
              <ListGroup.Item className="m-1" action>
                DraftBox
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col xs={10} className="">
            <InboxList></InboxList>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default InboxPage;