import React from 'react'
import '@/components/list/image-item.scss'

class ImageItem extends React.Component {
  bannerSrc () {
    return this.$helpers.thumbnailSrc(this.props.image.id)
  }
  render () {
    return (
      <div className={ `c-image-item ${this.props.selected ? 'is-selected' : ''}` }>
        <img
          alt=""
          className="c-image-item__image"
          onClick={ () => this.props.onSelect() }
          src={ this.bannerSrc() }
        />
        <div
          className="c-image-item__delete"
          onClick={ () => this.props.onDelete() }
        >
          <i className="material-icons">
            clear
          </i>
        </div>
      </div>
    )
  }
}

export default ImageItem
