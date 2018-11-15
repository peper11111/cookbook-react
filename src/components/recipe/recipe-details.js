import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import config from '@/config'
import lazyLoad from '@/lazyLoad'
import Editor from '@/mixins/editor'
import { setRecipe } from '@/store/actions'
import '@/components/recipe/recipe-details.scss'

const DetailActions = lazyLoad(() => import('@/components/detail-actions'))
const ImagePicker = lazyLoad(() => import('@/components/form/image-picker'))
const IngredientList = lazyLoad(() => import('@/components/list/ingredient-list'))
const RecipeContent = lazyLoad(() => import('@/components/recipe/recipe-content'))
const RecipeInfo = lazyLoad(() => import('@/components/recipe/recipe-info'))
const StepList = lazyLoad(() => import('@/components/list/step-list'))

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
        difficulty: null,
        plates: null,
        preparationTime: null,
        steps: null,
        ingredients: null
      }
    }
  }
  model () {
    return this.props.recipe
  }
  isAuthor () {
    return this.props.recipe.author.id === this.props.authUser.id
  }
  create (params) {
    this.removeEmptyValues(params)
    return this.$api.recipes.create(params).then((value) => {
      this.$notify.success('recipe-create-successful')
      this.props.history.push(`/recipe/${value.data}`)
    })
  }
  modify (params) {
    this.removeEmptyValues(params)
    return this.$api.recipes.modify(this.props.recipe.id, params).then(() => {
      return this.$api.recipes.read(this.props.recipe.id)
    }).then((value) => {
      this.props.dispatchSetRecipe(value.data)
      this.$notify.success('recipe-update-successful')
    })
  }
  delete () {
    if (!window.confirm(this.$i18n.t('recipe.recipe-delete'))) {
      return Promise.resolve()
    }
    return this.$api.recipes.delete(this.props.recipe.id).then(() => {
      this.$notify.success('recipe-delete-successful')
      this.props.history.push(`/user/${this.props.recipe.author.id}`)
    })
  }
  removeEmptyValues (params) {
    if (params.ingredients) {
      params.ingredients = params.ingredients.filter((ingredient) => ingredient !== '')
    }
    if (params.steps) {
      params.steps = params.steps.filter((step) => step !== '')
    }
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
          <div className="o-page__separator"/>
          <div className="c-recipe-details__row">
            <div className="c-recipe-details__content">
              <h1 className="c-recipe-details__title">
                { this.$i18n.t('recipe.steps') }
              </h1>
              <StepList
                disabled={ this.previewMode() }
                steps={ this.state.models.steps }
                onChange={ (value) => this.setState({ models: { ...this.state.models, steps: value } }) }
              />
            </div>
            <div className="c-recipe-details__info">
              <h1 className="c-recipe-details__title">
                { this.$i18n.t('recipe.ingredients') }
              </h1>
              <IngredientList
                disabled={ this.previewMode() }
                ingredients={ this.state.models.ingredients }
                onChange={ (value) => this.setState({ models: { ...this.state.models, ingredients: value } }) }
              />
            </div>
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

const mapDispatchToProps = (dispatch) => ({
  dispatchSetRecipe: (recipe) => dispatch(setRecipe(recipe))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeDetails))
