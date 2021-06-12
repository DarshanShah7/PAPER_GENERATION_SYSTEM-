import React, { Component } from 'react'
import axios from 'axios';

import PutQuestion from './Put_question';

class PutQuestionPaper extends Component {
    constructor(props){
        super(props)
        // console.log(this.props.question)
    }
    paper_questions = [{
        "question": "q1 The characteristics of strain gauge is defined by",
        "marks": "1",
        "difficulty": "Easy",
        "questiontype": "Single-Correct",
        "a": "Poisson’s ratio",
        "b": "Young’s modulus",
        "c": "Gauge factor",
        "d": "Change in applied temperature",
        "ans": "3"
    }]
    

    componentDidMount(){
        axios.post('http://localhost:5000/login/paper', {paper_name:"paper1"})
            .then(async (res) => {
                console.log("mongo")
                // console.log(res.data)
                this.paper_questions.push(...res.data.SingleCorrect)
                this.paper_questions.push(...res.data.MultipleCorrect)
                this.paper_questions.push(...res.data.Numerical)
                console.log(this.paper_questions)
            }).catch((error) => {
                console.log(error)
            });
    }

    render() {
        return (
            <div>

                {
                    this.props.question.map((question)=>{
                    console.log("question");
                    return (<PutQuestion question = {question}/>   
                    )
                }) 
                }
        
            </div>
        )
    }
}

export default PutQuestionPaper;