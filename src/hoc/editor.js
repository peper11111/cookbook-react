import React from 'react'
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
    init () {
      for (const key in this.state.models) {
        if (!this.state.models.hasOwnProperty(key)) {
          continue
        }
        this.setState({ models: {
          [key]: this.model()[key]
        } })
      }
    }
    getParams () {
      const params = {}
      for (const key in this.state.models) {
        if (!this.state.models.hasOwnProperty(key)) {
          continue
        }
        if (this.state.models[key] !== this.model()[key]) {
          params[key] = this.state.models[key]
        }
      }
      return params
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
          this.create(this.getParams())
          break
        case 'save':
          this.modify(this.getParams()).then(() => {
            this.setState({ mode: Mode.PREVIEW })
          })
          break
        case 'delete':
          this.delete()
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
          init={ this.init }
          getParams={ this.getParams }
          onAction={ this.onAction }
        />
      )
    }
  }
  return requester(Editor)
}
