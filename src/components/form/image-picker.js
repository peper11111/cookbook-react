import React from 'react'
import AppModal from '@/components/app-modal'
import ImageList from '@/components/list/image-list'
import '@/components/form/image-picker.scss'

class ImagePicker extends React.Component {
  static getDerivedStateFromProps (nextProps, prevState) {
    const nextState = {}
    if (prevState.selected !== nextProps.value) {
      nextState.selected = nextProps.value
    }
    return nextState
  }
  constructor (props) {
    super(props)
    this.state = {
      selected: this.props.value,
      modalVisible: false
    }
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
  onInput () {
    this.hideModal()
    this.props.onInput(this.state.selected)
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
            onClick={ () => this.props.onInput() }
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
                onInput={ (id) => this.setState({ selected: id }) }
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
                  onClick={ () => this.onInput() }
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
