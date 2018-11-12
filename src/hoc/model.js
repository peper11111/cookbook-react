import React from 'react'

export default function (WrappedComponent) {
  class Model extends React.Component {
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
    render () {
      return (
        <WrappedComponent
          { ...this.props }
          init={ this.init }
          getParams={ this.getParams }
          getUpdatedParams={ this.getUpdatedParams }
        />
      )
    }
  }
  return Model
}
