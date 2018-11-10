import React from 'react'
import config from '@/config'
import requester from '@/hoc/requester'

export default function (WrappedComponent) {
  class Scroll extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        done: null,
        items: null,
        page: null,
        scrollParent: null
      }
    }
    getScrollParent (element) {
      if (!element || element === document.body) {
        return document.body
      }
      return this.isScrollable(element) ? element : this.getScrollParent(element.parentElement)
    }
    isScrollable (element) {
      const regex = /(auto|scroll)/
      const elementStyle = getComputedStyle(element)
      return regex.test(elementStyle.getPropertyValue('overflow')) ||
        regex.test(elementStyle.getPropertyValue('overflow-y')) ||
        regex.test(elementStyle.getPropertyValue('overflow-x'))
    }
    init () {
      this.setState({
        done: false,
        items: [],
        page: 1
      })
      this.fetchItems()
    }
    fetchItems () {
      this.wrap(() => {
        return this.getFetchMethod().then((value) => {
          this.setState({ items: [ ...this.state.items, ...value.data ] })
          if (value.data.length < config.pageSize) {
            this.setState({ done: true })
          }
        })
      })
    }
    onScroll () {
      if (this.state.pending || this.state.done) {
        return
      }
      const elRect = this.el.current.getBoundingClientRect()
      const scrollParentRect = this.state.scrollParent.getBoundingClientRect()
      if (elRect.top + elRect.height <= scrollParentRect.top + scrollParentRect.height + 300) {
        this.fetchItems()
      }
    }
    render () {
      return (
        <WrappedComponent
          { ...this.props }
          { ...this.state }
          init={ this.init }
          getScrollParent={ this.getScrollParent }
          isScrollable={ this.isScrollable }
          fetchItems={ this.fetchItems }
          onScroll={ this.onScroll }
        />
      )
    }
  }
  return requester(Scroll)
}
