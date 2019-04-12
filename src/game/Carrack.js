class CarrackBoard {
  constructor(size) {
    this.size = size;
    this.board = [...Array(size)].map(row => 
                  [...Array(size)].map(cell => 
                    ({type: 'water', occupiedBy: null })))
    this.ships = {}
  }

  placePiece(ship) {
    const x = ship.x
    const y = ship.y
    this.boardState[x][y] = {type: 'ship', }
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

