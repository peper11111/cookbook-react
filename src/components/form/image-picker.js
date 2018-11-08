import React from 'react'
import '@/components/form/image-picker.scss'

class ImagePicker extends React.Component {
  bannerSrc () {
    return this.$helpers.imageSrc(this.props.value) || this.props.blank
  }
  render () {
    return (
      <div className={ `c-image-picker ${this.props.className}`}>
        <img
          alt=""
          className="c-image-picker__image"
          src={ this.bannerSrc() }
        />
        { !this.props.disabled &&
          <div
            onClick={ () => this.showModal() }
            className="c-image-picker__overlay"
          >
            <i className="material-icons">
              camera_alt
            </i>
          </div>
        }
        {
          !this.props.disabled && this.props.value &&
          <div
            onClick={ () => this.props.onInput() }
            className="c-image-picker__clear"
          >
            <i className="material-icons">
              clear
            </i>
          </div>
        }
      </div>
    )
  }
}

export default ImagePicker
