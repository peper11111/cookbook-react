import React from 'react'
import requester from '@/hoc/requester'

class UserPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pending: this.props.pending
    }
    this.wrap = this.props.wrap.bind(this)
  }
  render () {
    if (!this.state.pending) {
      return (
        <div className="o-page">
          <div className="o-page__wrapper o-page__wrapper--top">
          </div>
        </div>
      )
    } else {
      return (null)
    }
  }
}

export default requester(UserPage)
