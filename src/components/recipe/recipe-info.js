import React from 'react'
import { connect } from 'react-redux'
import lazyLoad from '@/lazyLoad'
import '@/components/recipe/recipe-info.scss'

const FormSelect = lazyLoad(() => import('@/components/form/form-select'))

class RecipeInfo extends React.Component {
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
  render () {
    return (
      <div className={ `c-recipe-info ${this.props.className}` }>
        <div className="c-recipe-info__item">
          <span className="c-recipe-info__label">
            { this.$i18n.t('recipe.cuisine-type') }
          </span>
          <FormSelect
            className="c-recipe-info__value"
            options={ this.cuisines() }
            disabled={ this.props.previewMode }
            value={ this.props.models.cuisineId }
            onChange={ (value) => this.props.onChange({ cuisineId: value }) }
          />
        </div>
        <div className="c-recipe-info__item">
          <span className="c-recipe-info__label">
            { this.$i18n.t('recipe.category-type') }
          </span>
          <FormSelect
            className="c-recipe-info__value"
            options={ this.categories() }
            disabled={ this.props.previewMode }
            value={ this.props.models.categoryId }
            onChange={ (value) => this.props.onChange({ categoryId: value }) }
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cuisines: state.cuisines,
  categories: state.categories
})

export default connect(mapStateToProps)(RecipeInfo)
