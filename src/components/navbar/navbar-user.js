import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import requester from '@/hoc/requester'
import { signOut } from '@/store/actions'

class NavbarUser extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pending: this.props.pending
    }
    this.wrap = this.props.wrap.bind(this)
  }
  signOut () {
    const request = () => {
      return this.$api.auth.logout().then(() => {
        this.props.dispatchSignOut()
        this.$notify.success('sign-out-successful')
      })
    }
    this.wrap(request).then(() => {
      this.props.history.push('/sign-in')
    })
  }
  render () {
    return (
      <div
        onClick={ () => this.signOut() }
      >Log out</div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSignOut: () => dispatch(signOut())
})

export default requester(withRouter(connect(null, mapDispatchToProps)(NavbarUser)))
