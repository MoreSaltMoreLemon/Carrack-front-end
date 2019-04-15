import React, { Component, Fragment } from 'react'
import '../App.css'
import { gridPlacement, generateBoardGrid } from '../helpers'
import Cell from '../components/Cell'
import { Ship } from '../components/Ship'

export default class Board extends Component {
  constructor() {
    super()
    this.state = {
      selected: null
    }
  }

  toggleSelected = (id) => {
    const selected = id === this.state.selected ? null : id

    this.setState({ selected })
  }

  moveShip = (e) => {
    e.target.className = "ship"
  }

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
            //moveShip={this.moveShip}
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
        const selected = this.state.selected === ship.id

        return (
          <Ship
            key={place}
            ship={ship}
            place={place}
            size={size}
            selected={selected}
            toggleSelected={() => this.toggleSelected(ship.id)}
            shipActions={this.props.shipActions}
          />
        )
      })
    )
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
      </div>
    )
  }
}