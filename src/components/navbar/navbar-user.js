import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import config from '@/config'
import lazyLoad from '@/lazyLoad'
import Requester from '@/mixins/requester'
import { signOut } from '@/store/actions'
import '@/components/navbar/navbar-user.scss'

const AppDropdown = lazyLoad(() => import('@/components/app-dropdown'))

class NavbarUser extends Requester {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      dropdownVisible: false
    }
  }
  imageSrc () {
    return this.$helpers.thumbnailSrc(this.props.authUser.avatarId) || config.blankAvatar
  }
  signOut () {
    this.wrap(() => {
      return this.$api.auth.logout().then(() => {
        this.props.dispatchSignOut()
        this.$notify.success('sign-out-successful')
        this.props.history.push('/sign-in')
      })
    })
  }
  toggleDropdown () {
    this.setState({ dropdownVisible: !this.state.dropdownVisible })
  }
  hideDropdown () {
    this.setState({ dropdownVisible: false })
  }
  render () {
    return (
      <div className="c-navbar-user">
        <div
          className="c-navbar-user__toggle"
          onClick={ (event) => {
            event.stopPropagation()
            this.toggleDropdown()
          } }
        >
          <span className="c-navbar-user__username">
            { this.props.authUser.username }
          </span>
          <img
            alt=""
            className="c-navbar-user__image"
            src={ this.imageSrc() }
          />
          { this.state.dropdownVisible &&
            <AppDropdown
              className="c-navbar-user__dropdown"
              onClose={ () => this.hideDropdown() }
              onClick={ () => this.hideDropdown() }
              body={
                <ul className="c-navbar-user__list">
                  <Link
                    className="c-navbar-user__item"
                    to={ `/user/${this.props.authUser.id}` }
                  >
                    { this.$i18n.t('navbar.profile') }
                  </Link>
                  <Link
                    className="c-navbar-user__item"
                    to="/new-recipe"
                  >
                    { this.$i18n.t('navbar.new-recipe') }
                  </Link>
                  <div className="c-navbar-user__separator"/>
                  <div
                    onClick={ () => this.signOut() }
                    className="c-navbar-user__item"
                  >
                    { this.$i18n.t('navbar.sign-out') }
                  </div>
                </ul>
              }
            />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
  dispatchSignOut: () => dispatch(signOut())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavbarUser))
