import React from 'react'

class FormInput extends React.Component {
  render () {
    if (this.props.disabled) {
      return (
        <div className={ this.props.className }>
          { this.props.value }
        </div>
      )
    } else {
      return (
        <input
          className={ `o-form__input ${this.props.className}` }
          maxLength={ this.props.maxlength || 255 }
          placeholder={ this.props.placeholder }
          value={ this.props.value || '' }
          onChange={ (event) => this.props.onChange(event.target.value) }
        />
      )
    }
  }
}

export default FormInput
