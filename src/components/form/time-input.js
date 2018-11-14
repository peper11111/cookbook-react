import React from 'react'
import '@/components/form/time-input.scss'

class TimeInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.value,
      hours: Math.trunc(this.props.value / 60) || null,
      minutes: Math.trunc(this.props.value % 60) || null
    }
  }
  componentWillReceiveProps (newProps) {
    if (newProps.value !== this.state.value) {
      this.setState({
        value: newProps.value,
        hours: Math.trunc(newProps.value / 60) || null,
        minutes: Math.trunc(newProps.value % 60) || null
      })
    }
  }
  setHours (event) {
    if (this.props.disabled) {
      return
    }
    const value = event.target.value ? Number(event.target.value) : null
    if (value >= 0 && value <= 23) {
      this.setState({
        hours: value
      }, () => {
        this.emitValue()
      })
    }
  }
  setMinutes (event) {
    if (this.props.disabled) {
      return
    }
    const value = event.target.value ? Number(event.target.value) : null
    if (value >= 0 && value <= 59) {
      this.setState({
        minutes: value
      }, () => {
        this.emitValue()
      })
    }
  }
  emitValue () {
    const val = Number(this.state.hours) * 60 + Number(this.state.minutes)
    this.props.onChange(val)
  }
  text () {
    let text = ''
    if (this.state.hours) {
      text += `${this.state.hours} h`
    }
    if (this.state.hours && this.state.minutes) {
      text += ' '
    }
    if (this.state.minutes) {
      text += `${this.state.minutes} min`
    }
    return text
  }
  render () {
    if (this.props.disabled) {
      return (
        <div className={ this.props.className }>
          { this.text() }
        </div>
      )
    } else {
      return (
        <div className={ `c-time-input ${this.props.className}` }>
          <input
            value={ this.state.hours || '' }
            onChange={ (event) => this.setHours(event) }
            className="c-time-input__value o-form__input"
          />
          <span className="c-time-input__label">
            h
          </span>
          <input
            value={ this.state.minutes || '' }
            onChange={ (event) => this.setMinutes(event) }
            className="c-time-input__value o-form__input"
          />
          <span className="c-time-input__label">
            min
          </span>
        </div>
      )
    }
  }
}

export default TimeInput
