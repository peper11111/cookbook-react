import React from 'react'
import Requester from '@/mixins/requester'
import '@/components/recipe/recipe-content.scss'

class RecipeContent extends Requester {
  render () {
    return (
      <div className={ `c-recipe-content ${this.props.className}` }>
      </div>
    )
  }
}

export default RecipeContent
