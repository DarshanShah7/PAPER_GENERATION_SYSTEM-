import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import axios from "axios";
import { data } from "jquery";

class Chart extends Component {
  constructor(props) {
    super(props);
    axios.post('http://localhost:5000/analysis', { user: this.props.match.params.user, paper_id: this.props.match.params.paper_id })
      .then(async (res) => {
        console.log(res.data)
        console.log("inside axios")

        let Data = {
          labels: [
            "Your score",
            "Highest score",
            "average score",
            "Lowest score"

            // "Shantanu",
            // "Kunal",
            // "Vishwajit",
          ],
          datasets: [
            {
              label: "Attempt summary",
              data: [res.data.total, res.data.max, res.data.avg, res.data.min],
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                // "rgba(54, 162, 235, 0.6)",
                // "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                // "rgba(255, 99, 132, 0.6)",
              ],
            },
          ],
        }

        let Data_pie = {
          labels: [
            "Single Correct answer",
            "Multiple Correct answer",
            "Numerical answer"
            // "Lowest score"

            // "Shantanu",
            // "Kunal",
            // "Vishwajit",
          ],
          datasets: [
            {
              label: "Category-wise analysis",
              data: [res.data.total_sc,res.data.total_mc,res.data.total_n],
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                // "rgba(75, 192, 192, 0.6)",
                // "rgba(153, 102, 255, 0.6)",
                // "rgba(255, 159, 64, 0.6)",
                // "rgba(255, 99, 132, 0.6)",
              ],
            },
          ],
        }

        this.setState({chartData:Data ,chartData_pie:Data_pie ,load_paper: true })

      }).catch((error) => {
        console.log(error)
      });



    this.state = {
      chartData:"",
      chartData_pie:"",
      load_paper: false
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
  };

  render() {
    return (
      <div className="chart" style={{width:"800px"}}>
        <Tabs
          defaultActiveKey="Attempt summary"
          transition={false}
          id="noanim-tab-example"
          className="mb-3"
        >
          <Tab eventKey="Attempt summary" title="Attempt summary">
            <Bar
              data={this.state.chartData}
              //   width={0.1}
              //   height={0.5}
              options={{
                title: {
                  display: this.props.displayTitle,
                  text: "Largest Cities In " + this.props.location,
                  fontSize: 25,
                },
                indexAxis: "y",
                // maintainAspectRatio: false,
                legend: {
                  display: this.props.displayLegend,
                  position: this.props.legendPosition,
                },
                responsive: true,
              }}
            />
            {/* <Sonnet /> */}
          </Tab>
          <Tab eventKey="profile" title="Profile">
            <Line
              data={this.state.chartData}
              options={{
                title: {
                  display: this.props.displayTitle,
                  text: "Largest Cities In " + this.props.location,
                  fontSize: 25,
                },
                legend: {
                  display: this.props.displayLegend,
                  position: this.props.legendPosition,
                },
              }}
            />
            {/* <Sonnet /> */}
          </Tab>
          <Tab eventKey="Category analysis" title="Category analysis">
          <div  style={{width:"400px"}}>
            <Pie
              data={this.state.chartData_pie}
              options={{
                title: {
                  display: this.props.displayTitle,
                  text: "Largest Cities In " + this.props.location,
                  fontSize: 25,
                },
                legend: {
                  display: this.props.displayLegend,
                  position: this.props.legendPosition,
                },
              }}
            />
          </div>
            {/* <Sonnet /> */}
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Chart;
