import Action from './Action'
import AttemptAction from './AttemptAction'
import Result from './Result'

export const action = name => new Action(name)

export const attempt = name => new AttemptAction(name)

export const result = data => new Result(data)

export const reducer = function () {
  let initialState = {}
  let actionProxies = []
  if (Array.isArray(arguments[0])) {
    actionProxies = arguments[0]
  } else if (Array.isArray(arguments[1])) {
    initialState = arguments[0]
    actionProxies = arguments[1]
  } else {
    actionProxies = [...arguments]
    if (
      actionProxies[0] &&
      (typeof actionProxies[0].matches !== 'function' ||
        typeof actionProxies[0].merge !== 'function')
    ) {
      initialState = actionProxies.shift()
    }
  }
  return (state, action) => {
    return actionProxies
      .filter(handler => handler.matches(action.type))
      .reduce(
        (_state, handler) => handler.merge(_state, action),
        state || initialState
      )
  }
}
