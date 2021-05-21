import type { QintConf } from '@pyxo/qint'
import type { QuasarLanguage } from 'quasar'
import type { LocaleMessageDictionary, VueMessageType } from 'vue-i18n'

export function getQintConf(/* { app, router, ... } */): QintConf {
  const qintConf: QintConf = {
    langTags: ['ar', 'en'],

    langTagsConf: {
      ar: { nativeName: 'العربية' },
      en: {
        nativeName: 'English',
        quasarLang: {
          isoName: 'en-US',
        },
      },
    },

    quasarLangConf: {
      importQLang: async (isoName, custom) => {
        if (custom) {
          return (
            (<{ default: QuasarLanguage }>(
              // Modify if the custom language packs are in a different location.
              await import(`./q-lang-packs/${isoName}`)
            )).default
          )
        } else {
          return (<{ default: QuasarLanguage }>await import(
            // Update this webpack magic comment according to your needs.
            /* webpackInclude: /(ar|en-US)\.js$/ */
            `quasar/lang/${isoName}`
          )).default
        }
      },
    },

    vueI18nConf: {
      legacy: false,

      importGeneralMsg: async (langTag) =>
        (<{ default: LocaleMessageDictionary<VueMessageType> }>(
          // Modify if the messages are in a different location.
          await import(`src/i18n/general-msgs/${langTag}`)
        )).default,
    },

    cookieConf: {
      useCookie: true,

      cookieOptions: {
        maxAge: 365 * 24 * 60 * 60,
        path: '/',
        sameSite: 'lax',
      },
    },
  }

  qintConf.vueI18nConf.composerOptions = {
    locale: qintConf.langTags[0],
    fallbackLocale: qintConf.langTags[0],
    missingWarn: false, // To enable for dev mode only use: !!process.env.DEV
    fallbackWarn: false, // !!process.env.DEV
  }

  return qintConf
}
