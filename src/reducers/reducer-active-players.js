// State argument is not application state, only the state
// this reducer is responsible for
export default function( state = [] , action ){

  switch (action.type) {
    case 'PLAYER_SELECTED':

      if(state.length === 0){

        //return the updated state
        return [ action.payload, ...state ];

      }else{

        //let's see if the player exists in the array
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
          return [ action.payload, ...state ];
        }else{
          return [...state.slice(0, indexToRemove), ...state.slice(indexToRemove + 1)];
        }

        return state;

      }
  }

  return state;

}
