import React from 'react'
import { connect } from 'react-redux'
import config from '@/config'
import lazyLoad from '@/lazyLoad'
import Editor from '@/mixins/editor'
import '@/components/recipe/recipe-details.scss'

const DetailActions = lazyLoad(() => import('@/components/detail-actions'))
const ImagePicker = lazyLoad(() => import('@/components/form/image-picker'))
const RecipeContent = lazyLoad(() => import('@/components/recipe/recipe-content'))
const RecipeInfo = lazyLoad(() => import('@/components/recipe/recipe-info'))

class RecipeDetails extends Editor {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      models: {
        bannerId: null,
        title: null,
        description: null,
        cuisineId: null,
        categoryId: null,
        difficulty: null
      }
    }
  }
  model () {
    return this.props.recipe
  }
  isAuthor () {
    return this.props.recipe.author.id === this.props.authUser.id
  }
  render () {
    return (
      <div className="c-recipe-details">
        <DetailActions
          disabled={ this.state.pending }
          canEdit={ this.isAuthor() }
          canDelete={ this.isAuthor() }
          editMode={ this.editMode() }
          createMode={ this.createMode() }
          previewMode={ this.previewMode() }
          onAction={ (type) => this.onAction(type) }
        />
        <ImagePicker
          blank={ config.blankBanner }
          className="c-recipe-details__banner"
          disabled={ this.previewMode() }
          value={ this.state.models.bannerId }
          onChange={ (value) => this.setState({ models: { ...this.state.models, bannerId: value } }) }
        />
        <div className="c-recipe-details__wrapper">
          <div className="c-recipe-details__row">
            <RecipeContent
              models={ this.state.models }
              onChange={ (models) => this.setState({ models: { ...this.state.models, ...models } }) }
              createMode={ this.createMode() }
              previewMode={ this.previewMode() }
              className="c-recipe-details__content"
            />
            <RecipeInfo
              models={ this.state.models }
              onChange={ (models) => this.setState({ models: { ...this.state.models, ...models } }) }
              previewMode={ this.previewMode() }
              className="c-recipe-details__info"
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth.user,
  recipe: state.recipe
})

export default connect(mapStateToProps)(RecipeDetails)
