import React from 'react'
import UserDetails from '@/components/user/user-details'
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
            <UserDetails/>
          </div>
        </div>
      )
    } else {
      return (null)
    }
  }
}

export default requester(UserPage)
