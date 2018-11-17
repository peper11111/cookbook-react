import i18n from 'i18next'
import moment from 'moment'
import config from '@/config'
import pl from '@/i18n/translation/pl.json'
import 'moment/locale/pl'

moment.locale(config.locale)

i18n.init({
  lng: config.locale,
  resources: {
    pl: { translation: pl }
  }
})

export default i18n
