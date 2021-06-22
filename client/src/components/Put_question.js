import React, { Component } from 'react'
import './put_question.css';

class PutQuestion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            answer: this.props.answer
        }
        this.handleChange = this.handleChange.bind(this);
        this.handle_checkbox = this.handle_checkbox.bind(this);
        // console.log("ccccccccccccccccccccccc")
    }

    componentDidUpdate(prevProps) {

        if (prevProps.number !== this.props.number) {
            // console.log('qqqqqqqqqqqqqqq    ')
            this.setState({ answer: this.props.answer },
                () => {
                    if (this.props.question.questiontype === "Numerical" && !this.props.answer) {
                        this.setState({ answer: "" })
                    }
                
                    if (this.props.question.questiontype === "Multiple-Correct" && this.state.answer === undefined) {
                        this.setState({ answer: { a: false, b: false, c: false, d: false } })
                    }
            })
        }
        // console.log(this.state.answer)
    }

    handleChange(e) {
        // console.log(e.target.value)
        this.setState({ answer: e.target.value }, () => {
            this.props.set_answer(this.state.answer, this.props.number);
        })
        // this.props.set_answer(this.state.answer, this.props.number)

    }

    handle_checkbox(e){
        let ans = this.state.answer
        // console.log(e.target.checked)
        if(e.target.id === "op1")
            ans.a = e.target.checked
        else if(e.target.id === "op2")
            ans.b = e.target.checked
        else if(e.target.id === "op3")
            ans.c = e.target.checked
        else if(e.target.id === "op4")
            ans.d = e.target.checked
        this.setState({answer:ans})
        this.props.set_answer(this.state.answer, this.props.number);
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
                                    <input className="form-check-input" onChange={this.handleChange} checked={this.state.answer === "1"} value="1" type="radio" name="options" id="flexRadioDefault1" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        {this.props.question.a}

                                    </label>

                                    <input className="form-check-input" onChange={this.handleChange} checked={this.state.answer === "2"} value="2" type="radio" name="options" id="flexRadioDefault2" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        {this.props.question.b}
                                    </label>

                                    <input className="form-check-input" onChange={this.handleChange} checked={this.state.answer === "3"} value="3" type="radio" name="options" id="flexRadioDefault3" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault3">
                                        {this.props.question.c}
                                    </label>

                                    <input className="form-check-input" onChange={this.handleChange} checked={this.state.answer === "4"} value="4" type="radio" name="options" id="flexRadioDefault4" />
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
                                        <input className="form-check-input"  checked={this.state.answer && this.state.answer.a} onChange={this.handle_checkbox}  type="checkbox" value="true" id="op1" />
                                        <label className="form-check-label" htmlFor="op1">
                                            {this.props.question.a}
                                            {/* {console.log(this.state.answer && this.state.answer.a)} */}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input"  checked={this.state.answer && this.state.answer.b} onChange={this.handle_checkbox}  type="checkbox" value="true" id="op2" />
                                        <label className="form-check-label" htmlFor="op2">
                                            {this.props.question.b}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input"  checked={this.state.answer && this.state.answer.c} onChange={this.handle_checkbox}  type="checkbox" value="true" id="op3" />
                                        <label className="form-check-label" htmlFor="op3">
                                            {this.props.question.c}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input"  checked={this.state.answer && this.state.answer.d} onChange={this.handle_checkbox}  type="checkbox" value="true" id="op4" />
                                        <label className="form-check-label" htmlFor="op4">
                                            {this.props.question.d}
                                        </label>
                                    </div>
                                </div>
                                    : <div id="numericals" style={{ marginTop: 20 + 'px' }}>
                                        <label htmlFor="numerical-ans">Answer</label>
                                        {/* {console.log(this.state.answer)} */}
                                        <textarea name="numerical-Answer" onChange={this.handleChange} value={this.state.answer} id="numerical-ans" cols="20" rows="1" ></textarea>
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
// { this.setState({answer.a : e.target.value}) ; this.props.set_answer(this.state.answer, this.props.number); }}
// { this.setState({answer.b : e.target.value}) ; this.props.set_answer(this.state.answer, this.props.number); }}
// { this.setState({answer.c : e.target.value}) ; this.props.set_answer(this.state.answer, this.props.number); }}
// { this.setState({answer.d : e.target.value}) ; this.props.set_answer(this.state.answer, this.props.number); }}
export default PutQuestion;