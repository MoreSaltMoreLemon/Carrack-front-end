import React, { Component } from 'react'
import { PLAYERS_URL, GAMES_URL, BASE_URL } from '../ENV'

export default class Lobby extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  onChangeHandler = (e) => {
    // console.log(this.state)
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmitHandler = (e) => {
    e.preventDefault()

    this.createUser(this.state)

    this.setState({
      username: '',
      email: '',
      password: ''
    })
  }

  createUser(params) {
    httpRequest(PLAYERS_URL, "post", params)
      .then(response => response.json())
      .then(json => console.log(json))
  }

  loginUser(username) {
    httpRequest(BASE_URL + "/login")
  }

  render() {
    return (
      <div className="lobby">
        <form>
          <label>Username: 
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.onChangeHandler}
            />
          </label>
          <label>Email: 
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onChangeHandler}
            />
          </label>
          <label>Username: 
            <input
              type="text"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChangeHandler}
            />
          </label>
          <input
            type="submit"
            value="submit"
            onClick={this.onSubmitHandler}
          />
        </form>
      </div>
    )
  }
}

function httpRequest(url, method='GET', data={}) {
  const init = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: method,
    body: JSON.stringify(data)
  }
  if (method.toLowerCase() === 'get') delete init.body;
  else if (method.toLowerCase() === 'post' && init.body.id) delete init.body.id;

  return fetch( url, init);
}