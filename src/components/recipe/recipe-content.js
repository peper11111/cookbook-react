import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import lazyLoad from '@/lazyLoad'
import Requester from '@/mixins/requester'
import { setRecipe } from '@/store/actions'
import '@/components/recipe/recipe-content.scss'

const FormInput = lazyLoad(() => import('@/components/form/form-input'))
const FormTextarea = lazyLoad(() => import('@/components/form/form-textarea'))

class RecipeContent extends Requester {
  creationTime () {
    return moment(this.props.recipe.creationTime).fromNow()
  }
  canPerformAction () {
    return this.props.recipe.author.id !== this.props.authUser.id
  }
  like () {
    if (!this.canPerformAction()) {
      return
    }
    this.wrap(() => {
      return this.$api.recipes.like(this.props.recipe.id).then(() => {
        return this.$api.recipes.read(this.props.recipe.id)
      }).then((value) => {
        this.props.dispatchSetRecipe(value.data)
        this.$notify.info(this.props.recipe.isLiked ? 'recipe-like' : 'recipe-unlike')
      })
    })
  }
  favourite () {
    if (!this.canPerformAction()) {
      return
    }
    this.wrap(() => {
      return this.$api.recipes.favourite(this.props.recipe.id).then(() => {
        return this.$api.recipes.read(this.props.recipe.id)
      }).then((value) => {
        this.props.dispatchSetRecipe(value.data)
        this.$notify.info(this.props.recipe.isFavourite ? 'recipe-favourite' : 'recipe-unfavourite')
      })
    })
  }
  render () {
    return (
      <div className={ `c-recipe-content ${this.props.className}` }>
        { !this.props.createMode &&
          <div className="c-recipe-content__row">
            <Link
              className="c-recipe-content__author"
              to={ `/user/${this.props.recipe.author.id}` }
            >
              { this.props.recipe.author.username }
            </Link>
            <span className="c-recipe-content__time">
              { this.creationTime() }
            </span>
          </div>
        }
        <FormInput
          value={ this.props.models.title }
          onChange={ (value) => this.props.onChange({ title: value }) }
          disabled={ this.props.previewMode }
          placeholder={ this.$i18n.t('recipe.placeholder.title') }
          className="c-recipe-content__title"
        />
        <FormTextarea
          value={ this.props.models.description }
          onChange={ (value) => this.props.onChange({ description: value }) }
          disabled={ this.props.previewMode }
          placeholder={ this.$i18n.t('recipe.placeholder.description') }
          className="c-recipe-content__description"
        />
        { !this.props.createMode &&
          <div className="c-recipe-content__summary">
            <i
              className={ `material-icons ${this.props.recipe.isLiked ? 'is-active' : ''} ${this.canPerformAction() ? 'c-recipe-content__action' : ''}` }
              onClick={ () => this.like() }
            >
              thumb_up
            </i>
            <span className="c-recipe-content__value">
              { this.props.recipe.likesCount || 0 }
            </span>
            <i
              className={ `material-icons ${this.props.recipe.isFavourite ? 'is-active' : ''} ${this.canPerformAction() ? 'c-recipe-content__action' : ''}` }
              onClick={ () => this.favourite() }
            >
              book
            </i>
            <span className="c-recipe-content__value">
              { this.props.recipe.favouritesCount || 0 }
            </span>
            <i className="material-icons">
              chat_bubble
            </i>
            <span className="c-recipe-content__value">
              { this.props.recipe.commentsCount || 0 }
            </span>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth.user,
  recipe: state.recipe
})

const mapDispatchToProps = (dispatch) => ({
  dispatchSetRecipe: (recipe) => dispatch(setRecipe(recipe))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeContent)
