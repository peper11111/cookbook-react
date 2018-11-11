import React from 'react'
import { connect } from 'react-redux'
import '@/components/user/user-content.scss'

class UserContent extends React.Component {
  render () {
    return (
      <div className={ `c-user-content ${this.props.className}` }>
        <div className="c-user-content__row">
          <h1 className="c-user-content__username">
            { this.props.user.username }
          </h1>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth.user,
  user: state.user
})

export default connect(mapStateToProps)(UserContent)
