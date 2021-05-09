import React, { Component } from 'react';
import './question.css'

class Question extends Component {
    constructor() {
        super();
        this.state = {
            value: 'Single-Correct'
        };

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <div>
                <form>
                    <div className="question-paramters">

                        <div className="question-paramters-1" >
                            <label htmlFor="difficulty">Difficulty</label>
                            <select className="form-select" aria-label="Default select example" name="difficulty-level" id="difficulty" >
                                {/* {true && <option value="Easy">Easy1</option>} */}

                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                        <br />
                        <div className="question-paramters-1" >
                            <label htmlFor="Marks">Marks</label>
                            <select className="form-select" aria-label="Default select example" name="marks" id="Marks" >
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <br />
                        <div className="question-paramters-1" >
                            <label htmlFor="Question-type">Question-type</label>
                            <select className="form-select" aria-label="Default select example" onChange={this.handleChange} name="Question-type" id="Question-type" >

                                <option value="Single-Correct">Single-Correct</option>
                                <option value="Multiple-Correct">Multiple-Correct</option>
                                <option value="Numerical">Numerical</option>

                            </select>
                        </div>
                        <br />


                    </div>
                    <div className="question1" >

                        <label htmlFor="question">Question</label>
                        <textarea name="Question" id="questionid" cols="60" rows="3" ></textarea>
                    </div>
                    {this.state.value === "Single-Correct" && <div className="answers"  >
                        <br />
                        <div id="single-correct" >

                            <label htmlFor="option-a">Option-A</label>
                            <textarea name="Option-A" id="single-correct-option-a" cols="60" rows="1" className="SingleCorrectOptions"></textarea>
                            <br />
                            <label htmlFor="option-b">Option-B</label>
                            <textarea name="Option-B" id="single-correct-option-b" cols="60" rows="1" className="SingleCorrectOptions"></textarea>
                            <br />
                            <label htmlFor="option-c">Option-C</label>
                            <textarea name="Option-C" id="single-correct-option-c" cols="60" rows="1" className="SingleCorrectOptions"></textarea>
                            <br />

                            <label htmlFor="option-d">Option-D</label>
                            <textarea name="Option-D" id="single-correct-option-d" cols="60" rows="1" className="SingleCorrectOptions"></textarea>
                            <br />
                            <label htmlFor="answer">Answer</label>
                            <select className="form-select" aria-label="Default select example" id="single-correct-answer" >

                                <option value="1">Option A</option>
                                <option value="2">Option B</option>
                                <option value="3">Option C</option>
                                <option value="4">Option D</option>

                            </select>
                            <br />
                        </div>
                    </div>


                    }
                    {this.state.value === "Multiple-Correct" && <div id="multiple-correct" >
                        <label htmlFor="multiple-correct-option-a">Option-A</label>
                        <textarea name="multiple-correct-Option-A" id="multiple-correct-option-a" cols="60" rows="1"
                            className="MultipleCorrectOptions"></textarea>
                        <br />
                        <label htmlFor="multiple-correct-option-b">Option-B</label>
                        <textarea name="multiple-correct-Option-B" id="multiple-correct-option-b" cols="60" rows="1"
                            className="MultipleCorrectOptions"></textarea>
                        <br />
                        <label htmlFor="multiple-correct-option-c">Option-C</label>
                        <textarea name="multiple-correct-Option-C" id="multiple-correct-option-c" cols="60" rows="1"
                            className="MultipleCorrectOptions"></textarea>
                        <br />

                        <label htmlFor="multiple-correct-option-d">Option-D</label>
                        <textarea name="multiple-correct-Option-D" id="multiple-correct-option-d" cols="60" rows="1"
                            className="MultipleCorrectOptions"></textarea>
                        <br />
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="op1" />
                            <label className="form-check-label" htmlFor="op1">
                                Option-A
                    </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="op2" />
                            <label className="form-check-label" htmlFor="op2">
                                Option-B
                    </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="op3" />
                            <label className="form-check-label" htmlFor="op3">
                                Option-C
                    </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="op4" />
                            <label className="form-check-label" htmlFor="op4">
                                Option-D
                    </label>
                        </div>
                    </div>
                    }

                    {this.state.value === "Numerical" &&
                        <div id="numericals"  >
                            <label htmlFor="numerical-ans">Answer</label>
                            <textarea name="numerical-Answer" id="numerical-ans" cols="20" rows="1" ></textarea>
                        </div>
                    }
                </form>
            </div>
        )
    }
}

export default Question;
