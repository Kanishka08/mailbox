import React, { useState, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./TextEditor.css";
import { useDispatch } from "react-redux";
import { sendMailHandler } from "../../store/Mail";

const TextEditor = () => {
  const Disptach = useDispatch();
  const Enteredemail = useRef(null);
  const Enteredsubject = useRef(null);
  const Enteredtext = useRef(null);
  const FormsubmitHandler = (event) => {
    event.preventDefault();
    const mailData = {
      email: Enteredemail.current.value,
      subject: Enteredsubject.current.value,
      text: Enteredtext.current.value,
    };
    Disptach(sendMailHandler(mailData));
    console.log(mailData, "TextEditing-FormsubmitHandler");
  };
  return (
    <React.Fragment>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row>
          <Col md={8}>
            <Form className="pt-5" onSubmit={FormsubmitHandler}>
              <Card style={{ width: "50rem" }} border="success">
                <Card.Header>
                  <h3>Write Mail </h3>
                </Card.Header>
                <Card.Body className="colours">
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      size="sm"
                      type="email"
                      placeholder="Enter email"
                      ref={Enteredemail}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="subject">
                    <Form.Label>subject</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter subject"
                      ref={Enteredsubject}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="message">
                    <Form.Label>message</Form.Label>
                    <Form.Control as="textarea" rows={5} ref={Enteredtext} />
                  </Form.Group>
                </Card.Body>

                <Card.Footer>
                  <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                  />
                  <Button variant="primary" type="submit">
                    Send
                  </Button>
                </Card.Footer>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};
export default TextEditor;
