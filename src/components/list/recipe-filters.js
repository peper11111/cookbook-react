import queryString from 'query-string'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import lazyLoad from '@/lazyLoad'
import Model from '@/mixins/model'
import '@/components/list/recipe-filters.scss'

const FormSelect = lazyLoad(() => import('@/components/form/form-select'))
const FormInput = lazyLoad(() => import('@/components/form/form-input'))
const RatingBar = lazyLoad(() => import('@/components/form/rating-bar'))
const TimeInput = lazyLoad(() => import('@/components/form/time-input'))

class RecipeFilters extends Model {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      search: this.props.history.location.search,
      models: {
        cuisineId: null,
        categoryId: null,
        minDifficulty: null,
        maxDifficulty: null,
        minPlates: null,
        maxPlates: null,
        minPreparationTime: null,
        maxPreparationTime: null
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
    return queryString.parse(this.state.search)
  }
  cuisines () {
    return this.props.cuisines.map((cuisine) => {
      return {
        value: cuisine.id,
        label: cuisine.name
      }
    })
  }
  categories () {
    return this.props.categories.map((category) => {
      return {
        value: category.id,
        label: category.name
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
        <h1 className="o-typography__header">
          { this.$i18n.t('recipe.filtering') }
        </h1>
        <div className="c-recipe-filters__header">
          { this.$i18n.t('recipe.cuisine-type') }
        </div>
        <FormSelect
          value={ this.state.models.cuisineId }
          options={ this.cuisines() }
          onChange={ (value) => this.setState({ models: { ...this.state.models, cuisineId: value } }) }
        />
        <div className="c-recipe-filters__header">
          { this.$i18n.t('recipe.category-type') }
        </div>
        <FormSelect
          value={ this.state.models.categoryId }
          options={ this.categories() }
          onChange={ (value) => this.setState({ models: { ...this.state.models, categoryId: value } }) }
        />
        <div className="c-recipe-filters__header">
          { this.$i18n.t('recipe.difficulty') }
        </div>
        <div className="c-recipe-filters__row">
          <span className="c-recipe-filters__label">
            { this.$i18n.t('global.from') }
          </span>
          <RatingBar
            value={ this.state.models.minDifficulty }
            onChange={ (value) => this.setState({ models: { ...this.state.models, minDifficulty: value } }) }
          />
        </div>
        <div className="c-recipe-filters__row">
          <span className="c-recipe-filters__label">
            { this.$i18n.t('global.to') }
          </span>
          <RatingBar
            value={ this.state.models.maxDifficulty }
            onChange={ (value) => this.setState({ models: { ...this.state.models, maxDifficulty: value } }) }
          />
        </div>
        <div className="c-recipe-filters__header">
          { this.$i18n.t('recipe.plates') }
        </div>
        <div className="c-recipe-filters__row">
          <span className="c-recipe-filters__label">
            { this.$i18n.t('global.from') }
          </span>
          <FormInput
            value={ this.state.models.minPlates }
            onChange={ (value) => this.setState({ models: { ...this.state.models, minPlates: value } }) }
          />
        </div>
        <div className="c-recipe-filters__row">
          <span className="c-recipe-filters__label">
            { this.$i18n.t('global.to') }
          </span>
          <FormInput
            value={ this.state.models.maxPlates }
            onChange={ (value) => this.setState({ models: { ...this.state.models, maxPlates: value } }) }
          />
        </div>
        <div className="c-recipe-filters__header">
          { this.$i18n.t('recipe.preparation-time') }
        </div>
        <div className="c-recipe-filters__row">
          <span className="c-recipe-filters__label">
            { this.$i18n.t('global.from') }
          </span>
          <TimeInput
            value={ this.state.models.minPreparationTime }
            onChange={ (value) => this.setState({ models: { ...this.state.models, minPreparationTime: value } }) }
          />
        </div>
        <div className="c-recipe-filters__row">
          <span className="c-recipe-filters__label">
            { this.$i18n.t('global.to') }
          </span>
          <TimeInput
            value={ this.state.models.maxPreparationTime }
            onChange={ (value) => this.setState({ models: { ...this.state.models, maxPreparationTime: value } }) }
          />
        </div>
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
  cuisines: state.cuisines,
  categories: state.categories
})

export default withRouter(connect(mapStateToProps)(RecipeFilters))
