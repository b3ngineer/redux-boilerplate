/* global describe test expect */
/* eslint no-unused-expressions: 0 */

import { action, reducer } from '../src/index'

describe('reducer', () => {
  test('reducer should be exposed', () => {
    expect(typeof reducer).toEqual('function')
  })

  test('reducer should accept initial state and actions', () => {
    const testAction = action`TEST_ACTION`
    testAction.Δ = () => ({ foo: 'baz' })
    const reducerA = reducer({ foo: 'bar' }, [testAction])
    expect(typeof reducerA).toEqual('function')
  })
})
