export function selectPlayer(player){
  //selectPlayer is an ActionCreator, it needs to return an action,
  //an object with a type propetry.
  return{
    type: 'PLAYER_SELECTED',
    payload: player
  };
}
