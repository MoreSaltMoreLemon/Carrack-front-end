import { httpRequestJWT } from './helpers'
import { parse, stringify } from 'flatted/esm'
import { BASE_URL } from './ENV'
import { Carrack } from './game/Carrack'

// Requests new game object with base game data from Rails Server
//  then instantiates the game object as a Carrack object with Ships
// createGame :: (player_id: Int, opponent_id: int, jwt: string) -> Promise(Carrack instance)
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

// Joins existing game where player_id matches player 1
// joinGame :: (player_id: Int, jwt: string) -> Promise(Carrack instance)
function joinGame (player_id, jwt) {
  const joinGame = BASE_URL + '/game/join'
  return httpRequestJWT(joinGame, 'post', jwt, { game: { player_id }})
    .then(r => r.json())
    .then(game => {
      console.log("JOIN GAME", game)
      const game_state = (parse(game.game_state)).game_state
      
      game.game_state = game_state
      console.log("JOIN GAME GAME STATE", game)
      return instantiateTurn(game)
    })
}

// Given a gameState object: game: {id, carrack, player1, player2, finished, winner,}
//  stringifies the Carrack instance using flatted::stringify because it contains
//  circular references, then combines that with the gameState copy, and removes the
//  carrack instance so that it no longer contains circular references.
// The game_state string is protected from a second stringify as it is passed as a string
//  from this point until it is decoded using flatted::parse.
// exportTurn :: (gameState: {}, jwt: string) -> void
function exportTurn (gameState, jwt) {
  let game = Object.assign({}, gameState)
  const game_state = stringify(game.carrack)

  game.game_state = game_state
  delete game.carrack

  httpRequestJWT(`${BASE_URL}/game/export_turn`, 'PUT', jwt, game)
}

// Begins a recursive setTimeout cycle which checks if a turn is available
//  and if so, returns a new Carrack instance from received game data
// importTurn :: (game: {}, jwt: string, callbackFn: function) -> void
function importTurn (game, jwt, callbackFn) {
  setTimeout(() => requestNewTurn(game, jwt, callbackFn), 500)
}

// Callback function set by importTurn.
//  Checks to see if there is an available turn. If so, download turn.
//  If no, reset timer and continue requesting until a turn has been downloaded
// requestNewTurn :: (game: {}, jwt: string, callbackFn: function) -> void
function requestNewTurn(game, jwt, callbackFn) {
  httpRequestJWT(`${BASE_URL}/game/turn_available`, 'POST', jwt, {game: { id: game.id, turn: game.turn } })
  .then(r => r.json())
  .then(response => {
    
    if (response.ready) {
      const gameID = { id: game.id }
      
      httpRequestJWT(`${BASE_URL}/game/import_turn`, 'post', jwt, {game: gameID })
      .then(r => r.json())
      .then(gameJSON => {
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

// Translates JSON game data into a Carrack game instance and
//  returns a correctly formatted game state object.
// Removes the game_state key, and attaches the Carrack instance
// instantiateTurn :: (game: {}) -> Carrack instance
function instantiateTurn(game) {
  const carrack = new Carrack(game.game_state)
  delete game.game_state
  game.carrack = carrack
  
  return game
}

function winGame(jwt) {}

function exitGame(jwt) {}

// Polls server for list of active games to render in Lobby
// activeGames :: (jwt: string) -> game[]
function activeGames(jwt) {
  const activeGamesURL = BASE_URL + '/game/active_games'
  return httpRequestJWT(activeGamesURL, 'get', jwt)
}

// Polls server for players available to play against
// availablePlayers :: (jwt: string) -> player[]
function availablePlayers(jwt) {
  const activeGamesURL = BASE_URL + '/player/available_players'
  return httpRequestJWT(activeGamesURL, 'get', jwt)
}


export { 
  importTurn, 
  exportTurn, 
  createGame,
  joinGame, 
  winGame, 
  exitGame, 
  activeGames, 
  availablePlayers 
}