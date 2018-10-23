import Action from './Action'
import AttemptAction from './AttemptAction'
import Success from './Success'

export { default as Success } from './Success'
export { default as reducer } from './createReducer'

export const success = result => new Success(result)
export const error = message => new Error(message)
export const action = name => new Action(name)
export const attempt = name => new AttemptAction(name)
