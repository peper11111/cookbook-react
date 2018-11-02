import queryString from 'query-string'
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import api from '@/api'
import helpers from '@/helpers'
import form from '@/hoc/form'
import requester from '@/hoc/requester'
import i18n from '@/i18n'
import notify from '@/notify'

class SignInPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      login: this.props.login,
      password: this.props.password,
      passwordVisible: this.props.passwordVisible,
      pending: this.props.pending
    }
    this.getPasswordFieldType = this.props.getPasswordFieldType.bind(this)
    this.togglePassword = this.props.togglePassword.bind(this)
    this.wrap = this.props.wrap.bind(this)
  }
  signIn () {
    const formData = new FormData()
    formData.set('login', this.state.login)
    formData.set('password', this.state.password)

    return api.auth.login(formData).then(() => {
      return helpers.fetchGlobalData()
    }).then(() => {
      notify.success('sign-in-successful')
      const history = this.props.history
      const query = queryString.parse(history.location.search)
      history.push(query.redirect || '/')
    })
  }
  render () {
    return (
      <div className="o-page o-page--intro">
        <div className="o-card">
          <h1 className="o-card__header">
            { i18n.t('global.app') }
          </h1>
          <div className="o-page__separator o-page__separator--intro"/>
          <form
            className="o-form"
            onSubmit={ (event) => {
              event.preventDefault()
              this.wrap(this.signIn())
            } }
          >
            <input
              className="o-form__input o-form__input--full"
              onChange={ (event) => this.setState({ login: event.target.value })}
              placeholder={ i18n.t('form.login') }
              type="text"
              value={ this.state.login }
            />
            <div className="o-form__wrapper">
              <input
                className="o-form__input o-form__input--full"
                onChange={ (event) => this.setState({ password: event.target.value }) }
                placeholder={ i18n.t('form.password') }
                type={ this.getPasswordFieldType() }
                value={ this.state.password }
              />
              <div
                className={ `o-form__icon o-form__icon--toggle ${this.state.passwordVisible ? 'is-active' : ''}` }
                onClick={ this.togglePassword }
              >
                <i className="material-icons">
                  { this.state.passwordVisible ? 'visibility' : 'visibility_off' }
                </i>
              </div>
            </div>
            <Link
              className="o-form__action o-form__action--secondary"
              to="/reset"
            >
              { i18n.t('form.forgot-password') }
            </Link>
            <input
              className={ `o-button o-button__accent o-button--full ${this.state.pending ? 'is-disabled' : ''}`}
              type="submit"
              value={ i18n.t('form.sign-in') }
            />
            <p className="o-form__footer">
              { i18n.t('form.not-have-account') }
              <Link
                className="o-form__action"
                to="/register"
              >
                { i18n.t('form.register') }
              </Link>
            </p>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(requester(form(SignInPage)))
