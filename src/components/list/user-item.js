import React from 'react'
import { Link } from 'react-router-dom'
import config from '@/config'
import '@/components/list/user-item.scss'

class UserItem extends React.Component {
  avatarSrc () {
    return this.$helpers.thumbnailSrc(this.props.user.avatarId) || config.blankAvatar
  }
  render () {
    return (
      <Link
        className="c-user-item"
        to={ `/user/${this.props.user.id}` }
      >
        <img
          alt=""
          className="c-user-item__image"
          src={ this.avatarSrc() }
        />
        <div className="c-user-item__content">
          <h1 className="c-user-item__username">
            { this.props.user.username }
          </h1>
          <p>
            { this.props.user.name }
          </p>
        </div>
      </Link>
    )
  }
}

export default UserItem
