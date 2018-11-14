import React from 'react'

class FormSelect extends React.Component {
  label () {
    return this.props.options.find((option) => {
      return this.isSelected(option)
    }).label
  }
  isSelected (option) {
    return String(option.value) === String(this.props.value)
  }
  onChange (event) {
    this.props.onChange(event.target.value)
  }
  render () {
    if (this.props.disabled) {
      return (
        <div className={ this.props.className }>
          { this.label() }
        </div>
      )
    } else {
      return (
        <select
          onChange={ (event) => this.onChange(event) }
          className={ `o-form__select ${this.props.className}` }
          value={ this.props.value || '' }
        >
          <option value=""/>
          { this.props.options.map((option) => (
            <option
              key={ option.value }
              value={ option.value }
            >
              { option.label }
            </option>
          )) }
        </select>
      )
    }
  }
}

export default FormSelect
