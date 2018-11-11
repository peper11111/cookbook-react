import React from 'react'

class FormTextarea extends React.Component {
  render () {
    if (this.props.disabled) {
      return (
        <div className={ this.props.className }>
          { this.props.value }
        </div>
      )
    } else {
      return (
        <textarea
          className={ `o-form__textarea ${this.props.className}` }
          maxLength={ this.props.maxlength || 255 }
          rows={ this.props.rows || 3 }
          placeholder={ this.props.placeholder }
          value={ this.props.value }
          onChange={ (event) => this.props.onChange(event.target.value) }
        />
      )
    }
  }
}

export default FormTextarea
