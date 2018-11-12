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
      userId: this.props.match.params.id,
      pending: this.props.pending
    }
    this.wrap = this.props.wrap.bind(this)
  }
  componentDidMount () {
    this.fetchUser()
  }
  componentWillReceiveProps (newProps) {
    if (newProps.match.params.id !== this.state.userId) {
      this.setState({
        userId: newProps.match.params.id
      }, () => {
        this.fetchUser()
      })
    }
  }
  fetchUser () {
    this.wrap(() => {
      return this.$api.users.read(this.state.userId).then((value) => {
        this.props.dispatchSetUser(value.data)
      })
    })
  }
  render () {
    if (!this.state.pending) {
      return (
        <div className="o-page">
          <div className="o-page__wrapper">
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
