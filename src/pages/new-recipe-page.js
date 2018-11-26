import React from 'react'
import { connect } from 'react-redux'
import lazyLoad from '@/lazyLoad'
import Requester from '@/mixins/requester'
import { setRecipe } from '@/store/actions'

const RecipeDetails = lazyLoad(() => import('@/components/recipe/recipe-details'))

class NewRecipePage extends Requester {
  componentDidMount () {
    this.fetchRecipe()
  }
  fetchRecipe () {
    this.wrap(() => {
      this.props.dispatchSetRecipe({ author: this.props.authUser, ingredients: [], steps: [] })
      return Promise.resolve()
    })
  }
  render () {
    if (!this.state.pending) {
      return (
        <div className="o-page">
          <div className="o-page__wrapper">
            <RecipeDetails initialMode="create"/>
          </div>
        </div>
      )
    } else {
      return (null)
    }
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
  dispatchSetRecipe: (recipe) => dispatch(setRecipe(recipe))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewRecipePage)
