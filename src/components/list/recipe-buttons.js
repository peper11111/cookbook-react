import React from 'react'
import '@/components/list/recipe-buttons.scss'

class RecipeButtons extends React.Component {
  isActiveLayout (layout) {
    return this.props.layout === layout
  }
  setActiveLayout (layout) {
    this.props.onChange(layout)
  }
  render () {
    return (
      <div className="c-recipe-buttons">
        <i
          className={ `material-icons ${this.isActiveLayout('list') ? 'is-active' : ''}` }
          onClick={ () => this.setActiveLayout('list') }
        >
          view_list
        </i>
        <i
          className={ `material-icons ${this.isActiveLayout('grid') ? 'is-active' : ''}` }
          onClick={ () => this.setActiveLayout('grid') }
        >
          view_module
        </i>
      </div>
    )
  }
}

export default RecipeButtons
