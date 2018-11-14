import React from 'react'
import lazyLoad from '@/lazyLoad'
import '@/components/list/step-item.scss'

const FormInput = lazyLoad(() => import('@/components/form/form-input'))

class StepItem extends React.Component {
  render () {
    return (
      <div className={ `c-step-item ${!this.props.disabled ? 'c-step-item--center' : ''}` }>
        { this.props.disabled ? (
          <span className="c-step-item__index">
            { `${this.props.index + 1}.` }
          </span>
        ) : (
          <i
            className="material-icons c-step-item__remove"
            onClick={ () => this.props.onDelete(this.props.index) }
          >
            remove
          </i>
        ) }
        <FormInput
          className="c-step-item__label"
          disabled={ this.props.disabled }
          value={ this.props.step }
          onChange={ (value) => this.props.onChange(this.props.index, value) }
        />
      </div>
    )
  }
}

export default StepItem
