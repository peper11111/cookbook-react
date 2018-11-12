import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import config from '@/config'
import '@/components/list/recipe-item.scss'

class RecipeItem extends React.Component {
  bannerSrc () {
    return this.$helpers.thumbnailSrc(this.props.recipe.bannerId) || config.blankBanner
  }
  creationTime () {
    return moment(this.recipe.creationTime).fromNow()
  }
  render () {
    return (
      <Link
        className={ `c-recipe-item ${this.props.layout === 'grid' ? 'c-recipe-item--grid' : ''}` }
        to={ `/recipe/${this.props.recipe.id}` }
      >
        <img
          alt=""
          className="c-recipe-item__image"
          src={ this.bannerSrc() }
        />
      </Link>
    )
  }
}

export default RecipeItem
