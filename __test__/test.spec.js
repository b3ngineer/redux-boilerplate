/* global describe test expect */
/* eslint no-unused-expressions: 0 */

import { action, attempt, reducer, result } from '../src/index'

describe('terse-redux', () => {
  test('action should be exposed', () => {
    expect(typeof action).toEqual('function')
  })

  test('reduce should be exposed', () => {
    expect(typeof reducer).toEqual('function')
  })

  test('action should accept tag template parameter', () => {
    const testAction = action`TEST_ACTION`
    testAction.Δ = action => ({ something: action.something })
    expect(testAction.name).toEqual('TEST_ACTION')
  })

  test('reduce should accept initial state and actions', () => {
    const testAction = action`TEST_ACTION`
    testAction.Δ = () => ({ foo: 'baz' })
    const reducerA = reducer({ foo: 'bar' }, [testAction])
    expect(typeof reducerA).toEqual('function')
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

  test('attempts should allow passing mapped args into the builder', () => {
    const testAttempt = attempt`TEST_ATTEMPT`
    testAttempt.Δ = () => ({ foo: 'baz' })
    const testAttemptBuilder = testAttempt.builder`name,age`
    const testResult = testAttemptBuilder('Bob', 93)
    expect(testResult.type).toEqual('TEST_ATTEMPT')
    expect(testResult.payload.name).toEqual('Bob')
    expect(testResult.payload.age).toEqual(93)
  })

  test('attempts should allow passing Errors into the builder', () => {
    const testAttempt = attempt`TEST_ATTEMPT`
    testAttempt.Δ = () => ({ foo: 'baz' })
    const testAttemptBuilder = testAttempt.builder`name,age`
    const testResult = testAttemptBuilder(new Error('Boom!'))
    expect(testResult.type).toEqual('TEST_ATTEMPT_ERROR')
    expect(testResult.payload.error.message).toEqual('Boom!')
  })

  test('attempts should call the success builder if result types is passed into the builder', () => {
    const testAttempt = attempt`TEST_ATTEMPT`
    testAttempt.Δ = () => ({ foo: 'baz' })
    const testAttemptBuilder = testAttempt.builder`name,age`
    const testResult = testAttemptBuilder(result({ data: ['fishing'] }))
    expect(testResult.type).toEqual('TEST_ATTEMPT_SUCCESS')
    expect(testResult.payload.result.data[0]).toEqual('fishing')
  })
})
