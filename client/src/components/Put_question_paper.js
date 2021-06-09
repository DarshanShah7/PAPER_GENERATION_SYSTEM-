import React, { Component } from 'react'

import Put_question from './Put_question';

class Put_question_paper extends Component {
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
                    return (<Put_question question = {question}/>   
                    )
                }) 
                }
        
            </div>
        )
    }
}

export default Put_question_paper;