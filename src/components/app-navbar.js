import React from 'react'
import { Link } from 'react-router-dom'
import '@/components/app-navbar.scss'

class AppNavbar extends React.Component {
  render () {
    return (
      <nav className="c-app-navbar">
        <Link
          className="c-app-navbar__row c-app-navbar__row--clickable"
          to="/"
        >
          <img
            className="c-app-navbar__logo"
            src="/static/logo-light.png"
            alt=""
          />
          <div className="c-app-navbar__separator"/>
          <span className="c-app-navbar__brand">
            { this.$i18n.t('global.app') }
          </span>
        </Link>
        <div className="c-app-navbar__row">
          <Link
            to="/"
            className="c-app-navbar__item"
          >
            <i className="material-icons">
              favorite
            </i>
          </Link>
          <Link
            to="/explore"
            className="c-app-navbar__item"
          >
            <i className="material-icons">
              explore
            </i>
          </Link>
          <Link
            to="/favourite"
            className="c-app-navbar__item"
          >
            <i className="material-icons">
              book
            </i>
          </Link>
        </div>
      </nav>
    )
  }
}

export default AppNavbar
