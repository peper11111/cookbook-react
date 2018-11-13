import React from 'react'
import lazyLoad from '@/lazyLoad'

const RecipeList = lazyLoad(() => import('@/components/list/recipe-list'))
const UserList = lazyLoad(() => import('@/components/list/user-list'))

class SearchPage extends React.Component {
  render () {
    return (
      <div className="o-page">
        <div className="o-page__wrapper o-page__wrapper--list">
          <div className="o-page__container">
            <UserList type="users-search"/>
            <RecipeList type="recipes-search"/>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchPage
