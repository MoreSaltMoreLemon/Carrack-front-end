class Carrack {
  constructor(size) {
    this.size = size
    this.board = [...Array(size)].map(row => 
                  [...Array(size)].map(cell => 
                    ({type: 'water', occupiedBy: null })))
    this.ships = {}
  }

  deepCopyBoard () {
    return this.board.map(column => {
      return column.map(cell => {
        return Object.assign({}, cell)
      })
    })
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