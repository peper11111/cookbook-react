import queryString from 'query-string'
import React from 'react'
import { withRouter } from 'react-router-dom'
import lazyLoad from '@/lazyLoad'
import Scroll from '@/mixins/scroll'
import '@/components/list/user-list.scss'

const UserItem = lazyLoad(() => import('@/components/list/user-item'))

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
    if (this.state.items.length !== 0) {
      return (
        <div
          className="c-user-list"
          ref={ this.el }
        >
          <div className="c-user-list__wrapper">
            { this.state.items.map((user) => (
              <UserItem
                key={ user.id }
                user={ user }
              />
            )) }
          </div>
        </div>
      )
    } else {
      return (
        <div
          className="c-user-list__text"
          ref={ this.el }
        >
          { this.$i18n.t('list.no-users') }
        </div>
      )
    }
  }
}

export default withRouter(UserList)
