import React from 'react'
import { Link } from 'react-router-dom'
import form from '@/hoc/form'
import i18n from '@/i18n'

class SignInPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      login: this.props.login,
      password: this.props.password,
      passwordVisible: this.props.passwordVisible
    }
    this.getPasswordFieldType = this.props.getPasswordFieldType.bind(this)
    this.togglePassword = this.props.togglePassword.bind(this)
  }
  render () {
    return (
      <div className="o-page o-page--intro">
        <div className="o-card">
          <h1 className="o-card__header">
            { i18n.t('global.app') }
          </h1>
          <div className="o-page__separator o-page__separator--intro"/>
          <form className="o-form">
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
              className="o-button o-button__accent o-button--full"
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

export default form(SignInPage)
