import queryString from 'query-string'
import React from 'react'
import { withRouter } from 'react-router-dom'
import requester from '@/hoc/requester'

class RegisterVerifyPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pending: this.props.pending
    }
    this.wrap = this.props.wrap.bind(this)
  }
  componentDidMount () {
    this.registerVerify()
  }
  registerVerify () {
    this.wrap(() => {
      const query = queryString.parse(this.props.history.location.search)
      return this.$api.auth.registerVerify({
        uuid: query.uuid
      }).then(() => {
        this.$notify.success('user-verified')
      })
    }).then(() => {
      this.props.history.push('/sign-in')
    })
  }
  render () {
    return (
      <div className="o-page"/>
    )
  }
}

export default requester(withRouter(RegisterVerifyPage))
