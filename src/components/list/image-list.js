import React from 'react'
import config from '@/config'
import requester from '@/hoc/requester'
import '@/components/list/image-list.scss'

class ImageList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pending: this.props.pending
    }
    this.wrap = this.props.wrap.bind(this)
    this.input = React.createRef()
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
    })
  }
  triggerInput () {
    this.input.current.click()
  }
  render () {
    return (
      <div className="c-image-list">
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
      </div>
    )
  }
}

export default requester(ImageList)
