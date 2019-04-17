import { httpRequestJWT, httpRequestGame } from './helpers'
import { parse, stringify } from 'flatted/esm'
import { GAMES_URL, BASE_URL } from './ENV'
import { Carrack } from './game/Carrack'

function exportTurn (gameState, jwt) {
  let game = Object.assign({}, gameState)
  const game_state = stringify(game.carrack)
  console.log("GAME_STATE", game_state)

  game.game_state = game_state
  delete game.carrack

  httpRequestJWT(`${BASE_URL}/game/export_turn`, 'PUT', jwt, game)
  .then(res => res.json())
  .then(game => {
    importTurn(game, jwt)
    console.log(game)
    // game.carrack = parse(game.game_state)
    // delete game.game_state
    // return game
  })
}

function importTurn (game, jwt) {
  // Fetch request to server.
  // Check to see if a new turn exists. (wait with interval)
  // If new turn, pulls down data.
  // Parses result.
  // Translate data into new Ship and new Carrack.

  httpRequestJWT(`${BASE_URL}/game/turn_available`, 'POST', jwt, {game: { id: game.id, turn: game.turn - 1 } })
  .then(r => r.json())
  .then(response => {
    if (response.ready) {
      const game = {game: { id: game.id } }
      console.log(game)
      httpRequestJWT(`${BASE_URL}/game/import_turn`, 'GET', jwt, game)
      .then(r => r.json())
      .then(gameJSON => {
        // const game_state = (parse(game.game_state)).game_state
    
        // game.game_state = game_state
        console.log("IMPORT TURN SAYS:", gameJSON)
        // return instantiateTurn(game)
      })
    }
  })
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
  return httpRequestJWT(activeGamesURL, 'post', jwt, { game: { player_id, opponent_id }})
    .then(r => r.json())
    .then(game => {
      const game_state = (parse(game.game_state)).game_state
      
      game.game_state = game_state
      return instantiateTurn(game)
    })
}

function instantiateTurn (game) {
  const carrack = new Carrack(game.game_state)
  delete game.game_state
  game.carrack = carrack
  
  return game
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