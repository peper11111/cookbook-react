import React from 'react'
import lazyLoad from '@/lazyLoad'
import '@/components/form/image-picker.scss'

const AppModal = lazyLoad(() => import('@/components/app-modal'))
const ImageList = lazyLoad(() => import('@/components/list/image-list'))

class ImagePicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: this.props.value,
      modalVisible: false
    }
  }
  componentWillReceiveProps (nextProps) {
    this.setState({ selected: nextProps.value })
  }
  bannerSrc () {
    return this.$helpers.imageSrc(this.props.value) || this.props.blank
  }
  showModal () {
    this.setState({ modalVisible: true })
  }
  hideModal () {
    this.setState({ modalVisible: false })
  }
  onChange () {
    this.hideModal()
    this.props.onChange(this.state.selected)
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
            onClick={ (event) => {
              event.stopPropagation()
              this.showModal()
            } }
            className="c-image-picker__overlay"
          >
            <i className="material-icons">
              camera_alt
            </i>
          </div>
        }
        { !this.props.disabled && this.props.value &&
          <div
            onClick={ () => this.props.onChange(null) }
            className="c-image-picker__clear"
          >
            <i className="material-icons">
              clear
            </i>
          </div>
        }
        { this.state.modalVisible &&
          <AppModal
            onClose={ () => this.hideModal() }
            header={
              <h1>{ this.$i18n.t('list.images') }</h1>
            }
            body={
              <ImageList
                value={ this.state.selected }
                onChange={ (id) => this.setState({ selected: id }) }
                type="user-images"
              />
            }
            footer={
              <div>
                <div
                  className="o-button o-button__primary"
                  onClick={ () => this.hideModal() }
                >
                  { this.$i18n.t('global.cancel') }
                </div>
                <div
                  className="o-button o-button__accent"
                  onClick={ () => this.onChange() }
                >
                  { this.$i18n.t('global.select') }
                </div>
              </div>
            }
          />
        }
      </div>
    )
  }
}

export default ImagePicker
