import React, { Component } from 'react'
import { httpRequest } from '../../helpers'
import { BASE_URL } from '../../ENV'

export default class LoginPlayer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    // this.loginUser({username: 'allen', password: 'password'})
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmitHandler = (e) => {
    e.preventDefault()

    this.loginUser(this.state)

    this.setState({
      username: '',
      password: ''
    })
  }

  loginUser(params) {
    console.log(params)
    // const {username, email, password} = params
    httpRequest(BASE_URL + '/login', "post", {player: {...params}})
      .then(response => response.json())
      .then(auth => {
        // console.log(auth)
        this.props.setAuth(auth)
      })
  }


  render() {
    return (
      <div className="login-player">
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
          <label>Password: 
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