/* global describe test expect */
/* eslint no-unused-expressions: 0 */

import { action, createReducer } from '../src/index'

describe('createReducer', () => {
  test('createReducer should be exposed', () => {
    expect(typeof createReducer).toEqual('function')
  })

  test('createReducer should accept initial state and actions', () => {
    const testAction = action`TEST_ACTION`
    testAction.Δ = () => ({ foo: 'baz' })
    const createReducerA = createReducer({ foo: 'bar' }, [testAction])
    expect(typeof createReducerA).toEqual('function')
  })
})
