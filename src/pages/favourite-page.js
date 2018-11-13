import React from 'react'
import { connect } from 'react-redux'
import lazyLoad from '@/lazyLoad'

const RecipeFilters = lazyLoad(() => import('@/components/list/recipe-filters'))
const RecipeList = lazyLoad(() => import('@/components/list/recipe-list'))

class FavouritePage extends React.Component {
  render () {
    return (
      <div className="o-page">
        <div className="o-page__wrapper o-page__wrapper--list">
          <div className="o-page__sidebar">
            <RecipeFilters/>
          </div>
          <div className="o-page__container">
            <RecipeList
              userId={ this.props.authUser.id }
              type="user-favourites"
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth.user
})

export default connect(mapStateToProps)(FavouritePage)
