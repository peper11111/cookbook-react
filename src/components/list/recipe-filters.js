import queryString from 'query-string'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import FormSelect from '@/components/form/form-select'
import Model from '@/mixins/model'
import '@/components/list/recipe-filters.scss'

class RecipeFilters extends Model {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      search: this.props.history.location.search,
      models: {
        cuisineId: null
      }
    }
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
  model () {
    return queryString.parse(this.props.history.location.search)
  }
  cuisines () {
    return this.props.cuisines.map((cuisine) => {
      return {
        value: cuisine.id,
        label: cuisine.name
      }
    })
  }
  clearFiltering () {
    this.props.history.push({
      pathname: this.props.history.location.pathname,
      search: ''
    })
  }
  updateFiltering () {
    this.props.history.push({
      pathname: this.props.history.location.pathname,
      search: queryString.stringify(this.getParams())
    })
  }
  render () {
    return (
      <div className="c-recipe-filters">
        <h1 className="c-recipe-filters__title">
          { this.$i18n.t('recipe.filtering') }
        </h1>
        <div className="c-recipe-filters__header">
          { this.$i18n.t('recipe.cuisine-type') }
        </div>
        <FormSelect
          value={ this.state.models.cuisineId }
          options={ this.cuisines() }
          onChange={ (cuisineId) => this.setState({ models: { ...this.state.models, cuisineId: cuisineId } }) }
        />
        <div className="c-recipe-filters__row c-recipe-filters__buttons">
          <button
            onClick={ () => this.clearFiltering() }
            className="o-button o-button__primary"
          >
            { this.$i18n.t('global.clear') }
          </button>
          <button
            onClick={ () => this.updateFiltering() }
            className="o-button o-button__accent"
          >
            { this.$i18n.t('recipe.filter') }
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cuisines: state.cuisines
})

export default withRouter(connect(mapStateToProps)(RecipeFilters))
