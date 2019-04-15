
class Ship {
  constructor(id, player, x, y, direction, moves, hp, damage, gameObj) {
    this.id = id
    this.player = player
    this.x = x
    this.y = y
    this.direction = direction
    this.moves = moves
    this.hp = hp
    this.damage = damage
    this.sunk = false
    this.gameObj = gameObj
  }

  movement(x, y, prevBoard) {
    const newBoard = this.gameObj.deepCopyBoard(prevBoard)
    const size = this.gameObj.size
    if (x >= 0 && x < size && y>= 0 && y < size) {
      newBoard[this.x][this.y].occupiedBy = null
      newBoard[x][y].occupiedBy = this.id
      this.direction = this.orientation(x, y, this.x, this.y)
      this.x = x
      this.y = y
    }
    return newBoard
  }

  orientation(newX, newY, oldX, oldY) {
    if (newY > oldY) return 'up'
    if (newY < oldY) return 'down'
    if (newX > oldX) return 'right'
    return 'left'
  }

  canAttack(enemyShip) {
    const directionOfAttack = this.orientation(enemyShip.x, enemyShip.y, this.x, this.y)
    if (directionOfAttack === 'left' || directionOfAttack === 'right') {
      if (this.direction === 'up' || this.direction === 'down') return true
      else return false
    } else {
      if (this.direction === 'left' || this.direction === 'right') return true
      else return false
    } 
  }

  attack(enemyShip) {
    if (this.canAttack(enemyShip)) {
      const hit = Math.round(Math.random() + .3)
      if (hit && !enemyShip.sunk) {
        const damage = this.damage * Math.random()
        enemyShip.hp -= damage
        if (enemyShip.hp <= 0) enemyShip.sunk = true
        return true
      } else if (enemyShip.sunk) {
        return false
      } else {
        return false
      }
    } else {
      return false
    }
  }
}

export { Ship }