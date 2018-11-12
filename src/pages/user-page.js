import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import RecipeList from '@/components/list/recipe-list'
import UserDetails from '@/components/user/user-details'
import Requester from '@/mixins/requester'
import { setUser } from '@/store/actions'

class UserPage extends Requester {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      userId: this.props.match.params.id
    }
  }
  componentDidMount () {
    this.fetchUser()
  }
  componentWillReceiveProps (newProps) {
    if (newProps.match.params.id !== this.state.userId) {
      this.setState({
        userId: newProps.match.params.id
      }, () => {
        this.fetchUser()
      })
    }
  }
  fetchUser () {
    this.wrap(() => {
      return this.$api.users.read(this.state.userId).then((value) => {
        this.props.dispatchSetUser(value.data)
      })
    })
  }
  render () {
    if (!this.state.pending) {
      return (
        <div className="o-page">
          <div className="o-page__wrapper">
            <UserDetails/>
            <div className="o-page__separator"/>
            <div className="o-page__container">
              <h1 className="o-typography__header o-typography__header--list">
                { this.$i18n.t('list.recipes') }
              </h1>
              <RecipeList
                userId={ this.state.userId }
                type="user-recipes"
              />
            </div>
          </div>
        </div>
      )
    } else {
      return (null)
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  dispatchSetUser: (user) => dispatch(setUser(user))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPage))
