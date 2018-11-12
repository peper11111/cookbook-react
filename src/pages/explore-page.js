import React from 'react'
import RecipeFilters from '@/components/list/recipe-filters'
import RecipeList from '@/components/list/recipe-list'

class ExplorePage extends React.Component {
  render () {
    return (
      <div className="o-page">
        <div className="o-page__wrapper o-page__wrapper--list">
          <div className="o-page__sidebar">
            <RecipeFilters/>
          </div>
          <div className="o-page__container">
            <RecipeList type="recipes"/>
          </div>
        </div>
      </div>
    )
  }
}

export default ExplorePage
