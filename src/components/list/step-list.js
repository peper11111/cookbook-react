import React from 'react'
import '@/components/list/step-list.scss'

class StepList extends React.Component {
  addStep () {
    const steps = this.props.value.slice(0)
    steps.push('')
    this.props.onChange(steps)
  }
  render () {
    return (
      <div className="c-step-list">
        { !this.props.disabled &&
          <div
            className="c-step-list__add"
            onClick={ () => this.addStep() }
          >
            <i className="material-icons">
              add
            </i>
            <span className="c-step-list__text">
              { this.$i18n.t('list.add-step') }
            </span>
          </div>
        }
      </div>
    )
  }
}

export default StepList
