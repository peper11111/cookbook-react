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
            <h1 className="o-typography__header o-typography__header--search">
              { this.$i18n.t('user.found') }
            </h1>
            <UserList type="users-search"/>
            <h1 className="o-typography__header o-typography__header--search">
              { this.$i18n.t('recipe.found') }
            </h1>
            <RecipeList type="recipes-search"/>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchPage
