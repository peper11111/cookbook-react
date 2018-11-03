import React from 'react'
import '@/components/detail-actions.scss'

class DetailActions extends React.Component {
  onAction (type) {
    if (this.props.disabled) {
      return
    }
    this.props.onAction(type)
  }
  render () {
    return (
      <div className="c-detail-actions">
        { (this.props.previewMode && this.props.canDelete) &&
          <button
            className={ `o-button o-button--fab o-button__primary ${this.props.disabled ? 'is-disabled' : ''}` }
            onClick={ () => this.onAction('delete') }
          >
            <i className="material-icons">
              delete
            </i>
          </button>
        }
        { (this.props.previewMode && this.props.canEdit) &&
          <button
            className={ `o-button o-button--fab o-button__accent ${this.props.disabled ? 'is-disabled' : ''}` }
            onClick={ () => this.onAction('edit') }
          >
            <i className="material-icons">
              edit
            </i>
          </button>
        }
        { this.props.editMode &&
          <button
            className={ `o-button o-button--fab o-button__primary ${this.props.disabled ? 'is-disabled' : ''}` }
            onClick={ () => this.onAction('clear') }
          >
            <i className="material-icons">
              clear
            </i>
          </button>
        }
        { (this.props.createMode || this.props.editMode) &&
          <button
            className={ `o-button o-button--fab o-button__accent ${this.props.disabled ? 'is-disabled' : ''}` }
            onClick={ () => this.onAction(this.props.createMode ? 'create' : 'save') }
          >
            <i className="material-icons">
              save
            </i>
          </button>
        }
      </div>
    )
  }
}

export default DetailActions
