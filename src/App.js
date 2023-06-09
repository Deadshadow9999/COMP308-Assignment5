import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import loading from "./102-wifi-solid.gif"
import bookGif from "./19-book-solid.gif"
import "./App.css";
import { useEffect, useState, useRef } from "react";
import { Fragment } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function App() {
  const passageRef = useRef(null);
  const questionRef = useRef(null);
  const [answer, setAnswer] = useState("");
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
    <div id="background" className="App">
      <table className="center">
        <tr>
      <th><img src={bookGif} alt="book gif"></img></th>
      <th><h1>COMP308 - Assignment 5</h1></th>
      </tr>
      </table>
      {model == null ? (
        <div>
          <img src={loading} alt="loading"></img>
          <div>Loading Model... Please wait</div>
        </div>
      ) : (
        <div>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label><b>Text Passage</b></Form.Label>
              <Form.Control as="textarea" required placeholder="Enter a passage" rows={12} ref={passageRef} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label><b>Ask a question</b></Form.Label>
              <Form.Control
                type="text"
                placeholder="Type in a question"
                required
                ref={questionRef}
              />
            </Form.Group>
            <Button variant="primary" size="lg" onClick={answerQuestion}>
              Submit Question
            </Button>
          </Form>
          <p>
            <br></br>
            <label><b>Answer:{" "}</b></label>
            {answer ? (
        <div>
          <br></br>
          <b>{answer[0].text}</b> 
        </div>
      ) : (
        ''
      )}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
