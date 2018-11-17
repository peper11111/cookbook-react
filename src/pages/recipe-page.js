import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import lazyLoad from '@/lazyLoad'
import Requester from '@/mixins/requester'
import { setRecipe } from '@/store/actions'

const CommentList = lazyLoad(() => import('@/components/comment/comment-list'))
const RecipeDetails = lazyLoad(() => import('@/components/recipe/recipe-details'))

class RecipePage extends Requester {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      recipeId: this.props.match.params.id
    }
  }
  componentDidMount () {
    this.fetchRecipe()
  }
  componentWillReceiveProps (newProps) {
    if (newProps.match.params.id !== this.state.recipeId) {
      this.setState({
        recipeId: newProps.match.params.id
      }, () => {
        this.fetchRecipe()
      })
    }
  }
  fetchRecipe () {
    this.wrap(() => {
      return this.$api.recipes.read(this.state.recipeId).then((value) => {
        this.props.dispatchSetRecipe(value.data)
      })
    })
  }
  render () {
    if (!this.state.pending) {
      return (
        <div className="o-page">
          <div className="o-page__wrapper">
            <RecipeDetails/>
            <div className="o-page__separator"/>
            <div className="o-page__container">
              <h1 className="o-typography__header">
                { this.$i18n.t('recipe.comments') }
              </h1>
              <CommentList
                inputVisible={ true }
                recipeId={ this.state.recipeId }
                onCancel={ () => null }
                type="recipe-comments"
              />
            </div>
          </div>
        </div>
      )
    } else {
      return (null)
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSetRecipe: (recipe) => dispatch(setRecipe(recipe))
})

export default withRouter(connect(null, mapDispatchToProps)(RecipePage))
