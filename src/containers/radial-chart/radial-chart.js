import React, { Component } from 'react';
import { connect } from 'react-redux';
var RadarChart = require("react-chartjs").Radar;
import {bindActionCreators} from 'redux';
import { selectPlayer } from '../../actions/radial-chart/radial-chart-actions';

class RadialChart extends Component{

  render(){

    var options = {
      scale: {
          reverse: true,
          ticks: {
              beginAtZero: true
          }
      },
      //showTooltips: false,
      scaleOverride: true,
      scaleSteps: 5,
      scaleStepWidth: 20,
      scaleStartValue: 0,
      responsive: true,
      tooltipTemplate: "",
      tooltipFillColor: "rgba(0,0,0,0.3)",
      multiTooltipTemplate: "<%= value %>%"
    }

    if(this.props.activePlayers.length === 0){

      //the chart doesn't render without a data set
      //so we're passing it a hacky ghost data set
      var emptyDataSet = {
        label: "",
        fillColor: "rgba(220,220,220,0.0)",
        strokeColor: "rgba(220,220,220,0)",
        pointColor: "rgba(220,220,220,0)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [0, 0, 0, 0, 0, 0]
      }

      var data = {
        labels: ["Points", "Threes", "Assists", "Steals", "Blocks", "Rebounds"],
        datasets: [emptyDataSet]
      };

      return(
        <div>
          <RadarChart redraw data={data} options={options} height="278" width="400"/>
        </div>
      );

    }else{

      var dataSet = [];

      this.props.activePlayers.map((player) => {
        //lets construct our player data set
        var playerStats = [
          Math.round(player.Points*100),
          Math.round(player.Threes*100),
          Math.round(player.Assists*100),
          Math.round(player.Steals*100),
          Math.round(player.Blocks*100),
          Math.round(player.Rebounds*100)
        ]


        var thisPlayerData = {
          label: player.Name,
          fillColor: player.rgbOpaque,
          strokeColor: player.Color,
          pointColor: player.Color,
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: player.Color,
          data: playerStats
        }

        dataSet.push(thisPlayerData);

      });

      var data = {
        labels: ["Points", "Threes", "Assists", "Steals", "Blocks", "Rebounds"],
        datasets: dataSet
      }

      return(
        <div>
          <RadarChart redraw data={data} options={options} height="278" width="400"/>
        </div>
      );

    }

  }

}

function mapStateToProps(state){
  return{
    activePlayers: state.activePlayers
  };
}

//anything returned from this function will end up
//as props on the PlayerTable container
function mapDispatchtoProps(dispatch){
  //whenever selectPlayer is called, the result should be passed
  //to all of our reducers
  return bindActionCreators({ selectPlayer : selectPlayer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchtoProps)(RadialChart);
