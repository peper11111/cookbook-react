import Requester from '@/mixins/requester'

class Model extends Requester {
  componentDidMount () {
    this.init()
  }
  init () {
    const models = {}
    for (const key in this.state.models) {
      if (!this.state.models.hasOwnProperty(key)) {
        continue
      }
      models[key] = this.model()[key]
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
    const params = {}
    for (const key in this.state.models) {
      if (!this.state.models.hasOwnProperty(key)) {
        continue
      }
      if (this.state.models[key] !== this.model()[key]) {
        params[key] = this.state.models[key]
      }
    }
    return params
  }
}

export default Model
