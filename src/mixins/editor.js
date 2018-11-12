import Model from '@/mixins/model'

const Mode = {
  CREATE: 'create',
  EDIT: 'edit',
  PREVIEW: 'preview'
}

class Editor extends Model {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
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
}

export default Editor
