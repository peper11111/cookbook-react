import React from 'react'
import i18n from '@/i18n'

class SignInPage extends React.Component {
  render () {
    return (
      <div className="o-page o-page--intro">
        <div className="o-card">
          <h1 className="o-card__header">
            { i18n.t('global.app') }
          </h1>
          <div className="o-page__separator o-page__separator--intro"></div>
          <form className="o-form">
            <input
              placeholder={ i18n.t('form.login') }
              className="o-form__input o-form__input--full"
              type="text"
            />
          </form>
        </div>
      </div>
    )
  }
}

export default SignInPage
