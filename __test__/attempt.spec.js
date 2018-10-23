/* global describe test expect */
/* eslint no-unused-expressions: 0 */

import { attempt, Success } from '../src/index'

describe('terse-redux', () => {
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
    const testResult = testAttemptBuilder(new Success({ data: ['fishing'] }))
    expect(testResult.type).toEqual('TEST_ATTEMPT_SUCCESS')
    expect(testResult.payload.result.data[0]).toEqual('fishing')
  })
})
