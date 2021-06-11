import React, { Component } from 'react'

import PutQuestion from './Put_question';

class PutQuestionPaper extends Component {
    constructor(props){
        super(props)
        console.log(this.props.question)
    }
    render() {
        return (
            <div>
                {
                    // <Put_question question = {this.props.question[0]}/>
                
                    this.props.question.map((question)=>{
                    console.log(question);
                    return (<PutQuestion question = {question}/>   
                    )
                }) 
                }
        
            </div>
        )
    }
}

export default PutQuestionPaper;