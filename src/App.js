import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import loading from "./loading_symbol.gif";
import "./App.css";
import { useEffect, useState, useRef } from "react";
import { Fragment } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function App() {
  const passageRef = useRef(null);
  const questionRef = useRef(null);
  const [answer, setAnswer] = useState();
  const [model, setModel] = useState(null);

  const loadModel = async () => {
    const loadedModel = await qna.load();
    setModel(loadedModel);
    console.log("Model loaded");
  };

  const answerQuestion = async (e) => {
    e.preventDefault();
    console.log("Submit requested");
    if (model !== null) {
      console.log("Question submitted.");
      const passage = passageRef.current.value;
      const question = questionRef.current.value;
      const answers = await model.findAnswers(question, passage);
      setAnswer(answers);
      console.log(answers);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  return (
    <div className="App">
      <h1>COMP308 - Assignment 5</h1>
      {model == null ? (
        <div>
          <img src={loading} alt="loading"></img>
          <div>Loading Model... Please waitl</div>
        </div>
      ) : (
        <div>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Text Passage</Form.Label>
              <Form.Control as="textarea" placeholder="Enter a passage" rows={12} ref={passageRef} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ask a question</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type in a question"
                ref={questionRef}
              />
            </Form.Group>
            <Button variant="primary" size="lg" onClick={answerQuestion}>
              Submit Question
            </Button>
          </Form>
          <p>
            <label><b>Answer:{" "}</b></label>
            <b>{answer[0].text}</b>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
