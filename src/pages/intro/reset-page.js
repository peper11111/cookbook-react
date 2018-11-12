import React from 'react'
import { Link } from 'react-router-dom'
import Form from '@/mixins/form'

class ResetPage extends Form {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      done: false
    }
  }
  reset () {
    this.wrap(() => {
      return this.$api.auth.reset({
        login: this.state.login
      }).then(() => {
        this.setState({ done: true })
      })
    })
  }
  resetResend () {
    this.wrap(() => {
      return this.$api.auth.resetResend({
        login: this.state.login
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
              onSubmit={ (event) => {
                event.preventDefault()
                this.reset()
              } }
              className="o-form"
            >
              <input
                className="o-form__input o-form__input--full"
                onChange={ (event) => this.setState({ login: event.target.value }) }
                placeholder={ this.$i18n.t('form.login') }
                type="text"
                value={ this.state.login }
              />
              <input
                className={ `o-button o-button__accent o-button--full ${this.state.pending ? 'is-disabled' : ''}`}
                type="submit"
                value={ this.$i18n.t('form.reset-password') }
              />
              <p className="o-form__footer">
                { this.$i18n.t('form.remember-password') }
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
                { this.$i18n.t('form.password-reset-email-sent') }
              </p>
              <div
                className={ `o-button o-button__accent o-button--full ${this.state.pending ? 'is-disabled' : ''}` }
                onClick={ () => this.resetResend() }
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

export default ResetPage
