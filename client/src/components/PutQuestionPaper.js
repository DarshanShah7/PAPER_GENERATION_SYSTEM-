import React, { Component } from 'react'
import axios from 'axios';

import PutQuestion from './Put_question';
import QuestionPanel from './questionPanel.jsx';

class PutQuestionPaper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            load_paper: false
        }
        
        // console.log(this.props.question)
    }

    paper_questions = []
    componentDidUpdate(){
        this.index = 0
    }
    componentDidMount() {

        axios.post('http://localhost:5000/login/paper', { paper_name: "paper1" })
            .then(async (res) => {
                // console.log(res.data)
                this.paper_questions.push(...res.data.SingleCorrect)
                this.paper_questions.push(...res.data.MultipleCorrect)
                this.paper_questions.push(...res.data.Numerical)
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
   

    render() {
        return (
            <div style={{ display: "flex" }} onContextMenu={this.handleclick} onCopy={this.handlerCopy}>
                {this.state.load_paper && 
                <div >{ console.log(this.paper_questions)}
                    <QuestionPanel />
                </div>
                }
                <div>
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
                </div>

            </div>
        )
    }
}

export default PutQuestionPaper;