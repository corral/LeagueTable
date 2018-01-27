import React, { Component } from 'react'
import { allInfo } from './Api'
import './App.style.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      reverse: false
    }
  }

  componentWillMount () {
    allInfo
    .then(info => {
      this.setState({
        standings: info.data.standing
      })
      console.log(this.state)
    })
  }

  teamBoxElementCreator = (team, place) => {
    const { wins, draws, losses, goals, goalsAgainst} = place ? place : team
    const info = [ wins, draws, losses, goals, goalsAgainst]
    return info.map(info => {
      return <span className='teamBoxElement'>{info}</span>
    })
  }

  render () {
    const standingsOrder = this.state.reverse ? this.state.standings.reverse() : this.state.standings
    return (
      <div>
        <ul>
          {
            this.state.standings
            ? standingsOrder.map(team => {
              return (
                <li className='teamBox'>
                  <div className='teamBoxDividerTeams'>
                    <span className='teamPosition'>{team.position}</span>
                    <span className='teamImage'>
                      <img src={team.crestURI} alt='teamCrest' height='17' />
                    </span>
                    <span className='teamName'>{team.teamName}</span>
                  </div>
                  <span className='teamPoints'>{team.points}</span>
                  <div className='teamBoxDividerStatistics'>
                    <span className='teamBoxElement'>{team.playedGames}</span>
                    {this.teamBoxElementCreator(team)}
                  </div>
                  <span className='teamPoints'>{team.home.draws + (team.home.wins * 3)}</span>
                  <div className='teamBoxDividerStatistics'>
                    <span className='teamBoxElement'>{team.home.draws + team.home.losses + team.home.wins}</span>
                    {this.teamBoxElementCreator(team, team.home)}
                  </div>
                  <span className='teamPoints'>{team.away.draws + (team.away.wins * 3)}</span>
                  <div className='teamBoxDividerStatistics'>
                    <span className='teamBoxElement'>{team.away.draws + team.away.losses + team.away.wins}</span>
                    {this.teamBoxElementCreator(team, team.away)}
                  </div>
                </li>
              )
            })
            : null
          }
        </ul>
      </div>
    )
  }
}

export default App
