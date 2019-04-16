import { httpRequest, httpRequestJWT } from './helpers'
import { parse, stringify } from 'flatted/esm'

function exportTurn (gameObj, turn, auth) {
  // Stringify gameObj.
  // Combine JSON and turn into one object.
  // Post resource creation during "new game".
  // Put to new_turn route.
  console.log(parse(stringify(gameObj)))
}

function importTurn (turn, auth) {
  // Fetch request to server.
  // Check to see if a new turn exists. (wait with interval)
  // If new turn, pulls down data.
  // Parses result.
  // Translate data into new Ship and new Carrack.

  console.log('import turn')
  instantiateTurn()
}

function joinGame (auth) {
  // Called by App when user joins game.

  console.log('new game')
  instantiateTurn()
}

function instantiateTurn () {
  // Accept standard turn format.
  // Translate data into Carrack and Ship objects.
  // Returns result for further processing on server.

  console.log('instantiate turn')
}

function winGame(auth) {
  //
}

function exitGame(auth) {
  //
}

export { importTurn, exportTurn, joinGame, winGame, exitGame }