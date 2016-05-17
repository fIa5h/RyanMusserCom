import React , { Component } from 'react';
import { connect } from 'react-redux';
import { selectPlayer } from '../../actions/radial-chart/radial-chart-actions';
import {bindActionCreators} from 'redux';

class PlayerTable extends Component{

  renderPlayerTable(){
    return this.props.players.map((player) => {
      return (
        <tr key={player.Key} className={player.Class + " player-row"} onClick={() => this.props.selectPlayer(player)}>
          <td>{player.Name}</td>
          <td>{player.Team}</td>
          <td>{player.Position}</td>
        </tr>
      )
    });
  }

  render() {
    return(
      <table className="table table-margin">
        <tbody>
          {this.renderPlayerTable()}
        </tbody>
      </table>
    )
  }

}

function mapStateToProps(state) {
  return {
    players: state.players
  };
}

//anything returned from this function will end up
//as props on the PlayerTable container
function mapDispatchtoProps(dispatch){
  //whenever selectPlayer is called, the result should be passed
  //to all of our reducers
  return bindActionCreators({ selectPlayer : selectPlayer }, dispatch);
}

//promote PlayerTable from a component to a container - it needs to know
//about this new dispatch method, selectPlayer Make it available
//as a prop
export default connect(mapStateToProps, mapDispatchtoProps)(PlayerTable);
