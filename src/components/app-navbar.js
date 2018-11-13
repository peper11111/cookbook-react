import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import lazyLoad from '@/lazyLoad'
import '@/components/app-navbar.scss'

const NavbarSearch = lazyLoad(() => import('@/components/navbar/navbar-search'))
const NavbarUser = lazyLoad(() => import('@/components/navbar/navbar-user'))

class AppNavbar extends React.Component {
  isActive (pathname) {
    return this.props.history.location.pathname === pathname
  }
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
        <NavbarSearch/>
        <div className="c-app-navbar__row">
          <Link
            to="/"
            className={ `c-app-navbar__item ${this.isActive('/') ? 'is-active' : ''}` }
          >
            <i className="material-icons">
              favorite
            </i>
          </Link>
          <Link
            to="/explore"
            className={ `c-app-navbar__item ${this.isActive('/explore') ? 'is-active' : ''}` }
          >
            <i className="material-icons">
              explore
            </i>
          </Link>
          <Link
            to="/favourite"
            className={ `c-app-navbar__item ${this.isActive('/favourite') ? 'is-active' : ''}` }
          >
            <i className="material-icons">
              book
            </i>
          </Link>
          <div className="c-app-navbar__separator"/>
          <NavbarUser/>
        </div>
      </nav>
    )
  }
}

export default withRouter(AppNavbar)
