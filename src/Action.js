import _ from 'lodash' // @types/lodash.clonedeep

const { cloneDeep } = _

export default class Action {
  constructor (name) {
    this._name = Array.isArray(name) ? name[0] : name

    if (!this._name) {
      throw new Error(
        'Missing value for name parameter in call to Action.constructor'
      )
    }

    this._name = this._name.toUpperCase()

    this._delta = action => {}

    this.mappingSize = 0

    const that = this

    // "arguments" comes from call to constructor if arrow function is used
    this._builder = function () {
      const definition = [...arguments]
      const signature = Array.isArray(definition[0])
        ? definition[0]
        : definition

      const mapping = signature.reduce((all, arg) => {
        const tokens = arg.split(/,\s*/g)
        return all.concat(tokens)
      }, [])

      that.mappingSize = mapping.length

      return function () {
        const actionParams = [...arguments]
        return (
          that.typedBuildAction(actionParams) || {
            type: that.name,
            payload: mapping.reduce((mapped, mapItem, index) => {
              mapped[mapItem] = actionParams[index]
              return mapped
            }, {})
          }
        )
      }
    }
  }

  typedBuildAction () {
    return false
  }

  set delta (supplier) {
    this._delta = supplier
  }

  set Δ (supplier) {
    this._delta = supplier
  }

  get builder () {
    return this._builder
  }

  get name () {
    return this._name
  }

  get NAME () {
    return this._name
  }

  merge (state, action, internalState = {}) {
    return Object.assign(cloneDeep(state), internalState, this._delta(action))
  }

  matches (requestedAction) {
    return requestedAction === this.name
  }
}
