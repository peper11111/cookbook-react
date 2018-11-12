import React from 'react'
import '@/components/form/rating-bar.scss'

class RatingBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visibleValue: this.props.value
    }
  }
  componentWillReceiveProps (newProps) {
    if (newProps.value !== this.state.visibleValue) {
      this.setState({
        visibleValue: newProps.value
      })
    }
  }
  isActive (val) {
    return val <= this.state.visibleValue
  }
  setVisibleValue (val) {
    if (this.disabled) {
      return
    }
    this.setState({ visibleValue: val })
  }
  onClick (val) {
    if (this.disabled) {
      return
    }
    this.props.onChange(val !== this.props.value ? val : null)
  }
  render () {
    return (
      <div
        className={ `c-rating-bar ${this.props.disabled ? 'is-disabled' : ''}` }
        onMouseLeave={ () => this.setVisibleValue(this.props.value) }
      >
        { [...Array(this.props.size || 5).keys()].map((i) => i + 1).map((i) => (
          <div
            key={ i }
            className={ `c-rating-bar__item ${this.isActive(i) ? 'is-active' : ''}` }
            onMouseEnter={ () => this.setVisibleValue(i) }
            onClick={ () => this.onClick(i) }
          >
            <i className="material-icons">
              star
            </i>
          </div>
        )) }
      </div>
    )
  }
}

export default RatingBar
