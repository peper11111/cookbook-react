import Requester from '@/mixins/requester'

class Model extends Requester {
  componentDidMount () {
    this.init()
  }
  init () {
    const model = this.model()
    const models = {}
    for (const key in this.state.models) {
      if (!this.state.models.hasOwnProperty(key)) {
        continue
      }
      models[key] = model[key]
    }
    this.setState({ models })
  }
  getParams () {
    const params = {}
    for (const key in this.state.models) {
      if (!this.state.models.hasOwnProperty(key)) {
        continue
      }
      if (this.state.models[key]) {
        params[key] = this.state.models[key]
      }
    }
    return params
  }
  getUpdatedParams () {
    const model = this.model()
    const params = {}
    for (const key in this.state.models) {
      if (!this.state.models.hasOwnProperty(key)) {
        continue
      }
      if (this.state.models[key] !== model[key]) {
        params[key] = this.state.models[key]
      }
    }
    return params
  }
}

export default Model
