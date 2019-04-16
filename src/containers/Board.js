import React, { Component, Fragment } from 'react'
import '../App.css'
import { gridPlacement, generateBoardGrid } from '../helpers'
import Cell from '../components/Cell'
import { Ship } from '../components/Ship'
import Explosion from '../components/Explosion'
import SunkenShip from '../components/SunkenShip'

export default class Board extends Component {

  renderBoard() {
    const carrack = this.props.carrack
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
    const size = this.props.carrack.size
    const ships = Object.values(this.props.carrack.ships)
    return (
      ships.map(ship => {
        const place = gridPlacement(ship.x, ship.y, size)

        // if (ship.sunk) {
        //   return (<SunkenShip key={place} place={place} />)
        // } else {
          const selected = this.props.selected === ship.id

          return (
            <Ship
              key={place}
              ship={ship}
              place={place}
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

  renderExplosion() {

  }

  boardGrid = () => {
    // debugger
    const size = this.props.carrack.size
    return (
      {
        'display': 'grid',
        'grid-template-row': `repeat(1fr, ${size - 1})`,
        'grid-template-column': `repeat(1fr, ${size - 1})`,
        'grid-template-areas': `${generateBoardGrid(size)}`
      }
    )
  }

  render() {
    return (
      <div 
        className="board" 
        style={this.boardGrid()}
      >
        {this.renderBoard()}
        {this.renderShips()}
        <Explosion 
          explosionAt={this.props.explosionAt}
          size={this.props.carrack.size}
        />
      </div>
    )
  }
}