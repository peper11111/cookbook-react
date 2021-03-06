import React from 'react'
import { connect } from 'react-redux'
import lazyLoad from '@/lazyLoad'
import Requester from '@/mixins/requester'
import { setUser } from '@/store/actions'
import '@/components/user/user-content.scss'

const FormInput = lazyLoad(() => import('@/components/form/form-input'))
const FormTextarea = lazyLoad(() => import('@/components/form/form-textarea'))

class UserContent extends Requester {
  canPerformAction () {
    return this.props.previewMode && this.props.authUser.id !== this.props.user.id
  }
  follow () {
    this.wrap(() => {
      return this.$api.users.follow(this.props.user.id).then(() => {
        return this.$api.users.read(this.props.user.id)
      }).then((value) => {
        this.props.dispatchSetUser(value.data)
        this.$notify.info(this.props.user.isFollowed ? 'user-follow' : 'user-unfollow')
      })
    })
  }
  render () {
    return (
      <div className={ `c-user-content ${this.props.className}` }>
        <div className="c-user-content__row">
          <h1 className="c-user-content__username">
            { this.props.user.username }
          </h1>
          { this.canPerformAction() &&
            <button
              className={ `o-button ${this.props.user.isFollowed ? 'o-button__primary' : 'o-button__accent'} ${this.state.pending ? 'is-disabled' : ''}`}
              onClick={ () => this.follow() }
            >
              { this.props.user.isFollowed ? this.$i18n.t('user.unfollow') : this.$i18n.t('user.follow') }
            </button>
          }
        </div>
        <div className="c-user-content__row">
          <span className="c-user-content__value">
            { this.props.user.recipesCount || 0 }
          </span>
          <span className="c-user-content__label">
            { this.$i18n.t('user.recipes') }
          </span>
          <span className="c-user-content__value">
            { this.props.user.followersCount || 0 }
          </span>
          <span className="c-user-content__label">
            { this.$i18n.t('user.followers') }
          </span>
          <span className="c-user-content__value">
            { this.props.user.followedCount || 0 }
          </span>
          <span className="c-user-content__label">
            { this.$i18n.t('user.followed') }
          </span>
        </div>
        <FormInput
          value={ this.props.models.name }
          onChange={ (value) => this.props.onChange({ name: value }) }
          className="c-user-content__row c-user-content__name"
          disabled={ this.props.previewMode }
          placeholder={ this.$i18n.t('user.placeholder.name') }
        />
        <FormTextarea
          value={ this.props.models.biography }
          onChange={ (value) => this.props.onChange({ biography: value }) }
          className="c-user-content__row"
          disabled={ this.props.previewMode }
          placeholder={ this.$i18n.t('user.placeholder.biography') }
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth.user,
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  dispatchSetUser: (user) => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserContent)
