import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import UserDetails from '@/components/user/user-details'
import requester from '@/hoc/requester'
import { setUser } from '@/store/actions'

class UserPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pending: this.props.pending
    }
    this.wrap = this.props.wrap.bind(this)
  }
  componentDidMount () {
    this.fetchUser()
  }
  fetchUser () {
    this.wrap(() => {
      return this.$api.users.read(this.props.match.params.id).then((value) => {
        this.props.dispatchSetUser(value.data)
      })
    })
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

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  dispatchSetUser: (user) => dispatch(setUser(user))
})

export default requester(withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPage)))
