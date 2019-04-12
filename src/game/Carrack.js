class Carrack {
  constructor(size) {
    this.size = size
    this.board = [...Array(size)].map(row => 
                  [...Array(size)].map(cell => 
                    ({type: 'water', occupiedBy: null })))
    this.ships = {}
  }

  placeShip(ship) {
    const x = ship.x
    const y = ship.y
    // debugger
    this.board[x][y] = {type: 'ship', occupiedBy: ship.id }
    this.ships[ship.id] = ship
  }


}

class Ship {
  constructor(id, player, x, y, moves, hp, damage) {
    this.id = id
    this.player = player
    this.x = x
    this.y = y
    this.moves = moves
    this.hp = hp
    this.damage = damage
  }

  // move(up, left) {}
}

export { Ship, Carrack }