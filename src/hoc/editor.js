import React from 'react'
import model from '@/hoc/model'
import requester from '@/hoc/requester'

const Mode = {
  CREATE: 'create',
  EDIT: 'edit',
  PREVIEW: 'preview'
}

export default function (WrappedComponent) {
  class Editor extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        mode: this.props.initialMode || Mode.PREVIEW
      }
    }
    createMode () {
      return this.state.mode === Mode.CREATE
    }
    editMode () {
      return this.state.mode === Mode.EDIT
    }
    previewMode () {
      return this.state.mode === Mode.PREVIEW
    }
    onAction (action) {
      switch (action) {
        case 'edit':
          this.setState({ mode: Mode.EDIT })
          break
        case 'clear':
          this.init()
          this.setState({ mode: Mode.PREVIEW })
          break
        case 'create':
          this.wrap(() => {
            return this.create(this.getUpdatedParams())
          })
          break
        case 'save':
          this.wrap(() => {
            return this.modify(this.getUpdatedParams())
          }).then(() => {
            this.setState({ mode: Mode.PREVIEW })
          })
          break
        case 'delete':
          this.wrap(() => {
            return this.delete()
          })
          break
        default:
          break
      }
    }
    render () {
      return (
        <WrappedComponent
          { ...this.props }
          { ...this.state }
          createMode={ this.createMode }
          editMode={ this.editMode }
          previewMode={ this.previewMode }
          onAction={ this.onAction }
        />
      )
    }
  }
  return model(requester(Editor))
}
