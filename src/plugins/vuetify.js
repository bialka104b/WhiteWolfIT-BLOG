import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'
import { theme as defaultTheme } from '@/theme/index';
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'defaultTheme',
    themes: {
      defaultTheme
    }
  }
})
