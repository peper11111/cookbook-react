import React from 'react'
import { withRouter } from 'react-router-dom'
import Model from '@/mixins/model'
import '@/components/navbar/navbar-search.scss'

class NavbarSearch extends Model {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      search: this.props.history.location.search,
      models: {
        query: null
      }
    }
  }
  componentWillReceiveProps (newProps) {
    if (newProps.history.location.search !== this.state.search) {
      this.setState({
        search: newProps.history.location.search
      }, () => {
        this.init()
      })
    }
  }
  model () {
    return this.$helpers.parse(this.state.search)
  }
  submit () {
    const query = this.state.models.query || ''
    if (!query || query.length < 3) {
      this.$notify.error('query-too-short')
      return
    }
    this.props.history.push({
      pathname: '/search',
      search: this.$helpers.stringify(this.getParams())
    })
  }
  render () {
    return (
      <form
        className="c-navbar-search o-form"
        onSubmit={ (event) => {
          event.preventDefault()
          this.submit()
        } }
      >
        <div className="o-form__wrapper">
          <input
            value={ this.state.models.query || '' }
            onChange={ (event) => this.setState({ models: { ...this.state.models, query: event.target.value } }) }
            placeholder={ this.$i18n.t('form.search') }
            className="c-navbar-search__input o-form__input o-form__input--full"
          />
          <div
            className="c-navbar-search__icon o-form__icon"
            onClick={ () => this.submit() }
          >
            <i className="material-icons">
              search
            </i>
          </div>
        </div>
      </form>
    )
  }
}

export default withRouter(NavbarSearch)
