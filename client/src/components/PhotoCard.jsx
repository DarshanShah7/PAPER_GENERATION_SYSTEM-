import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from 'axios';

// import { registerCallbackConstructor } from "@tensorflow/tfjs";
class PhotoCard extends Component {
  state = {};
  constructor(props) {
      super(props);
      this.state = {
        load_paper: false,
      }

      this.array=[]
      axios.get('http://localhost:5000/image')
            .then(async (res) => {
                this.array = res.data
                console.log(res.data)
                this.setState({load_paper:true})

            }).catch((error) => {
                console.log(error)
            });
      // console.log("ccccccccccccccccccccccc")
    }
    render() {

    

    return (
      <div style={{ margin: "auto" }}>
        <Row
          xs={1}
          md={3}
          className="g-4"
          style={{ width: "1000px", margin: "auto" }}
        >
          {this.array.map((obj, idx) => (
            
            <Col style={{ marginBottom: "25px" }}>
              <Card bg={obj.flag==true?"danger":"light"} >
                {/* {console.log(obj.time.match(/\d\d:\d\d/)[0])} */}
                <Card.Img
                  variant="top"
                  src={"data:image/jpeg;base64,"+obj.image}
                  style={{ height: "200px", width: "300px" }}
                />
                <Card.Body style={{ width: "300px" }}>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text >
                    {console.log(obj.flag)}
                    user : {obj.details.user} 
                    <br></br>
                    paper : {obj.details.paper_id}
                    <br></br>
                    time : {obj.time.match(/\d\d:\d\d/)[0]}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default PhotoCard;
