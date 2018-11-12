import queryString from 'query-string'
import React from 'react'
import { withRouter } from 'react-router-dom'
import UserItem from '@/components/list/user-item'
import Scroll from '@/mixins/scroll'
import '@/components/list/user-list.scss'

class UserList extends Scroll {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      search: this.props.history.location.search
    }
    this.el = React.createRef()
  }
  componentWillReceiveProps (newProps) {
    if (newProps.history.location.search !== this.state.search) {
      this.setState({
        search: newProps.history.location.search
      }, () => {
        this.init()
      })
    }
  }
  getFetchMethod () {
    const query = queryString.parse(this.state.search)
    switch (this.props.type) {
      case 'users-search':
        return this.$api.users.search({ ...query, page: this.state.page })
      default:
        return Promise.resolve({ data: [] })
    }
  }
  render () {
    return (
      <div
        className="c-user-list"
        ref={ this.el }
      >
        { this.state.items.map((user) => (
          <UserItem
            key={ user.id }
            user={ user }
          />
        )) }
      </div>
    )
  }
}

export default withRouter(UserList)
