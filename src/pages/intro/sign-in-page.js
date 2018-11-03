import queryString from 'query-string'
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import form from '@/hoc/form'
import requester from '@/hoc/requester'

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
    const request = () => {
      const formData = new FormData()
      formData.set('login', this.state.login)
      formData.set('password', this.state.password)

      return this.$api.auth.login(formData).then(() => {
        return this.$helpers.fetchGlobalData()
      }).then(() => {
        this.$notify.success('sign-in-successful')
      })
    }
    this.wrap(request).then(() => {
      const query = queryString.parse(this.props.history.location.search)
      this.props.history.push(query.redirect || '/')
    })
  }
  render () {
    return (
      <div className="o-page o-page--intro">
        <div className="o-card">
          <h1 className="o-card__header">
            { this.$i18n.t('global.app') }
          </h1>
          <div className="o-page__separator o-page__separator--intro"/>
          <form
            className="o-form"
            onSubmit={ (event) => {
              event.preventDefault()
              this.signIn()
            } }
          >
            <input
              className="o-form__input o-form__input--full"
              onChange={ (event) => this.setState({ login: event.target.value })}
              placeholder={ this.$i18n.t('form.login') }
              type="text"
              value={ this.state.login }
            />
            <div className="o-form__wrapper">
              <input
                className="o-form__input o-form__input--full"
                onChange={ (event) => this.setState({ password: event.target.value }) }
                placeholder={ this.$i18n.t('form.password') }
                type={ this.getPasswordFieldType() }
                value={ this.state.password }
              />
              <div
                className={ `o-form__icon o-form__icon--toggle ${this.state.passwordVisible ? 'is-active' : ''}` }
                onClick={ () => this.togglePassword() }
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
              { this.$i18n.t('form.forgot-password') }
            </Link>
            <input
              className={ `o-button o-button__accent o-button--full ${this.state.pending ? 'is-disabled' : ''}`}
              type="submit"
              value={ this.$i18n.t('form.sign-in') }
            />
            <p className="o-form__footer">
              { this.$i18n.t('form.not-have-account') }
              <Link
                className="o-form__action"
                to="/register"
              >
                { this.$i18n.t('form.register') }
              </Link>
            </p>
          </form>
        </div>
      </div>
    )
  }
}

export default form(requester(withRouter(SignInPage)))
