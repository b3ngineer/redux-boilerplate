import _ from 'lodash' // @types/lodash.clonedeep

const { cloneDeep } = _

export default class Action {
  constructor (name) {
    this.name = Array.isArray(name) ? name[0] : name
    if (this.name) {
      this.name = this.name.toUpperCase()
    }

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

  merge (state, action, internalState = {}) {
    return Object.assign(cloneDeep(state), internalState, this._delta(action))
  }

  matches (requestedAction) {
    return requestedAction === this.name
  }
}
