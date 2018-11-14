import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import lazyLoad from '@/lazyLoad'
import Requseter from '@/mixins/requester'
import { setRecipe } from '@/store/actions'

const RecipeDetails = lazyLoad(() => import('@/components/recipe/recipe-details'))

class RecipePage extends Requseter {
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
