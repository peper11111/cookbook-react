import queryString from 'query-string'
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Form from '@/mixins/form'

class ResetConfirmPage extends Form {
  resetConfirm () {
    this.wrap(() => {
      const query = queryString.parse(this.props.history.location.search)
      return this.$api.auth.resetConfirm({
        password: this.state.password,
        uuid: query.uuid
      }).then(() => {
        this.$notify.success('password-reset')
        this.props.history.push('/sign-in')
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
          <form
            onSubmit={ (event) => {
              event.preventDefault()
              this.resetConfirm()
            } }
            className="o-form"
          >
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
              value={ this.$i18n.t('form.change-password') }
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
        </div>
      </div>
    )
  }
}

export default withRouter(ResetConfirmPage)
