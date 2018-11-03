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
      </div>
    )
  }
}

export default ImagePicker
