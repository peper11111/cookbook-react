import React from 'react'
import RecipeList from '@/components/list/recipe-list'

class SearchPage extends React.Component {
  render () {
    return (
      <div className="o-page">
        <div className="o-page__wrapper o-page__wrapper--list">
          <div className="o-page__container">
            <RecipeList type="recipes-search"/>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchPage
