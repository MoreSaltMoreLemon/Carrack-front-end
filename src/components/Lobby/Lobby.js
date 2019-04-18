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

  // componentDidMount() {
    // this.updateInterval()
  // }

  updateInterval() {
    const intervalID = setInterval(this.updateGames, 4000)
    this.setState({ intervalID })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID)
  }

  updateGames = () => {
    console.log("UPDATE!")
    if (this.props.auth.jwt) {
      const jwt = this.props.auth.jwt
      activeGames(jwt)
        .then(r => r.json())
        .then(activeGames => this.setState({ activeGames }))
      availablePlayers(jwt)
        .then(r => r.json())
        .then(availablePlayers => this.setState({ availablePlayers }))
    }
  }


  joinGame = () => {
    const player_id = this.props.auth.player.id
    const jwt = this.props.auth.jwt
    console.log(player_id)
    joinGame(player_id, jwt)
      .then(game => {
        console.log("GAME", game)
        this.props.joinGame(game)
      })
  }

  createGameClickHandler = (id) => {
    const player_id = this.props.auth.player.id
    const jwt = this.props.auth.jwt
    const opponent_id = id
    createGame(player_id, opponent_id, jwt)
      .then(game => {
        // console.log("GAME", game)
        this.props.createGame(game)
      })
  }

  render() {
    return (
      
      <div className="lobby" onClick={this.updateGames}>
        <img src='./img/lobbyShip.png'></img>
        {this.props.auth === false ? null : 
          <>
            <AvailablePlayers
              availablePlayers={this.state.availablePlayers}  
              createGame={this.createGameClickHandler}
            />
            <ActiveGames
              activeGames = {this.state.activeGames} 
            />
            <button className='create-game' onClick={this.joinGame} />
          </>
        }
      </div>
    )
  }
}