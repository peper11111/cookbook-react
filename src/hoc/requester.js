import React from 'react'

export default function (WrappedComponent) {
  return class extends React.Component {
    constructor (props) {
      super(props)
      this.state = { pending: false }
    }
    wrap (request) {
      if (this.state.pending) {
        return
      }
      this.setState({ pending: true })
      request.finally(() => {
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
}
