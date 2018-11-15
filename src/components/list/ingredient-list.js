import React from 'react'
import lazyLoad from '@/lazyLoad'
import '@/components/list/ingredient-list.scss'

const IngredientItem = lazyLoad(() => import('@/components/list/ingredient-item'))

class IngredientList extends React.Component {
  addIngredient () {
    const ingredients = this.props.ingredients.slice(0)
    ingredients.push('')
    this.props.onChange(ingredients)
  }
  deleteIngredient (index) {
    const ingredients = this.props.ingredients.slice(0)
    ingredients.splice(index, 1)
    this.props.onChange(ingredients)
  }
  modifyIngredient (index, value) {
    const ingredients = this.props.ingredients.slice(0)
    ingredients[index] = value
    this.props.onChange(ingredients)
  }
  render () {
    return (
      <div className="c-ingredient-list">
        { this.props.ingredients.map((ingredient, index) => (
          <IngredientItem
            key={ index }
            ingredient={ ingredient }
            index={ index }
            disabled={ this.props.disabled }
            onDelete={ (index) => this.deleteIngredient(index) }
            onChange={ (index, value) => this.modifyIngredient(index, value) }
          />
        )) }
        { !this.props.disabled &&
          <div
            className="c-ingredient-list__add"
            onClick={ () => this.addIngredient() }
          >
            <i className="material-icons">
              add
            </i>
            <span className="c-ingredient-list__text">
              { this.$i18n.t('list.add-ingredient') }
            </span>
          </div>
        }
      </div>
    )
  }
}

export default IngredientList
