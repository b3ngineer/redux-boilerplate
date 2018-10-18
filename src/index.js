class ReduxTypeAction {
  constructor (name) {
    this.name = Array.isArray(name) ? name[0] : name
  }

  newup (state) {}
}

export const type = name => new ReduxTypeAction(name)

export const reduce = (initialState = {}, handlers = []) => (state, action) =>
  handlers
    .filter(handler => handler.name === action.type)
    .reduce((base, handler) => {
      return Object.assign({}, base)
    }, state || initialState)
