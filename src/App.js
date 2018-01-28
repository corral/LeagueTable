import React, { Component } from 'react'
import { allInfo } from './Api'
import './App.style.css'

const uuidv1 = require('uuid/v1')

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      direction: 'down',
      reverse: false,
      matchday: 21,
      matchdaySelected: 21,
    }
  }

  componentWillMount() {
    this.getTable()
  }

  getTable () {
    allInfo(this.state.matchdaySelected)
    .then(info => {
      this.setState({
        standings: info.data.standing
      })
    })
  }

  teamBoxElementCreator = (team, place) => {
    const { wins, draws, losses, goals, goalsAgainst} = place ? place : team
    const info = [ wins, draws, losses, goals, goalsAgainst]
    return info.map(info => {
      return <span key={uuidv1()} className='teamBoxElement'>{info}</span>
    })
  }

  handleMatchDayClickLeft = () => {
    this.setState({
      matchdaySelected: this.state.matchdaySelected - 1,
      reverse: this.state.standings[0].position === 1 && this.state.direction === 'down' ? false : true
    })
    this.getTable()
  }

  handleMatchDayClickRight = () => {
    this.setState({
      matchdaySelected: this.state.matchdaySelected + 1,
      reverse: this.state.standings[0].position === 1 && this.state.direction === 'down' ? false : true
    })
    this.getTable()
  }

  handleClickDirection = () => {
    this.setState({
      direction: this.state.direction === 'down' ? 'up' : 'down',
      reverse: true
    })
  }

  render () {
    const standingsOrder = (
      this.state.standings && this.state.reverse
      ? this.state.standings.reverse()
      : this.state.standings
    )
    return (
      <div>
        <div className='header'>
          <h1>Standings</h1>
          <div>
            <button onClick={this.handleMatchDayClickLeft}>
              {'<'}
            </button>
            <h2>MATCHDAY {this.state.matchdaySelected}</h2>
            { 
              this.state.matchdaySelected < this.state.matchday 
              ? <button onClick={this.handleMatchDayClickRight}>
                  {'>'}
                </button> 
              : null
            }
          </div>
        </div>
        <div className='guide'>
          <span>
            {
              this.state.direction === 'up'
              ? <button onClick={this.handleClickDirection}>&uarr;</button>
              : <button onClick={this.handleClickDirection}>&darr;</button>
            }
          </span>
          <div>
            <h3>Clips</h3>
            <ul>
              <li>PTS</li>
              <li>Pld</li>
              <li>W</li>
              <li>D</li>
              <li>L</li>
              <li>GF</li>
              <li>GA</li>
            </ul>
          </div>
          <div>
            <h3>At home</h3>
            <ul>
              <li>PTS</li>
              <li>Pld</li>
              <li>W</li>
              <li>D</li>
              <li>L</li>
              <li>GF</li>
              <li>GA</li>
            </ul>
          </div>
          <div>
            <h3>Away</h3>
            <ul>
              <li>PTS</li>
              <li>Pld</li>
              <li>W</li>
              <li>D</li>
              <li>L</li>
              <li>GF</li>
              <li>GA</li>
            </ul>
          </div>
        </div>
        <ul className='table'>
          {
            this.state.standings
            ? standingsOrder.map(team => {
              return (
                <li key={uuidv1()}>
                  <div key={uuidv1()}>
                    <span key={uuidv1()}>{team.position}</span>
                    <span key={uuidv1()}>
                      <img key={uuidv1()} src={team.crestURI} alt='teamCrest' height='17' />
                    </span>
                    <span key={uuidv1()}>{team.teamName}</span>
                  </div> 
                  <span key={uuidv1()}>{team.points}</span>
                  <div key={uuidv1()}>
                    <span key={uuidv1()} className='teamBoxElement'>{team.playedGames}</span>
                    {this.teamBoxElementCreator(team)}
                  </div>
                  <span key={uuidv1()}>{team.home.draws + (team.home.wins * 3)}</span>
                  <div key={uuidv1()}>
                    <span key={uuidv1()} className='teamBoxElement'>{team.home.draws + team.home.losses + team.home.wins}</span>
                    {this.teamBoxElementCreator(team, team.home)}
                  </div>
                  <span key={uuidv1()}>{team.away.draws + (team.away.wins * 3)}</span>
                  <div key={uuidv1()}>
                    <span key={uuidv1()} className='teamBoxElement'>{team.away.draws + team.away.losses + team.away.wins}</span>
                    {this.teamBoxElementCreator(team, team.away)}
                  </div>
                </li>
              )
            })
            : <div className="loader"></div>
          }
        </ul>
      </div>
    )
  }
}

export default App
