/* global describe test expect */
/* eslint no-unused-expressions: 0 */

import { action, reduce } from '../src/index'

describe('terse-redux', () => {
  test('action should be exposed', () => {
    expect(typeof action).toEqual('function')
  })

  test('reduce should be exposed', () => {
    expect(typeof reduce).toEqual('function')
  })

  test('action should accept tag template parameter', () => {
    const testAction = action`TEST_ACTION`
    testAction.Δ = action => ({ something: action.something })
    expect(testAction.name).toEqual('TEST_ACTION')
  })

  test('reduce should accept initial state and actions', () => {
    const testAction = action`TEST_ACTION`
    testAction.Δ = () => ({ foo: 'baz' })
    const reducer = reduce({ foo: 'bar' }, [testAction])
    expect(typeof reducer).toEqual('function')
  })

  test('action types should expose bindable action builder', () => {
    const testAction = action`TEST_ACTION`
    testAction.Δ = () => ({ foo: 'baz' })
    expect(typeof testAction.builder).toEqual('function')
  })
})
