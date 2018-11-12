import React from 'react'
import RecipeFilters from '@/components/list/recipe-filters'

class HomePage extends React.Component {
  render () {
    return (
      <div className="o-page">
        <div className="o-page__wrapper o-page__wrapper--list">
          <div className="o-page__sidebar">
            <RecipeFilters/>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
