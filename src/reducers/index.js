import { combineReducers } from 'redux';
import PlayerReducer from './reducer-players';
import ActivePlayers from './reducer-active-players'

const RootReducer = combineReducers({
  players: PlayerReducer,
  activePlayers : ActivePlayers
});

export default RootReducer;
