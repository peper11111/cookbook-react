import React from 'react'
import { connect } from 'react-redux'
import config from '@/config'
import Requester from '@/mixins/requester'
import '@/components/form/comment-input.scss'

class CommentInput extends Requester {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      comment: ''
    }
  }
  avatarSrc () {
    return this.$helpers.thumbnailSrc(this.props.authUser.avatarId) || config.blankAvatar
  }
  createComment () {
    this.wrap(() => {
      return this.$api.comments.create({
        content: this.state.comment,
        recipeId: this.props.recipeId,
        parentId: this.props.parentId
      }).then(() => {
        this.setState({ comment: '' })
        this.$notify.success('comment-create-successful')
        this.props.onRefresh()
      })
    })
  }
  cancel () {
    this.setState({ comment: '' })
    this.props.onCancel()
  }
  render () {
    return (
      <div className="c-comment-input">
        <img
          alt=""
          src={ this.avatarSrc() }
          className="c-comment-input__image"
        />
        <div className="c-comment-input__wrapper">
          <input
            value={ this.state.comment }
            onChange={ (event) => this.setState({ comment: event.target.value }) }
            placeholder={ this.$i18n.t('comment.placeholder') }
            className="o-form__input o-form__input--full"
          />
          <div className="c-comment-input__buttons">
            <button
              className={ `o-button o-button__primary ${this.state.pending ? 'is-disabled' : ''}` }
              onClick={ () => this.cancel() }
            >
              { this.$i18n.t('global.cancel') }
            </button>
            <button
              className={ `o-button o-button__accent ${this.state.pending ? 'is-disabled' : ''}` }
              onClick={ () => this.createComment() }
            >
              { this.$i18n.t('global.comment') }
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth.user
})

export default connect(mapStateToProps)(CommentInput)
