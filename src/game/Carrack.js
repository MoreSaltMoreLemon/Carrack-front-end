import { Ship } from './Ship'

class Carrack {
  // constructor(size) {
  //   this.size = size
  //   this.board = [...Array(size)].map(row => 
  //                 [...Array(size)].map(cell => 
  //                   ({type: 'water', occupiedBy: null })))
  //   this.ships = {}
  // }
  constructor(gameState = { size: 12, board: [], ships: {}}) {
    this.size = gameState.size
    this.board = gameState.board
    this.ships = this.placeShips(gameState.ships)
  }

  deepCopyBoard (board) {
    return board.map(column => {
      return column.map(cell => {
        return Object.assign({}, cell)
      })
    })
  }

  placeShips(ships) {
    const newShips =  Object.values(ships).map(shipProperties => {
      shipProperties.gameObj = this
      return new Ship(shipProperties)
    })

    const mappedShips = {}
    newShips.map(ship => {
      mappedShips[ship.id] = ship
    })

    return mappedShips
  }

  placeShip(ship) {
    const x = ship.x
    const y = ship.y
    // debugger
    this.board[x][y].occupiedBy = ship.id
    this.ships[ship.id] = ship
  }


}

export { Carrack }