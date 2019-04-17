import { httpRequestJWT, httpRequestGame } from './helpers'
import { parse, stringify } from 'flatted/esm'
import { GAMES_URL, BASE_URL } from './ENV'
import { Carrack } from './game/Carrack'

function exportTurn (gameState, jwt) {
  let game = Object.assign({}, gameState)
  const game_state = stringify(game.carrack)

  game.game_state = game_state
  delete game.carrack

  httpRequestJWT(`${BASE_URL}/game/export_turn`, 'PUT', jwt, game)
  .then(res => res.json())
  .then(game => {
    // importTurn(game, jwt)
    // game.carrack = parse(game.game_state)
    // delete game.game_state
    // return game
  })
}

function importTurn (game, jwt, callbackFn) {
  // console.log("IMPORT TURN PARAMS", game, jwt, callbackFn)
  setTimeout(() => requestNewTurn(game, jwt, callbackFn), 1000)
}

function requestNewTurn(game, jwt, callbackFn) {
  httpRequestJWT(`${BASE_URL}/game/turn_available`, 'POST', jwt, {game: { id: game.id, turn: game.turn - 1 } })
  .then(r => r.json())
  .then(response => {
    
    if (response.ready) {
      const gameID = { id: game.id }
      
      httpRequestJWT(`${BASE_URL}/game/import_turn`, 'post', jwt, {game: gameID })
      .then(r => r.json())
      .then(gameJSON => {
        // console.log("NEW TURN AVAILABLE", gameJSON)
        const game_state = parse(gameJSON.game_state)
    
        gameJSON.game_state = game_state
        callbackFn(instantiateTurn(gameJSON))
      })
    } else {
      // console.log("WAITING FOR OPPONENT")
      importTurn(game, jwt, callbackFn)
    }
  })
}

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