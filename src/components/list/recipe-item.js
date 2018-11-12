import moment from 'moment'
import React from 'react'
import { withRouter } from 'react-router-dom'
import config from '@/config'
import '@/components/list/recipe-item.scss'

class RecipeItem extends React.Component {
  bannerSrc () {
    return this.$helpers.thumbnailSrc(this.props.recipe.bannerId) || config.blankBanner
  }
  creationTime () {
    return moment(this.props.recipe.creationTime).fromNow()
  }
  render () {
    return (
      <div
        className={ `c-recipe-item ${this.props.layout === 'grid' ? 'c-recipe-item--grid' : ''}` }
        onClick={ () => this.props.history.push(`/recipe/${this.props.recipe.id}`) }
      >
        <img
          alt=""
          className="c-recipe-item__image"
          src={ this.bannerSrc() }
        />
        <div className="c-recipe-item__wrapper">
          <div className="c-recipe-item__row">
            <span
              className="c-recipe-item__author"
              onClick={ () => this.props.history.push(`/user/${this.props.recipe.author.id}`) }
            >
              { this.props.recipe.author.username }
            </span>
            <span className="c-recipe-item__time">
              { this.creationTime() }
            </span>
          </div>
          <h1 className="c-recipe-item__title">
            { this.props.recipe.title }
          </h1>
          <p className="c-recipe-item__description">
            { this.props.recipe.description }
          </p>
          <div className="c-recipe-item__icons">
            <i className="material-icons">
              thumb_up
            </i>
            <span className="c-recipe-item__value">
              { this.props.recipe.likesCount || 0 }
            </span>
            <i className="material-icons">
              book
            </i>
            <span className="c-recipe-item__value">
              { this.props.recipe.favouritesCount || 0 }
            </span>
            <i className="material-icons">
              chat_bubble
            </i>
            <span className="c-recipe-item__value">
              { this.props.recipe.commentsCount || 0 }
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(RecipeItem)
