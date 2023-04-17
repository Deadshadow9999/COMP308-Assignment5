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

  useEffect(() => {
    loadModel();
  }, []);

  const answerQuestion = async (e) => {
    e.preventDefault();
    console.log("AQ called");
    if (model !== null) {
      console.log("Question submitted.");
      const passage = passageRef.current.value;
      const question = questionRef.current.value;
      const answers = await model.findAnswers(question, passage);
      setAnswer(answers);
      console.log(answers);
    }
  };

  return (
    <div className="App">
      {model == null ? (
        <div>
          <img src={loading} alt="loading"></img>
          <div>Model Loading</div>
        </div>
      ) : (
        <div>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Text Passage</Form.Label>
              <Form.Control as="textarea" rows={12} ref={passageRef} />
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
            answers:{" "}
            {answer
              ? answer.map((ans, idx) => (
                  <div>
                    <b>Answer {idx + 1}: = </b>
                    {ans.text} 
                    <br/>Score: {ans.score}
                  </div>
                ))
              : ""}
          </p>
        </div>
        // <Fragment>
        //   passage
        //   <textarea ref={passageRef} rows="30" cols="100"></textarea>
        //   Ask a question
        //   <input
        //     ref={questionRef}
        //     onKeyPress={answerQuestion}
        //     size="80"
        //   ></input>
        //   answers
        //   {answer
        //     ? answer.map((ans, idx) => (
        //         <div>
        //           <b>Answer{idx + 1} = </b>
        //           {ans.text} {ans.score}
        //         </div>
        //       ))
        //     : ""}
        // </Fragment>
      )}
    </div>
  );
}

export default App;
