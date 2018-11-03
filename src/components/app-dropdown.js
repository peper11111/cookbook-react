import React from 'react'
import '@/components/app-dropdown.scss'

class AppDropdown extends React.Component {
  componentDidMount () {
    window.addEventListener('click', this.props.onClose)
  }
  componentWillUnmount () {
    window.removeEventListener('click', this.props.onClose)
  }
  render () {
    return (
      <div
        className={ `c-app-dropdown ${this.props.className}` }
        onClick={ (event) => {
          event.stopPropagation()
          this.props.onClick()
        } }
      >
        { this.props.body }
      </div>
    )
  }
}

export default AppDropdown
