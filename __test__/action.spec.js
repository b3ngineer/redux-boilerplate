/* global describe test expect */
/* eslint no-unused-expressions: 0 */

import { action } from '../src/index'

describe('actions', () => {
  test('action should be exposed', () => {
    expect(typeof action).toEqual('function')
  })

  test('action should accept tag template parameter', () => {
    const testAction = action`TEST_ACTION`
    testAction.Δ = action => ({ something: action.something })
    expect(testAction.name).toEqual('TEST_ACTION')
  })

  test('action types should expose bindable action builder', () => {
    const testAction = action`TEST_ACTION`
    testAction.Δ = () => ({ foo: 'baz' })
    expect(typeof testAction.builder).toEqual('function')
  })

  test('action builders should allow tag template argument', () => {
    const testAction = action`TEST_ACTION`
    testAction.Δ = () => ({ foo: 'baz' })
    const testActionBuilder = testAction.builder`name`
    const testResult = testActionBuilder('foo')
    expect(testResult.type).toEqual('TEST_ACTION')
    expect(testResult.payload.name).toEqual('foo')
  })

  test('action builders should allow tag template arguments (multiple)', () => {
    const testAction = action`TEST_ACTION`
    testAction.Δ = () => ({ foo: 'baz' })
    const testActionBuilder = testAction.builder`foo, bar,baz`
    const testResult = testActionBuilder(1, 2, 3)
    expect(testResult.type).toEqual('TEST_ACTION')
    expect(testResult.payload.foo).toEqual(1)
    expect(testResult.payload.bar).toEqual(2)
    expect(testResult.payload.baz).toEqual(3)
  })
})
