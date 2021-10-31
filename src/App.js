import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";

export default function App() {

  const [fileContent, setFileContent] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const fileReader = new FileReader();
    fileReader.readAsText(data.file[0], "UTF-8");
    fileReader.onload = e => {
      console.log(e.target.result);
      setFileContent(e.target.result);
    }
  } 

  return (
    <div className="App">
      <Container>
        <Row>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Choose a File</Form.Label>
            <Form.Control type="file" accept=".json"{...register("file", {required: true})}/>
            {errors.file && <span style={{color: "red"}}>Please select a File</span>}
          </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
        </Row>
        <Row>
          <h3>Uploaded File Content:</h3>
        </Row>
        <Row>
          <div style={{whiteSpace: "pre-wrap"}}>
            {fileContent}
          </div>            
        </Row>
      </Container>
    </div>
  );
}
