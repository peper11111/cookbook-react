import React from 'react'
import lazyLoad from '@/lazyLoad'
import '@/components/list/step-list.scss'

const StepItem = lazyLoad(() => import('@/components/list/step-item'))

class StepList extends React.Component {
  addStep () {
    const steps = this.props.steps.slice(0)
    steps.push('')
    this.props.onChange(steps)
  }
  deleteStep (index) {
    const steps = this.props.steps.slice(0)
    steps.splice(index, 1)
    this.props.onChange(steps)
  }
  modifyStep (index, value) {
    const steps = this.props.steps.slice(0)
    steps[index] = value
    this.props.onChange(steps)
  }
  render () {
    return (
      <div className="c-step-list">
        { this.props.steps.map((step, index) => (
          <StepItem
            key={ index }
            step={ step }
            index={ index }
            disabled={ this.props.disabled }
            onDelete={ (index) => this.deleteStep(index) }
            onChange={ (index, value) => this.modifyStep(index, value) }
          />
        )) }
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
