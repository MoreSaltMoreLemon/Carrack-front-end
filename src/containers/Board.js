import React, { Component } from 'react'
import '../App.css'
import { gridPlacement, generateBoardGrid } from '../helpers'
import Cell from '../components/Cell'
import { Ship } from '../components/Ship'
import Explosion from '../components/Explosion'

export default class Board extends Component {

  renderBoard() {
    const carrack = this.props.game.carrack
    return (
      carrack.board.map((column, columnIndex) => column.map((cell, cellIndex) => {
        const place = gridPlacement(columnIndex, cellIndex, carrack.size)
        return (
          <Cell
            key={place}
            coord={{x: columnIndex, y: cellIndex}}
            type={cell.type}
            place={place}
            occupiedBy={cell.occupiedBy}
          />
        )
      }))
    )
  }

  renderShips() {
    const size = this.props.game.carrack.size
    const ships = Object.values(this.props.game.carrack.ships)
    const currentPlayer = this.props.game.turn % 2 === 0 ? 2 : 1
    return (
      ships.map(ship => {
        const place = gridPlacement(ship.x, ship.y, size)
          const selected = this.props.selected === ship.id

          return (
            <Ship
              key={place}
              ship={ship}
              place={place}
              currentPlayer={currentPlayer}
              size={size}
              selected={selected}
              toggleSelected={() => this.props.toggleSelected(ship.id)}
              shipActions={this.props.shipActions}
            />
          )
        // }
      })
    )
  }

  renderOutcome () {
    const g = this.props.game
    if (g.winner) {
      const winner = g.player1.id === this.props.player.id ? g.player1.username : g.player2.username
      return <h1 className="winner-banner">{winner} wins!</h1>
    } else if (g.finished) {
      const opponent = g.player1.id !== this.props.player.id ? g.player1.username : g.player2.username
      return <h1 className="winner-banner">{opponent} has left the game.</h1>
    } else {
      return null
    }
  }

  renderExitButton () {
    return (<div className="exit-button" onClick={this.props.exitGame}>Exit</div>)
  }

  boardGrid = () => {
    // debugger
    const size = this.props.game.carrack.size
    return (
      {
        'display': 'grid',
        'gridTemplateRow': `repeat(1fr, ${size - 1})`,
        'gridTemplateColumn': `repeat(1fr, ${size - 1})`,
        'gridTemplateAreas': `${generateBoardGrid(size)}`
      }
    )
  }

  render() {
    return (
      <div 
        className="board" 
        style={this.boardGrid()}
      > 
        {this.renderExitButton()}
        {this.renderOutcome()}
        {this.renderBoard()}
        {this.renderShips()}
        <Explosion 
          explosionAt={this.props.explosionAt}
          size={this.props.game.carrack.size}
        />
      </div>
    )
  }
}