import axios from 'axios'

const allInfo = (number) => axios.get(`http://api.football-data.org/v1/competitions/455/leagueTable/?matchday=${number}`, {headers: {'X-Auth-Token': 'cab27f707e914b2fb5b9172fe2d3af0b'}})

export { allInfo }
