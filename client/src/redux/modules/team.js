import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs'
import { getTeamFulfilled, getAllTeamsFulfilled } from './../actions/actionCreators';
import {
  ADD_TEAM,
  GET_TEAM,
  GET_ALL_TEAMS,
  GET_ALL_TEAMS_FULFILLED,
  GET_TEAM_FULFILLED,
} from '../../utils/types';

import { getAllTeams } from '../../core/services/teams';

const DOMAIN = window.location.host || 'localhost'


const addTeamEpic = (action$, state) => {
  return action$
    .ofType(ADD_TEAM)
    .mergeMap(
      action => {
        return getAllTeams()
          .map(({response}) => {
            return getTeamFulfilled(response.data)
          })
      }
    )
}

const getAllTeamsEpic = (action$, state) => {
  return action$
    .ofType(GET_ALL_TEAMS)
    .mergeMap(
      action => {
        return ajax.getJSON(`http://${DOMAIN}:4000/api/team`)
          .map(response => {
            return getAllTeamsFulfilled(response);
          })
      }
    )
    .concat(action$.mapTo({ type: GET_ALL_TEAMS_FULFILLED }))
}

const getTeamEpic = (action$, state) => {
  return action$
    .ofType(GET_TEAM)
    .mergeMap(
      action => {
        return ajax.getJSON(`http://${DOMAIN}:4000/api/team?teamId=${action.payload}`)
          .map(response => {
            return getTeamFulfilled(response);
          })
      }
    )
    .concat(action$.mapTo({ type: GET_TEAM_FULFILLED }))
}

const teams = (state = {
  allTeams: [],
  team: {},
  location: {},
  project: {},
}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_TEAMS_FULFILLED:
      return { ...state, allTeams: payload || [] };
    case GET_TEAM_FULFILLED:
      return {
        ...state,
        team: payload[0] || {},
        location: payload[1] || {},
        project: payload[2] || {},
      }
    default:
      return state;
  }
}

export {
  teams as default,
  addTeamEpic,
  getTeamEpic,
  getAllTeamsEpic,
}
