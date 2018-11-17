import React from 'react'
import '@/components/comment/comment-actions.scss'

class CommentActions extends React.Component {
  onAction (type) {
    if (this.props.disabled) {
      return
    }
    this.props.onAction(type)
  }
  render () {
    return (
      <div className="c-comment-actions">
        { (this.props.previewMode && this.props.canEdit) &&
          <span
            className="c-comment-actions__item"
            onClick={ () => this.onAction('edit') }
          >
            { this.$i18n.t('global.edit') }
          </span>
        }
        { (this.props.previewMode && this.props.canDelete) &&
          <span
            className="c-comment-actions__item"
            onClick={ () => this.onAction('delete') }
          >
            { this.$i18n.t('global.delete') }
          </span>
        }
        { this.props.previewMode &&
          <span
            className="c-comment-actions__item"
            onClick={ () => this.props.onReply() }
          >
            { this.$i18n.t('global.reply') }
          </span>
        }
        { (this.props.editMode) &&
          <span
            className="c-comment-actions__item"
            onClick={ () => this.onAction('save') }
          >
            { this.$i18n.t('global.save') }
          </span>
        }
        { (this.props.editMode) &&
          <span
            className="c-comment-actions__item"
            onClick={ () => this.onAction('clear') }
          >
            { this.$i18n.t('global.cancel') }
          </span>
        }
      </div>
    )
  }
}

export default CommentActions
