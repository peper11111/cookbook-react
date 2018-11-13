import React from 'react'
import lazyLoad from '@/lazyLoad'

const RecipeFilters = lazyLoad(() => import('@/components/list/recipe-filters'))
const RecipeList = lazyLoad(() => import('@/components/list/recipe-list'))

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
