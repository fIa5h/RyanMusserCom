// State argument is not application state, only the state
// this reducer is responsible for
export default function( state = [] , action ){

  switch (action.type) {
    case 'PLAYER_SELECTED':
      //let's add the player to active players
      // console.log('line 8 active player reducer');
      // console.log(state);
      return state.concat(action.payload)
  }

  return state;

}
