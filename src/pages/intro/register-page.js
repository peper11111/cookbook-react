import React from 'react'
import { Link } from 'react-router-dom'
import form from '@/hoc/form'
import requester from '@/hoc/requester'

class RegisterPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      email: this.props.email,
      username: this.props.username,
      password: this.props.password,
      passwordVisible: this.props.passwordVisible,
      pending: this.props.pending
    }
    this.getPasswordFieldType = this.props.getPasswordFieldType.bind(this)
    this.generatePassword = this.props.generatePassword.bind(this)
    this.togglePassword = this.props.togglePassword.bind(this)
    this.wrap = this.props.wrap.bind(this)
  }
  register () {
    this.wrap(() => {
      return this.$api.auth.register({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      }).then(() => {
        this.setState({ done: true })
      })
    })
  }
  registerResend () {
    this.wrap(() => {
      return this.$api.auth.registerResend({
        login: this.state.username
      }).then(() => {
        this.$notify.info('message-resend')
      })
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
          { !this.state.done ? (
            <form
              className="o-form"
              onSubmit={ (event) => {
                event.preventDefault()
                this.register()
              } }
            >
              <input
                className="o-form__input o-form__input--full"
                onChange={ (event) => this.setState({ email: event.target.value }) }
                placeholder={ this.$i18n.t('form.email') }
                value={ this.state.email }
                type="email"
              />
              <input
                className="o-form__input o-form__input--full"
                onChange={ (event) => this.setState({ username: event.target.value }) }
                placeholder={ this.$i18n.t('form.username') }
                value={ this.state.username }
                type="text"
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
              <p
                className="o-form__action o-form__action--secondary"
                onClick={ () => this.generatePassword() }
              >
                { this.$i18n.t('form.generate-password') }
              </p>
              <input
                className={ `o-button o-button__accent o-button--full ${this.state.pending ? 'is-disabled' : ''}`}
                type="submit"
                value={ this.$i18n.t('form.register') }
              />
              <p className="o-form__footer">
                { this.$i18n.t('form.have-account') }
                <Link
                  className="o-form__action"
                  to="/sign-in"
                >
                  { this.$i18n.t('form.sign-in') }
                </Link>
              </p>
            </form>
          ) : (
            <div>
              <p className="o-card__message">
                <i className="o-card__check material-icons">
                  check_circle_outline
                </i>
                { this.$i18n.t('form.account-activation-email-sent') }
              </p>
              <div
                className={ `o-button o-button__accent o-button--full ${this.state.pending ? 'is-disabled' : ''}` }
                onClick={ () => this.registerResend() }
              >
                { this.$i18n.t('form.resend-email') }
              </div>
            </div>
          ) }
        </div>
      </div>
    )
  }
}

export default form(requester(RegisterPage))
