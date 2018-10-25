import i18n from 'i18next'
import config from '@/config'
import pl from '@/i18n/translation/pl.json'

i18n.init({
  lng: config.locale,
  resources: {
    pl: { translation: pl }
  }
})

export default i18n
