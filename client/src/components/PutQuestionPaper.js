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
        this.set_count = this.set_count.bind(this);

        // console.log(this.props.question)
    }

    paper_questions = []
    componentDidUpdate() {
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

    set_count(c) {
        
        this.setState({ count: c, load_paper: true });
        console.log(this.state.count)
    }

    render() {
        return (
            <div>
                <div>
                    <Button disabled={this.state.count===0} variant="danger" onClick={() => this.set_count(this.state.count - 1)}>
                        Previous{console.log(this.state.load_paper)}
                    </Button>
                    <Button disabled={this.state.count===this.paper_questions.length-1} variant="success" onClick={() => this.set_count(this.state.count + 1)}>
                        Next{console.log(this.state.load_paper)}
                    </Button>
                </div>
                <div style={{ display: "flex" }} onContextMenu={this.handleclick} onCopy={this.handlerCopy}>
                    {this.state.load_paper &&
                        <div>
                            <QuestionPanel set_count = {this.set_count}/>
                        </div>
                    }
                    
                    {this.state.load_paper && <PutQuestion number={this.state.count} question={this.paper_questions[this.state.count]} />}
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