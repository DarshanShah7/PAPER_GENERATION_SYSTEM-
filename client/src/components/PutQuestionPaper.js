import React, { Component } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import PutQuestion from './Put_question';
import QuestionPanel from './questionPanel.jsx';

class PutQuestionPaper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            load_paper: false,
            count: 0
        }
        this.set_user_answers = this.set_user_answers.bind(this);
        this.set_count = this.set_count.bind(this);
        this.SubmitPaper = this.SubmitPaper.bind(this);
        // console.log(this.props.question)
    }
    // question_panel = []
    paper_questions = []
    user_answers = []
    componentDidUpdate() {
        this.index = 0
        // console.log(this.user_answers)
    }
    componentDidMount() {

        axios.post('http://localhost:5000/login/paper', { paper_name: "paper1" })
            .then(async (res) => {
                // console.log(res.data)
                this.paper_questions.push(...res.data.SingleCorrect)
                this.paper_questions.push(...res.data.MultipleCorrect)
                this.paper_questions.push(...res.data.Numerical)
                this.user_answers = new Array(this.paper_questions.length)
                // console.log(this.user_answers)
                this.question_panel = new Array(this.user_answers.length).fill("danger")
                // console.log(this.question_panel)
                this.setState({ load_paper: true })

            }).catch((error) => {
                console.log(error)
            });

    }

    handlerCopy(e) {

        e.preventDefault(); // must prevent the current event
        e.nativeEvent.stopImmediatePropagation();


        alert('Don\'t try to copy text!');
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

    set_user_answers(answer, number){
        // console.log("dddddddddd")
        if(answer)
            this.question_panel[number] = "success"
        this.user_answers[number] = answer
    }

    SubmitPaper(){
        let totalmarks = 0
        for(let i=0; i<this.user_answers.length; i++){
            if(this.user_answers[i] === undefined)
                continue;
            if(this.paper_questions[i].questiontype === "Multiple-Correct"){
                
                if(this.user_answers[i].a.toString() == this.paper_questions[i].ans.a && this.user_answers[i].b.toString()== this.paper_questions[i].ans.b && this.user_answers[i].c.toString() == this.paper_questions[i].ans.c && this.user_answers[i].d.toString() == this.paper_questions[i].ans.d)
                    totalmarks += parseInt(this.paper_questions[i].marks,10)
            }
            else{
            if(this.user_answers[i] == this.paper_questions[i].ans)
                totalmarks += parseInt(this.paper_questions[i].marks,10)
            }
        }
        
        console.log(totalmarks)

    }

    render() {
        return (
            <div>
                <div>
                    <Button disabled={this.state.count===0} variant="danger" onClick={() => this.set_count(this.state.count - 1)}>
                        Previous
                    </Button>
                    <Button disabled={this.state.count===this.paper_questions.length-1} variant="success" onClick={() => this.set_count(this.state.count + 1)}>
                        Next
                    </Button>
                    <Button variant="danger" onClick={this.SubmitPaper}>
                        Submit
                    </Button>
                </div>
                <div style={{ display: "flex" }} onContextMenu={this.handleclick} onCopy={this.handlerCopy}>
                    {this.state.load_paper &&
                        <div>
                            <QuestionPanel set_count = {this.set_count}/>
                        </div>
                    }
                    {/* {console.log("rerender")} */}
                    {this.state.load_paper && <PutQuestion number={this.state.count} answer={this.user_answers[this.state.count]} set_answer={this.set_user_answers} question={this.paper_questions[this.state.count]} />}
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
        )
    }
}

export default PutQuestionPaper;