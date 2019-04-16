import { httpRequest, httpRequestJWT } from './helpers'
import { parse, stringify } from 'flatted/esm'

function exportTurn (gameObj, turn) {
  // Stringify gameObj.
  // Combine JSON and turn into one object.
  // Post resource creation during "new game".
  // Put to new_turn route.
  console.log(parse(stringify(gameObj)))
}

function importTurn (turn) {
  // Fetch request to server.
  // Check to see if a new turn exists.
  // If new turn, pulls down data.
  // Parses result.
  // Translate data into new Ship and new Carrack.

  console.log('import turn')
  instantiateTurn()
}

function newGame () {
  // Called by componentDidMount in App.

  console.log('new game')
  instantiateTurn()
}

function instantiateTurn () {
  // Accept standard turn format.
  // Translate data into Carrack and Ship objects.
  // Returns result for further processing on server.
  
  console.log('instantiate turn')
}

export { importTurn, exportTurn, newGame }