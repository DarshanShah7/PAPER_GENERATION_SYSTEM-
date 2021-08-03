import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import PutQuestion from "./Put_question";
import { Redirect } from "react-router-dom";
import QuestionPanel from "./questionPanel.jsx";
import Webcam from "react-webcam";
class PutQuestionPaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load_paper: false,
      count: 0,
      redirect: false,
    };
    this.set_user_answers = this.set_user_answers.bind(this);
    this.set_count = this.set_count.bind(this);
    this.SubmitPaper = this.SubmitPaper.bind(this);
    // console.log(this.props.question)
  }
  // question_panel = []
  paper_questions = [];
  user_answers = [];
  componentDidUpdate() {
    this.index = 0;
    // console.log(this.user_answers)
  }
  componentDidMount() {
    axios
      .post("http://localhost:5000/login/paper", {
        paper_id: this.props.match.params.paper_id,
      })
      .then(async (res) => {
        // console.log(res.data)
        this.paper_questions.push(...res.data.SingleCorrect);
        this.paper_questions.push(...res.data.MultipleCorrect);
        this.paper_questions.push(...res.data.Numerical);
        this.user_answers = new Array(this.paper_questions.length);
        // console.log(this.user_answers)
        this.question_panel = new Array(this.user_answers.length).fill(
          "danger"
        );
        // console.log(this.question_panel)
        this.setState({ load_paper: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlerCopy(e) {
    e.preventDefault(); // must prevent the current event
    e.nativeEvent.stopImmediatePropagation();

    alert("Don't try to copy text!");
  }

  handleclick(e) {
    // e.preventDefault(); // must prevent the current event
    // e.nativeEvent.stopImmediatePropagation();
    // alert('opening menu not allowed on this page');
  }

  set_count(c) {
    // console.log(this.question_panel)
    this.setState({ count: c, load_paper: true });
    // console.log(this.state.count)
  }

  set_user_answers(answer, number) {
    // console.log("dddddddddd")
    if (answer) this.question_panel[number] = "success";
    this.user_answers[number] = answer;
  }

  SubmitPaper() {
    let totalmarks = 0;
    for (let i = 0; i < this.user_answers.length; i++) {
      if (this.user_answers[i] === undefined) continue;
      if (this.paper_questions[i].questiontype === "Multiple-Correct") {
        if (
          this.user_answers[i].a.toString() == this.paper_questions[i].ans.a &&
          this.user_answers[i].b.toString() == this.paper_questions[i].ans.b &&
          this.user_answers[i].c.toString() == this.paper_questions[i].ans.c &&
          this.user_answers[i].d.toString() == this.paper_questions[i].ans.d
        )
          totalmarks += parseInt(this.paper_questions[i].marks, 10);
      } else {
        if (this.user_answers[i] == this.paper_questions[i].ans)
          totalmarks += parseInt(this.paper_questions[i].marks, 10);
      }
    }
    axios
      .post("http://localhost:5000/store_marks", {
        username: this.props.match.params.user,
        paper_id: this.props.match.params.paper_id,
        marks: totalmarks,
      })
      .then(async (res) => {
        console.log(res.data);
        console.log("inside axios");
        // this.setState({ load_paper: true })
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({ redirect: true });
    console.log(totalmarks);
  }

  videoConstraints = {
    width: 300,
    height: 200,
    facingMode: "user",
  };
  setRef = (webcam) => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    console.log(imageSrc);
    axios
      .post("http://localhost:5000/save_image", {
        user: this.props.match.params.user,
        paper_id: this.props.match.params.paper_id,
        img: imageSrc,
      })
      .then(async (res) => {
        console.log(res.data);
        console.log("inside axios");
        // this.setState({ load_paper: true })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        {this.state.redirect && (
          <Redirect to={"/student/" + this.props.match.params.user} />
        )}

        <div
          style={{ display: "flex", margin: "auto" }}
          onContextMenu={this.handleclick}
          onCopy={this.handlerCopy}
        >
          {this.state.load_paper && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ margin: "20px" }}>
                <QuestionPanel set_count={this.set_count} />
              </div>
              <div style={{ margin: "20px" }}>
                <Webcam
                  audio={false}
                  height={200}
                  ref={this.setRef}
                  screenshotFormat="image/jpeg"
                  width={300}
                  videoConstraints={this.videoConstraints}
                />
                <div>
                  <button onClick={this.capture}>Capture photo</button>
                </div>
              </div>
            </div>
          )}
          {/* {console.log("rerender")} */}
          <div
            style={{
              margin: "auto",
              paddingInline: "25px",
              top: "50%",
              position: "relative",
            }}
          >
            {this.state.load_paper && (
              <div style={{ margin: "auto" }}>
                <PutQuestion
                  number={this.state.count}
                  answer={this.user_answers[this.state.count]}
                  set_answer={this.set_user_answers}
                  question={this.paper_questions[this.state.count]}
                />
              </div>
            )}
            <div style={{ margin: "auto", padding: "10px" }}>
              <Button
                disabled={this.state.count === 0}
                variant="secondary"
                onClick={() => this.set_count(this.state.count - 1)}
                style={{ marginRight: "10px", borderRadius: "10px" }}
              >
                Previous
              </Button>
              <Button
                disabled={this.state.count === this.paper_questions.length - 1}
                variant="primary"
                onClick={() => this.set_count(this.state.count + 1)}
                style={{ marginRight: "10px", borderRadius: "10px" }}
              >
                Next
              </Button>
              <Button
                variant="warning"
                onClick={this.SubmitPaper}
                style={{ marginRight: "10px", borderRadius: "10px" }}
              >
                Submit
              </Button>
            </div>
            {/* <div>
                    {this.index = 0}
                    {this.state.load_paper &&
                        
                        this.paper_questions.map((question, i) => {
                            // this.index = this.index+1   
                            console.log(i)
                            // console.log(this.index)     
                            return (<PutQuestion number={i} question={question} />
                            )
                        })
                    }
                </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default PutQuestionPaper;
