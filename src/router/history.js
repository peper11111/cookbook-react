import { createBrowserHistory } from 'history'
import helpers from '@/helpers'

const history = createBrowserHistory()

history.listen(() => helpers.checkNavigation())

export default history
