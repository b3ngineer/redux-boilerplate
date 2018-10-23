import Action from './Action'
import Success from './Success'

export default class AttemptAction extends Action {
  constructor (name) {
    super(name)
    this.success = new Action(name + '_SUCCESS')
    this.error = new Action(name + '_ERROR')
    this.successBuilder = this.success.builder('result')
    this.errorBuilder = this.error.builder('error')
    this.error.delta = ({ payload }) => ({
      error: payload.error
    })
  }

  typedBuildAction (actionParams) {
    if (actionParams[0] instanceof Error) {
      return this.errorBuilder(actionParams[0])
    }

    if (actionParams[0] instanceof Success) {
      return this.successBuilder(actionParams[0])
    }

    return false
  }

  matches (requestedAction) {
    return (
      super.matches(requestedAction) ||
      this.success.matches(requestedAction) ||
      this.error.matches(requestedAction)
    )
  }

  merge (state, action) {
    if (super.matches(action.type)) {
      return super.merge(state, action, { loading: true })
    }

    if (this.success.matches(action.type)) {
      return this.success.merge(state, action, { loading: false })
    }

    if (this.error.matches(action.type)) {
      return this.error.merge(state, action, { loading: false, error: null })
    }
  }
}
