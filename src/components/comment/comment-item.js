import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import config from '@/config'
import lazyLoad from '@/lazyLoad'
import Editor from '@/mixins/editor'
import '@/components/comment/comment-item.scss'

const FormInput = lazyLoad(() => import('@/components/form/form-input'))

class CommentItem extends Editor {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      models: {
        content: null
      }
    }
  }

  avatarSrc () {
    return this.$helpers.thumbnailSrc(this.props.comment.avatarId) || config.blankAvatar
  }
  creationTime () {
    return moment(this.props.comment.creationTime).fromNow()
  }
  model () {
    return this.props.comment
  }
  render () {
    return (
      <div className="c-comment-item">
        <img
          alt=""
          src={ this.avatarSrc() }
          className="c-comment-item__image"
        />
        <div className="c-comment-item__wrapper">
          <div className="c-comment-item__row">
            <Link
              to={ `/user/${this.props.comment.author.id}` }
              className="c-comment-item__author"
            >
              { this.props.comment.author.username }
            </Link>
            <span className="c-comment-item__time">
              { this.creationTime() }
            </span>
          </div>
          <FormInput
            className="c-comment-item__content"
            disabled={ this.previewMode() }
            value={ this.state.models.content }
            onChange={ (value) => this.setState({ models: { ...this.state.models, content: value } }) }
          />
        </div>
      </div>
    )
  }
}

export default CommentItem
