class Ship {
  constructor(shipState = {id: 0, player: 0, x: 0, y: 0, direction: 'left', moves: 3, hp: 10, damage: 5, gameObj: null}) {
    this.id = shipState.id
    this.player = shipState.player
    this.x = shipState.x
    this.y = shipState.y
    this.direction = shipState.direction
    this.moves = shipState.moves
    this.hp = shipState.hp
    this.damage = shipState.damage
    this.sunk = shipState.sunk
    this.gameObj = shipState.gameObj
  }

  // Responsible for moving Ship.
  // Checks to make sure that the ship can move, based upon
  // board position. Will not move off of the edge.
  // Creates a deep copy of the board prior to modifying
  // to preserve immutability for React state
  // movement :: (x: int, y: int, prevBoard: []) -> []
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

  // Returns a string value corresponding to the offset of the new coordinate
  // compared to the previous coordinate. 
  // used for Movement button CSS class, Ship css class, and determination
  // of ability to attack based upon ship orientation (cannot attack backwards or forwards)
  // orientation :: (newX: int, newY: int, oldX: int, oldY: int) -> string
  orientation(newX, newY, oldX, oldY) {
    if (newY > oldY) return 'up'
    if (newY < oldY) return 'down'
    if (newX > oldX) return 'right'
    return 'left'
  }

  // Determines if the ship can attack another, adjacent ship based upon orientation
  // As these are old school ships, they are limited to only attacking to either side
  // rather than in all directions.
  // canAttack :: (enemyShip: Ship instance) -> boolean
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

  // Rolls for hit, then for damage and returns a modified
  // enemy ship instance
  // attack :: (enemyShip: Ship instance) -> Ship instance
  attack(enemyShip) {
    if (this.canAttack(enemyShip)) {
      const hit = Math.round(Math.random() + .3)
      if (hit && !enemyShip.sunk) {
        const damage = this.damage * Math.random()
        enemyShip.hp -= damage
        if (enemyShip.hp <= 0) enemyShip.sunk = true
      } 
    }
    return enemyShip
  }

  // Returns a copy of self for immutability within React
  // needed for attacking enemy ships as their state is
  // modified and a new state needs to be set. If previous
  // Ship instance is used, then React doesn't preserve changes
  // and will overwrite on pulling down from server, thus
  // resurrecting ships.
  // copySelf :: void -> new Ship instance
  copySelf() {
    return new Ship(
      {
        id: this.id, 
        player: this.player, 
        x: this.x, 
        y: this.y, 
        direction: this.direction, 
        moves: this.moves, 
        hp: this.hp, 
        sunk: this.sunk,
        damage: this.damage, 
        gameObj: this.gameObj
      })
  }
}

export { Ship }