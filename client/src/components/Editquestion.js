import React, { Component } from 'react'
import './Put_question.css';
import Button from 'react-bootstrap/Button';

class Editquestion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            answer: this.props.answer
        }

    }

    render() {
        return (
            <div id={"question".concat(this.props.number)}>

                {/* {console.log("rendering chi;d")} */}
                <div className="question">
                    <div className="subquestion">
                        <p />Question{this.props.number + 1}
                        <p />marks = {this.props.question.marks}
                        <p />difficulty = {this.props.question.difficulty}
                    </div>
                    <div className="subquestion">
                        <p />{this.props.question.question}
                        {
                            (this.props.question.questiontype === "Single-Correct" ?
                                <div className="form-check" >
                                    <input className="form-check-input" disabled={true} value="1" type="radio" name="options" id="flexRadioDefault1" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        {this.props.question.a}

                                    </label>

                                    <input className="form-check-input" disabled={true} value="2" type="radio" name="options" id="flexRadioDefault2" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        {this.props.question.b}
                                    </label>

                                    <input className="form-check-input" disabled={true} value="3" type="radio" name="options" id="flexRadioDefault3" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault3">
                                        {this.props.question.c}
                                    </label>

                                    <input className="form-check-input" disabled={true} value="4" type="radio" name="options" id="flexRadioDefault4" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault4">
                                        {this.props.question.d}
                                        {/* {console.log(this.state.answer + "hihiui")} */}
                                    </label>
                                    {/*                                     
                                        <input type="radio" value="1" name="options" /> {this.props.question.a}
                                        <input type="radio" value="2" name="options" /> {this.props.question.b}
                                        <input type="radio" value="3" name="options" /> {this.props.question.c}
                                        <input type="radio" value="4" name="options" /> {this.props.question.d} */}

                                </div>
                                : (this.props.question.questiontype === "Multiple-Correct" ? <div>
                                    <div className="form-check">
                                        <input className="form-check-input" disabled={true} type="checkbox" value="true" id="op1" />
                                        <label className="form-check-label" htmlFor="op1">
                                            {this.props.question.a}
                                            {/* {console.log(this.state.answer && this.state.answer.a)} */}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" disabled={true} type="checkbox" value="true" id="op2" />
                                        <label className="form-check-label" htmlFor="op2">
                                            {this.props.question.b}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" disabled={true} type="checkbox" value="true" id="op3" />
                                        <label className="form-check-label" htmlFor="op3">
                                            {this.props.question.c}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" disabled={true} type="checkbox" value="true" id="op4" />
                                        <label className="form-check-label" htmlFor="op4">
                                            {this.props.question.d}
                                        </label>
                                    </div>
                                </div>
                                    : <div id="numericals" style={{ marginTop: 20 + 'px' }}>
                                        <label htmlFor="numerical-ans">Answer</label>
                                        <textarea name="numerical-Answer" disabled={true} value={this.state.answer} id="numerical-ans" cols="20" rows="1" ></textarea>
                                    </div>
                                )
                            )

                        }
                    </div>
               
                <div>
                    <Button onClick = {()=>this.props.delete_question(this.props.number)} variant="danger" >
                        Delete
                    </Button>
                </div>
                </div>
            </div>
        )
    }
}
export default Editquestion;