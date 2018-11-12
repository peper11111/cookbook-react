import React from 'react'
import '@/components/app-modal.scss'

class AppModal extends React.Component {
  componentDidMount () {
    window.addEventListener('click', this.props.onClose)
  }
  componentWillUnmount () {
    window.removeEventListener('click', this.props.onClose)
  }
  render () {
    return (
      <div className={ `c-app-modal ${this.props.className}` }>
        <div
          className="c-app-modal__content"
          onClick={ (event) => event.stopPropagation() }
        >
          <div className="c-app-modal__header">
            { this.props.header }
          </div>
          <div className="c-app-modal__body">
            { this.props.body }
          </div>
          <div className="c-app-modal__footer">
            { this.props.footer }
          </div>
        </div>
      </div>
    )
  }
}

export default AppModal
