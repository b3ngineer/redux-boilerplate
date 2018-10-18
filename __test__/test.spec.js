/* global describe test expect */
/* eslint no-unused-expressions: 0 */

import { type, reduce } from '../src/index'

/*
 * import actions from "./actions"

  const initState = {
    deployments: {},
    history: {},
    loading: false
  }

  export default function reducer(state = initState, action) {
    switch (action.type) {
      case actions.DEPLOYMENT_LOAD:
        return {
          ...state,
          loading: true,
          deployments: Object.assign({}, state.deployments, {
            [action.payload.name]: null
          })
        }
      case actions.DEPLOYMENT_SUCCESS_RESULT:
        return {
          ...state,
          loading: false,
          deployments: Object.assign({}, state.deployments, {
            [action.payload.name]: action.payload.result
          })
        }
      case actions.HISTORY_LOAD:
        return {
          ...state,
          loading: true,
          history: Object.assign({}, state.history, {
            [action.payload.host]: {
              [action.payload.asset]: null
            }
          })
        }
      case actions.HISTORY_SUCCESS_RESULT:
        return {
          ...state,
          loading: false,
          history: Object.assign({}, state.history, {
            [action.payload.host]: {
              [action.payload.asset]: action.payload.result
            }
          })
        }
      default:
        return state
    }
  }
 */

describe('terse-redux', () => {
  test('type should be exposed', () => {
    expect(typeof type).toEqual('function')
  })

  test('reduce should be exposed', () => {
    expect(typeof reduce).toEqual('function')
  })

  test('type should accept tag template and reduce function', () => {
    const a = type`TEST_VALUE`
  })
})
