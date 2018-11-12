import queryString from 'query-string'
import React from 'react'
import { withRouter } from 'react-router-dom'
import RecipeButtons from '@/components/list/recipe-buttons'
import RecipeItem from '@/components/list/recipe-item'
import Scroll from '@/mixins/scroll'
import '@/components/list/recipe-list.scss'

class RecipeList extends Scroll {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      layout: 'grid',
      search: this.props.history.location.search
    }
    this.el = React.createRef()
  }
  componentWillReceiveProps (newProps) {
    if (newProps.history.location.search !== this.state.search) {
      this.setState({
        search: newProps.history.location.search
      }, () => {
        this.init()
      })
    }
  }
  getFetchMethod () {
    const query = queryString.parse(this.state.search)
    switch (this.props.type) {
      case 'recipes':
        return this.$api.recipes.readAll({ ...query, page: this.state.page })
      case 'recipes-search':
        return this.$api.recipes.search({ ...query, page: this.state.page })
      case 'user-recipes':
        return this.$api.users.readRecipes(this.props.userId, { page: this.state.page })
      case 'user-recommended':
        return this.$api.users.readRecommended(this.props.userId, { ...query, page: this.state.page })
      case 'user-favourites':
        return this.$api.users.readFavourites(this.props.userId, { ...query, page: this.state.page })
      default:
        return Promise.resolve({ data: [] })
    }
  }
  render () {
    if (this.state.items.length !== 0) {
      return (
        <div
          className="c-recipe-list"
          ref={ this.el }
        >
          <RecipeButtons
            layout={ this.state.layout }
            onChange={ (layout) => this.setState({ layout: layout }) }
          />
          <div className="c-recipe-list__wrapper">
            { this.state.items.map((recipe) => (
              <RecipeItem
                key={ recipe.id }
                recipe={ recipe }
                layout={ this.state.layout }
              />
            )) }
          </div>
        </div>
      )
    } else {
      return (
        <div
          className="c-recipe-list__text"
          ref={ this.el }
        >
          { this.$i18n.t('list.no-recipes') }
        </div>
      )
    }
  }
}

export default withRouter(RecipeList)
