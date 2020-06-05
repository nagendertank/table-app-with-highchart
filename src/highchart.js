import React from "react";
import { render } from "react-dom";
import HighchartsReact from "highcharts-react-official";
// Import Highcharts
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more";
highchartsMore(Highcharts);


export default class HighchartsComponent extends React.PureComponent {
  constructor(props) {
    console.log(props)
    super(props);
    this.afterChartCreated = this.afterChartCreated.bind(this);
    this.state = {
      chartOptions: {
        chart: {
            type: 'columnrange',
            inverted: true,
            height:"100px"
        },
        title: {
            text: ''
        },
        xAxis: {
            visible:false,
            labels: {
                enabled: false
            }
        },

        yAxis: {
            visible:false,
            labels: {
                enabled: false
            }
        },
        plotOptions: {
            columnrange: {
                dataLabels: {
                    enabled: true,
                    format: '{y}'
                }
            }
        },
    
        series: [{
            showInLegend: false,
            data: [
               props.value
            ]
        }]
      }
    };
  }

  afterChartCreated(chart) {
    this.internalChart = chart;
    this.forceUpdate();
  }

  componentDidUpdate() {
    //this.internalChart.getMargins(); // redraw
    this.internalChart.reflow();
  }

  render() {
    const chart = this.internalChart,
      customLabels = [];


    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={this.state.chartOptions}
          callback={this.afterChartCreated}
        />
        {customLabels}
      </div>
    );
  }
}

