import { Component } from 'react'

class Requester extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      pending: false
    }
  }
  wrap (request) {
    return new Promise((resolve, reject) => {
      if (this.state.pending) {
        reject(new Error('Request already pending'))
      }
      this.setState({ pending: true }, () => {
        request().finally(() => {
          this.setState({ pending: false }, () => {
            resolve()
          })
        })
      })
    })
  }
}

export default Requester
