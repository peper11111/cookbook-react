import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import config from '@/config'
import lazyLoad from '@/lazyLoad'
import Editor from '@/mixins/editor'
import '@/components/comment/comment-item.scss'

const CommentActions = lazyLoad(() => import('@/components/comment/comment-actions'))
const CommentList = lazyLoad(() => import('@/components/comment/comment-list'))
const FormInput = lazyLoad(() => import('@/components/form/form-input'))

class CommentItem extends Editor {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      inputVisible: false,
      models: {
        content: null
      }
    }
  }
  model () {
    return this.props.comment
  }
  isAuthor () {
    return this.props.comment.author.id === this.props.authUser.id
  }
  avatarSrc () {
    return this.$helpers.thumbnailSrc(this.props.comment.avatarId) || config.blankAvatar
  }
  creationTime () {
    return moment(this.props.comment.creationTime).fromNow()
  }
  modify (params) {
    return this.$api.comments.modify(this.props.comment.id, params).then(() => {
      this.$notify.success('comment-update-successful')
      this.props.onRefresh()
    })
  }
  delete () {
    if (!window.confirm(this.$i18n.t('comment.comment-delete'))) {
      return Promise.resolve()
    }
    return this.$api.comments.delete(this.props.comment.id).then(() => {
      this.$notify.success('comment-delete-successful')
      this.props.onRefresh()
    })
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
          <CommentActions
            disabled={ this.state.pending }
            canEdit={ this.isAuthor() }
            canDelete={ this.isAuthor() }
            editMode={ this.editMode() }
            previewMode={ this.previewMode() }
            onAction={ (type) => this.onAction(type) }
            onReply={ () => this.setState({ inputVisible: true })}
          />
          <CommentList
            autoInit={ false }
            inputVisible={ this.state.inputVisible }
            showToggle={ this.props.comment.commentsCount !== 0 }
            parentId={ this.props.comment.id }
            commentsCount={ this.props.comment.commentsCount }
            recipeId={ this.props.recipeId }
            onCancel={ () => this.setState({ inputVisible: false }) }
            type="comment-item"
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth.user
})

export default connect(mapStateToProps)(CommentItem)
