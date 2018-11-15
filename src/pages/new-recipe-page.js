import React from 'react'
import { connect } from 'react-redux'
import lazyLoad from '@/lazyLoad'
import { setRecipe } from '@/store/actions'

const RecipeDetails = lazyLoad(() => import('@/components/recipe/recipe-details'))

class NewRecipePage extends React.Component {
  componentDidMount () {
    this.init()
  }
  init () {
    this.props.dispatchSetRecipe({ author: this.props.authUser, ingredients: [], steps: [] })
  }
  render () {
    return (
      <div className="o-page">
        <div className="o-page__wrapper">
          <RecipeDetails initialMode="create"/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
  dispatchSetRecipe: (recipe) => dispatch(setRecipe(recipe))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewRecipePage)
