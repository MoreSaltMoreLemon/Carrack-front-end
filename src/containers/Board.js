import React, { Component } from 'react'
import '../App.css'
import Cell from '../components/Cell'

export default class Board extends Component {
  constructor(props) {
    super(props)
    const size = 16
    const board = [...Array(size)].map(row => 
                    [...Array(size)].map(cell => 
                      ({type: 'water', occupiedBy: null })))
    this.state = { boardSize: size, board }

  }

  selectCell = (e) => {
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
            clickHandler={this.selectCell}
            place={place}
            occupiedBy={cell.occupiedBy}
          />
        )
      }))
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