import React, { Component } from 'react'
import './put_question.css';

class PutQuestion extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.number)
    }
    render() {
        return (
            <div id={"question".concat(this.props.number)}>
                {console.log(this.props.key)}
                
                <div className="question">
                    <div className="subquestion">
                        <p />Question1
                        <p />marks = {this.props.question.marks}
                        <p />difficulty = {this.props.question.difficulty}
                    </div>
                    <div className="subquestion">
                        <p />{this.props.question.question}
                        {
                            (this.props.question.questiontype === "Single-Correct" ?
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="options" id="flexRadioDefault1" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        {this.props.question.a}
                                    </label>

                                    <input className="form-check-input" type="radio" name="options" id="flexRadioDefault2" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        {this.props.question.b}
                                    </label>

                                    <input className="form-check-input" type="radio" name="options" id="flexRadioDefault3" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault3">
                                        {this.props.question.c}
                                    </label>

                                    <input className="form-check-input" type="radio" name="options" id="flexRadioDefault4" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault4">
                                        {this.props.question.d}
                                    </label>

                                </div>
                                : (this.props.question.questiontype === "Multiple-Correct" ? <div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="true" id="op1" />
                                        <label className="form-check-label" htmlFor="op1">
                                            {this.props.question.a}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="true" id="op2" />
                                        <label className="form-check-label" htmlFor="op2">
                                            {this.props.question.b}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="true" id="op3" />
                                        <label className="form-check-label" htmlFor="op3">
                                            {this.props.question.c}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="true" id="op4" />
                                        <label className="form-check-label" htmlFor="op4">
                                            {this.props.question.d}
                                        </label>
                                    </div>
                                </div>
                        : <div id="numericals"  style={{marginTop:20+'px'}}>
                        <label htmlFor="numerical-ans">Answer</label>
                        <textarea name="numerical-Answer" onChange={(e) => this.Numerical.ans = e.target.value} id="numerical-ans" cols="20" rows="1" ></textarea>
                    </div>
                     )
                        )

                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default PutQuestion;