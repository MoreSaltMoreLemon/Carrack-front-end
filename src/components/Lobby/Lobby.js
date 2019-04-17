import React, { Component, Fragment } from 'react'
import '../../App.css'
import AvailablePlayers from './AvailablePlayers'
import ActiveGames from './ActiveGames'
import { activeGames, availablePlayers, joinGame, createGame } from '../../dataHandlers'

export default class Lobby extends Component {
  constructor(props) {
    super(props)

    this.state = {
      availablePlayers: [],
      activeGames: [],
      intervalID: null
    }
  }

  componentDidMount() {
    // this.updateInterval()
  }

  updateInterval() {
    console.log("SET UPDATE INTERVAL!!!")
    const intervalID = setInterval(this.updateGames.bind(this), 1000)
    this.setState({ intervalID })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID)
  }

  updateGames() {
    console.log("UPDATE!")
    const jwt = this.props.auth.jwt
    activeGames(jwt)
      .then(r => r.json())
      .then(activeGames => this.setState({ activeGames }))
    availablePlayers(jwt)
      .then(r => r.json())
      .then(availablePlayers => this.setState({ availablePlayers }))
  }

  // joinGameClickHandler = (id) => {
  //   const jwt = this.props.auth.jwt
  //   const player_id = this.props.auth.player.id
  //   joinGame(id, player_id, jwt)
  // }

  createGameClickHandler = (id) => {
    const player_id = this.props.auth.player.id
    const jwt = this.props.auth.jwt
    const opponent_id = id
    createGame(player_id, opponent_id, jwt)
  }

  render() {
    return (
      
      <div className="lobby">
        <img src='./img/lobbyShip.png' onClick={this.updateGames.bind(this)}></img>
        {this.props.auth === false ? null : 
          <>
            <AvailablePlayers
              availablePlayers={this.state.availablePlayers}  
              createGame={this.createGameClickHandler}            
            />
            <ActiveGames
              activeGames = {this.state.activeGames} 
            />
            {/* <button className='create-game' onClick={this.createGameClickHandler} /> */}
          </>
        }
      </div>
    )
  }
}