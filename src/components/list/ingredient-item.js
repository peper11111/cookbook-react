import React from 'react'
import lazyLoad from '@/lazyLoad'
import '@/components/list/ingredient-item.scss'

const FormInput = lazyLoad(() => import('@/components/form/form-input'))

class IngredientItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      checked: false
    }
  }
  render () {
    return (
      <div className={ `c-ingredient-item ${!this.props.disabled ? 'c-ingredient-item--center' : ''}` }>
        { this.props.disabled ? (
          <i
            className={ `material-icons c-ingredient-item__icon ${this.state.checked && this.props.disabled ? 'is-checked' : ''}` }
            onClick={ () => this.setState({ checked: !this.state.checked })}
          >
            { this.state.checked ? 'check_box' : 'check_box_outline_blank' }
          </i>
        ) : (
          <i
            className="material-icons c-ingredient-item__remove"
            onClick={ () => this.props.onDelete(this.props.index) }
          >
            remove
          </i>
        ) }
        <FormInput
          className={ `c-ingredient-item__label ${this.state.checked && this.props.disabled ? 'is-checked' : ''}` }
          disabled={ this.props.disabled }
          value={ this.props.ingredient }
          onChange={ (value) => this.props.onChange(this.props.index, value) }
        />
      </div>
    )
  }
}

export default IngredientItem
