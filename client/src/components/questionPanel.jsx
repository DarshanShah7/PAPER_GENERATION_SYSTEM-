import React, { Component } from "react";
import Card from "react-bootstrap/Card";

// import "bootstrap/dist/css/bootstrap.min.css";
class QuestionPanel extends Component {
  Questions = [
    { num: 1, status: "success", key: "Q1" },
    { num: 2, status: "success", key: "Q2" },
    { num: 3, status: "danger", key: "Q3" },
    { num: 4, status: "success", key: "Q4" },
    { num: 5, status: "danger", key: "Q5" },
    { num: 6, status: "success", key: "Q6" },
    { num: 7, status: "success", key: "Q7" },
    { num: 8, status: "success", key: "Q8" },
    { num: 9, status: "danger", key: "Q9" },
    { num: 10, status: "success", key: "Q9" },
  ];
  getQuestionGird = (Questions) => {
    // const arr = [1,2,3,4,5,6,7,8,9];

    const newArr = [];
    while (Questions.length) newArr.push(Questions.splice(0, 4));
    console.log(newArr);
    return newArr;
  };
  styles = {
    width: "50px",
    height: "30px",
    fontSize: "15px",
    textAlign: "center",
    display: "block",
    borderRadius: "7px",
    margin: "2px",
  };
  render() {
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {console.log("bye")}
          {this.getQuestionGird(this.Questions).map((questionRow,i) =>(
            <div className="questionRow" style={{display:"flex" , flexDirection: "row"}}>
               {questionRow.map((question,j) => (
              <div className="questionCard"  style={{display:"flex"}}>
              <a href={"#question".concat(i+j)}>
              {/* <a onClick={this.props.set_count(i+j)}> */}

                <Card
                  bg={question.status}
                  key={i+j}
                  text="white"
                  style={this.styles}
                >
                  <div>{question.num}</div>
                </Card>
              </a>
            </div>
            )
          )}
            </div>
          ))}
          {/* {this.Questions.map((question) => (
            <div className="questionCard">
              <a href="">
                <Card
                  bg={question.status}
                  key={question.id}
                  text="white"
                  style={this.styles}
                >
                  <div>{question.num}</div>
                </Card>
              </a>
            </div>
          ))} */}
        </div>
      </div>
    );
  }
}

export default React.memo(QuestionPanel);
