import React from 'react'
import { withRouter } from 'react-router-dom'
import Requester from '@/mixins/requester'

class RegisterVerifyPage extends Requester {
  componentDidMount () {
    this.registerVerify()
  }
  registerVerify () {
    this.wrap(() => {
      const query = this.$helpers.parse(this.props.history.location.search)
      return this.$api.auth.registerVerify({
        uuid: query.uuid
      }).then(() => {
        this.$notify.success('user-verified')
        this.props.history.push('/sign-in')
      })
    })
  }
  render () {
    return (
      <div className="o-page"/>
    )
  }
}

export default withRouter(RegisterVerifyPage)
