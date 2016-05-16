import React , { Component } from 'react';
import { connect } from 'react-redux';

import PlayerRow from '../../components/radial-chart/player-row';

class PlayerTable extends Component{

  renderPlayerTable(){
    return this.props.players.map((player) => {
      return (
        <tr key={player.Key}>
          <td>{player.Name}</td>
          <td>{player.Team}</td>
          <td>{player.Position}</td>
        </tr>
      )
    });
  }

  render() {
    return(
      <table className="table table-hover table-margin">
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

export default connect(mapStateToProps)(PlayerTable);
