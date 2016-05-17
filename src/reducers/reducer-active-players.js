// State argument is not application state, only the state
// this reducer is responsible for
export default function( state = [] , action ){

  switch (action.type) {
    case 'PLAYER_SELECTED':

      console.log('....');
      console.log('....');
      console.log('....');
      console.log('....');

      console.log('starting state');
      console.log(state);
      console.log('....');

      if(state.length === 0){

        //return the new state
        return state.concat(action.payload);

      }else{

        //let's see if the player exists in the array
        var newState = [];
        var playerExistsInArray = 0;
        var indexToRemove = 0;
        state.map(function (player, index) {
          if(action.payload.Name == player.Name){
            console.log('player found');
            playerExistsInArray = 1;
            indexToRemove = index;
          }
        });

        if(playerExistsInArray === 0){
          return state.concat(action.payload);
        }else{
          //console.log('removed player!');
          // state.splice(indexToRemove,1);
          // console.log('spliced product ^');
          // console.log(state.slice(indexToRemove,indexToRemove+1));
          // console.log('sliced product ^');
          // console.log(state);
          // console.log('updated state');
          // return state.slice(indexToRemove,indexToRemove+1);
          return [...state.slice(0, indexToRemove), ...state.slice(indexToRemove + 1)];
        }

        return state;

      }
  }

  return state;

}
