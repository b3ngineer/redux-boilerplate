import _ from 'lodash' // @types/lodash.clonedeep

const { cloneDeep } = _

class Action {
  constructor (name) {
    this.name = Array.isArray(name) ? name[0] : name
    if (this.name) {
      this.name = this.name.toUpperCase()
    }

    this._delta = action => {}

    this._builder = () => {
      const mapping = Array.isArray(arguments[0]) ? arguments[0] : [...arguments]
      const type = this.name
      return () => ({
        type,
        payload: mapping.reduce((mapped, mapItem, index) => {
          mapped[mapItem] = arguments[index]
          return mapped
        }, {})
      })
    }
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

  merge (state, action, internalState = {}) {
    return Object.assign(cloneDeep(state), internalState, this._delta(action))
  }

  matches (requestedAction) {
    return requestedAction === this.name
  }
}

class AttemptAction extends Action {
  constructor (name) {
    super(name)
    this.success = new Action(name + '_SUCCESS')
    this.error = new Action(name + '_ERROR')
    this.successBuilder = this.success.builder('result')
    this.errorBuilder = this.error.builder('error')

    this._builder = () => {
      if (arguments[0] instanceof Error) {
        return this.errorBuilder
      }
      const type = this.name
      const mapping = Array.isArray(arguments[0]) ? arguments[0] : [...arguments]
      return () => ({
        type,
        payload: mapping.reduce((mapped, mapItem, index) => {
          mapped[mapItem] = arguments[index]
          return mapped
        }, {})
      })
    }
  }

  matches (requestedAction) {
    return super.matches(requestedAction) || this.success.matches(requestedAction) || this.error.matches(requestedAction)
  }

  merge (state, action) {
    if (super.matches(action.type)) {
      return super.merge(state, action, { loading: true })
    }

    if (this.success.matches(action.type)) {
      return this.success.merge(state, action, { loading: false, result: null })
    }

    if (this.error.matches(action.type)) {
      return this.error.merge(state, action, { loading: false, error: null })
    }
  }
}

export const action = name => new Action(name)

export const attempt = name => new AttemptAction(name)

export const reduce = (initialState = {}, handlers = []) => (state, action) =>
  handlers
    .filter(handler => handler.matches(action.type))
    .reduce((_state, handler) => handler.merge(_state, action), state || initialState)
