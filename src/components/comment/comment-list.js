import React from 'react'
import Scroll from '@/mixins/scroll'
import '@/components/comment/comment-list.scss'

class CommentList extends Scroll {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      toggleVisible: this.state.showToggle
    }
    this.el = React.createRef()
  }
  getFetchMethod () {
    switch (this.props.type) {
      case 'recipe-comments':
        return this.$api.recipes.readComments(this.props.recipeId, { page: this.state.page })
      case 'comment-item':
        return this.$api.comments.readComments(this.props.parentId, { page: this.state.page })
      default:
        return Promise.resolve({ data: [] })
    }
  }
  loadComments () {
    this.setState({
      toggleVisible: false
    }, () => {
      this.init()
    })
  }
  render () {
    return (
      <div
        className="c-comment-list"
        ref={ this.el }
      >
        { this.state.toggleVisible &&
          <div
            className="c-comment-list__responses"
            onClick={ () => this.loadComments() }
          >
            <span>
              { this.$i18n.t('comment.load-responses', { count: this.props.commentsCount }) }
            </span>
          </div>
        }
      </div>
    )
  }
}

export default CommentList
