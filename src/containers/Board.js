import React, { Component } from 'react'
import '../App.css'
import Cell from '../components/Cell'
import { Ship } from '../components/Ship'

export default class Board extends Component {
  constructor() {
    super()
    this.state = {
      selected: null
    }
  }

  toggleSelected = (e) => {
    const selected = !this.state.selected
    this.setState({ selected })
    console.log(`selected = ${this.state.selected}`)
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
        return (
          <Ship
            key={place}
            coord={{ x: ship.x, y: ship.y }}
            place={place}
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

function gridPlacement(x, y, size) {
  const abc = 'abcdefghijklmnopqrstuvwxyz'
  let placement = ''
  let idx = (y * size) + x

  while (idx >= 0) {
    placement += abc[idx % 26]
    idx -= 26
  }

  return placement
}

function generateBoardGrid(size) {
  const columns = []

  for (let c = 0; c < size; c++) {
    let row = gridPlacement(0, c, size)
    for (let r = 1; r < size; r++) {
      row += ' ' + gridPlacement(r, c, size)
    }
    row = `"${row}"`
    columns.push(row)

  }
  return columns.reverse().join(" ")
}