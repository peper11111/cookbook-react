import React from 'react'
import lazyLoad from '@/lazyLoad'
import Scroll from '@/mixins/scroll'
import '@/components/comment/comment-list.scss'

const CommentItem = lazyLoad(() => import('@/components/comment/comment-item'))
const CommentInput = lazyLoad(() => import('@/components/form/comment-input'))

class CommentList extends Scroll {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      toggleVisible: this.props.showToggle
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
  refreshComments () {
    this.props.onCancel()
    this.init()
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
        { this.props.inputVisible &&
          <CommentInput
            parentId={ this.props.parentId }
            recipeId={ this.props.recipeId }
            onRefresh={ () => this.refreshComments() }
            onCancel={ () => this.props.onCancel() }
          />
        }
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
        <div className="c-comment-list__wrapper">
          { this.state.items.map((comment) => (
            <CommentItem
              comment={ comment }
              key={ comment.id }
              recipeId={ this.props.recipeId }
              onRefresh={ () => this.init() }
            />
          )) }
        </div>
      </div>
    )
  }
}

export default CommentList
