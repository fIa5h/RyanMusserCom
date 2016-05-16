import { combineReducers } from 'redux';
import PlayerReducer from './reducer-players';

const RootReducer = combineReducers({
  players: PlayerReducer
});

export default RootReducer;
