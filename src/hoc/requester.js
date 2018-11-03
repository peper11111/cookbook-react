import React from 'react'

export default function (WrappedComponent) {
  class Requester extends React.Component {
    constructor (props) {
      super(props)
      this.state = { pending: false }
    }
    wrap (request) {
      if (this.state.pending) {
        return Promise.reject(new Error('Request already pending'))
      }
      this.setState({ pending: true })
      return request().finally(() => {
        this.setState({ pending: false })
      })
    }
    render () {
      return (
        <WrappedComponent
          { ...this.props }
          { ...this.state }
          wrap={ this.wrap }
        />
      )
    }
  }
  return Requester
}
