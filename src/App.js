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

  //https://stackoverflow.com/questions/44656610/download-a-string-as-txt-file-in-react/44661948
  const handleSave = (e) => {
    e.preventDefault();
    const element = document.createElement("a");
    const file = new Blob([fileContent], {type: "text/json"});
    element.href = URL.createObjectURL(file);
    element.download = "export.json";
    document.body.appendChild(element); //Required for this to work in FireFox
    element.click();
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
        <Row>
          <Button onClick={handleSave}>Save File</Button>
        </Row>
      </Container>
    </div>
  );
}
