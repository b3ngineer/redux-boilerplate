import _ from 'lodash' // @types/lodash.clonedeep

const { cloneDeep } = _

class Action {
  constructor (name) {
    this.name = Array.isArray(name) ? name[0] : name
    if (this.name) {
      this.name = this.name.toUpperCase()
    }
    this._delta = action => {}

    this._builder = () => ({
      type: this.name,
      payload: {
        ...arguments
      }
    })
  }

  set delta (factory) {
    this._delta = factory
  }

  set Δ (factory) {
    this._delta = factory
  }

  get builder () {
    return this._builder
  }

  merge (state, action) {
    return Object.assign(cloneDeep(state), this._delta(action))
  }

  matches (requestedAction) {
    return requestedAction === this.name
  }
}

class AttemptAction extends Action {
  matches (requestedAction) {
    return requestedAction === this.name || this.name + '_SUCCESS' || this.name + '_ERROR'
  }
}

export const action = name => new Action(name)

export const attempt = name => new AttemptAction(name)

export const reduce = (initialState = {}, handlers = []) => (state, action) =>
  handlers
    .filter(handler => handler.matches(action.type))
    .reduce((_state, handler) => handler.merge(_state, action), state || initialState)
