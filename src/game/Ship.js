
class Ship {
  constructor(id, player, x, y, moves, hp, damage, gameObj) {
    this.id = id
    this.player = player
    this.x = x
    this.y = y
    this.moves = moves
    this.hp = hp
    this.damage = damage
    this.gameObj = gameObj
  }

  movement(x, y) {
    const board = this.gameObj.deepCopyBoard()
    const size = this.gameObj.size
    if (x >= 0 && x < size && y>= 0 && y < size) {
      board[this.x][this.y].occupiedBy = null
      board[x][y].occupiedBy = this.id
      this.x = x
      this.y = y
    }
    return board
  }

  select(e) {
    //
  }
}

export { Ship }