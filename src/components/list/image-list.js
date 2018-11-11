import React from 'react'
import { connect } from 'react-redux'
import config from '@/config'
import scroll from '@/hoc/scroll'
import ImageItem from '@/components/list/image-item'
import '@/components/list/image-list.scss'

class ImageList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      done: this.props.done,
      items: this.props.items,
      page: this.props.page,
      scrollParent: this.props.scrollParent,
      pending: this.props.pending
    }
    this.init = this.props.init.bind(this)
    this.getScrollParent = this.props.getScrollParent.bind(this)
    this.isScrollable = this.props.isScrollable.bind(this)
    this.fetchItems = this.props.fetchItems.bind(this)
    this.onScroll = this.props.onScroll.bind(this)
    this.wrap = this.props.wrap.bind(this)
    this.input = React.createRef()
    this.el = React.createRef()
  }
  componentDidMount () {
    this.init()
    const scrollParent = this.getScrollParent(this.el.current)
    scrollParent.addEventListener('scroll', this.onScroll)
    this.setState({ scrollParent: scrollParent })
  }
  componentWillUnmount () {
    this.state.scrollParent.removeEventListener('scroll', this.onScroll)
  }
  getFetchMethod () {
    return this.$api.users.readImages(this.props.authUser.id, { page: this.state.page }).then((value) => {
      this.setState({ page: this.state.page + 1 })
      return value
    })
  }
  uploadImage (event) {
    this.wrap(() => {
      const file = event.target.files[0]
      if (!file) {
        return Promise.resolve()
      }
      if (file.size > config.maxFileSize) {
        this.$notify.error('file-exceeds-limit')
        return Promise.resolve()
      }
      event.target.value = null
      const formData = new FormData()
      formData.set('file', file)
      return this.$api.uploads.create(formData).then(() => {
        this.$notify.success('image-created')
      })
    }).then(() => {
      this.init()
    })
  }
  deleteImage (id) {
    this.wrap(() => {
      if (!window.confirm(this.$i18n.t('list.image-delete'))) {
        return Promise.resolve()
      }
      if (this.value === id) {
        this.props.onInput(null)
      }
      return this.$api.uploads.delete(id).then(() => {
        this.$notify.success('image-deleted')
      })
    }).then(() => {
      this.init()
    })
  }
  selectImage (id) {
    this.props.onInput(id)
  }
  triggerInput () {
    this.input.current.click()
  }
  render () {
    return (
      <div
        className="c-image-list"
        ref={ this.el }
      >
        <input
          accept="image/*"
          className="u-hide"
          onChange={ (event) => this.uploadImage(event) }
          ref={ this.input }
          type="file"
        />
        <div
          className="c-image-list__new"
          onClick={ () => this.triggerInput() }
        >
          <i className="material-icons">
            add_circle_outline
          </i>
        </div>
        { this.state.items && this.state.items.map((image) => (
          <ImageItem
            key={ image.id }
            image={ image }
            selected={ this.props.value === image.id }
            onSelect={ () => this.selectImage(image.id) }
            onDelete={ () => this.deleteImage(image.id) }
          />
        )) }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth.user
})

export default scroll(connect(mapStateToProps)(ImageList))