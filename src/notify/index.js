import iziToast from 'izitoast'
import i18n from '@/i18n'

iziToast.settings({
  position: 'bottomLeft'
})

export default {
  show (message, type) {
    if (['info', 'success', 'warning', 'error'].indexOf(type) === -1) {
      console.warn(`[notify] Unknown message type '${type}'. Using default.`)
      type = 'show'
    }
    iziToast[type]({
      message: i18n.t(`${type}.${message}`)
    })
  },
  info (message) {
    this.show(message, 'info')
  },
  success (message) {
    this.show(message, 'success')
  },
  warning (message) {
    this.show(message, 'warning')
  },
  error (message) {
    this.show(message, 'error')
  }
}
