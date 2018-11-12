import config from '@/config'
import Requester from '@/mixins/requester'

class Scroll extends Requester {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      done: false,
      items: [],
      page: 1,
      scrollParent: null
    }
    this.onScroll = this.onScroll.bind(this)
  }
  componentDidMount () {
    this.init()
    this.setState({ scrollParent: this.getScrollParent(this.el.current) }, () => {
      this.state.scrollParent.addEventListener('scroll', this.onScroll)
    })
  }
  componentWillUnmount () {
    if (this.state.scrollParent) {
      this.state.scrollParent.removeEventListener('scroll', this.onScroll)
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
    }, () => {
      this.fetchItems()
    })
  }
  fetchItems () {
    this.wrap(() => {
      return this.getFetchMethod().then((value) => {
        this.setState({
          done: value.data.length < config.pageSize,
          items: [ ...this.state.items, ...value.data ],
          page: this.state.page + 1
        })
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
}

export default Scroll
