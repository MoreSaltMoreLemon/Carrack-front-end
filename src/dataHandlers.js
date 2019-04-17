import { httpRequestJWT } from './helpers'
import { parse, stringify } from 'flatted/esm'
import { GAMES_URL, BASE_URL } from './ENV'

function exportTurn (gameObj, turn, jwt) {
  // Stringify gameObj.
  // Combine JSON and turn into one object.
  // Post resource creation during "new game".
  // Put to new_turn route.
  console.log(parse(stringify(gameObj)))
}

function importTurn (turn, jwt) {
  // Fetch request to server.
  // Check to see if a new turn exists. (wait with interval)
  // If new turn, pulls down data.
  // Parses result.
  // Translate data into new Ship and new Carrack.

  console.log('import turn')
  instantiateTurn()
}

// function createGame(player_id, jwt) { 
//   console.log(player_id, jwt)
//   const activeGamesURL = BASE_URL + '/game/create'
//   httpRequestJWT(activeGamesURL, 'post', jwt, { game: { player_id }})
//     .then(r => r.json())
//     .then(console.log)
// }


function createGame (player_id, opponent_id, jwt) {
  const activeGamesURL = BASE_URL + '/game/create'
  httpRequestJWT(activeGamesURL, 'post', jwt, { game: { player_id, opponent_id }})
    .then(r => r.json())
    .then(console.log)
}

function instantiateTurn () {
  // Accept standard turn format.
  // Translate data into Carrack and Ship objects.
  // Returns result for further processing on server.

  console.log('instantiate turn')
}

function availableTurn(id, turn, jwt) {}

function winGame(jwt) {}

function exitGame(jwt) {}

function activeGames(jwt) {
  const activeGamesURL = BASE_URL + '/game/active_games'
  return httpRequestJWT(activeGamesURL, 'get', jwt)
}

function availablePlayers(jwt) {
  const activeGamesURL = BASE_URL + '/player/available_players'
  return httpRequestJWT(activeGamesURL, 'get', jwt)
}


export { 
  importTurn, 
  exportTurn, 
  createGame,
  // joinGame, 
  winGame, 
  exitGame, 
  activeGames, 
  availablePlayers 
}