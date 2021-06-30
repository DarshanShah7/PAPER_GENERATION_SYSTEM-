import React, { Component } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import QuestionPanel from './questionPanel.jsx';
import Editquestion from './Editquestion';
import { Link } from "react-router-dom";

class Editqp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            load_paper: false,
            count: 0,
            paper_questions: []
        }
        this.user = this.props.match.params.user

        this.paper = this.props.match.params.id
        this.set_count = this.set_count.bind(this);
        this.delete_question = this.delete_question.bind(this);
    }
    paper_questions_temp = []
    user_answers = []
    componentDidUpdate() {
        this.index = 0
        // console.log(this.user_answers)
    }
    componentDidMount() {

        axios.post('http://localhost:5000/login/teacher-paper', { paper_name: this.paper })
            .then(async (res) => {
                // console.log(res.data)
                this.paper_questions_temp.push(...res.data.SingleCorrect)
                this.paper_questions_temp.push(...res.data.MultipleCorrect)
                this.paper_questions_temp.push(...res.data.Numerical)
                this.user_answers = new Array(this.paper_questions_temp.length)
                // console.log(this.user_answers)
                this.question_panel = new Array(this.user_answers.length).fill("danger")
                // console.log(this.question_panel)
                this.setState(...this.state, { paper_questions: this.paper_questions_temp, load_paper: true })

            }).catch((error) => {
                console.log(error)
            });

    }


    set_count(c) {
        // console.log(this.question_panel)
        this.setState({ count: c, load_paper: true });
        // console.log(this.state.count)
    }

    delete_question(count) {
        axios.delete('http://localhost:5000/questiondelete', { data: { name: this.paper, id: this.state.paper_questions[count]._id, questiontype: this.state.paper_questions[count].questiontype } });
        this.paper_questions_temp.splice(count, 1)
        this.setState(...this.state, { paper_questions: this.paper_questions_temp })

    }

    render() {
        return (
            <div>
                {/* {console.log(this.props.match.params.id)} */}
                <div>
                    <Link to={"/login/"+this.user+ "/"+ this.paper+"/add_questions"}>
                        <Button className="btn btn-success btn-sm m-2">add question</Button>
                    </Link>
                </div>
                <div style={{ display: "flex" }} >
                    {this.state.load_paper &&
                        <div>
                            <QuestionPanel set_count={this.set_count} />
                        </div>
                    }
                    {/* {console.log("rerender")} */}
                    {/* {this.state.load_paper && <PutQuestion number={this.state.count} answer={this.user_answers[this.state.count]} set_answer={this.set_user_answers} question={this.paper_questions[this.state.count]} />} */}
                    <div>
                        {this.index = 0}
                        {this.state.load_paper &&

                            this.state.paper_questions.map((question, i) => {
                                // this.index = this.index+1   
                                console.log(i)
                                // console.log(this.index)     
                                return (<Editquestion delete_question={this.delete_question} number={i} question={question} />
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        )
    }
}

export default Editqp;