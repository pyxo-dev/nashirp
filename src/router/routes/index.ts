import { Qint } from '@pyxo/qint'
import { pathSegmentMsgs } from 'src/i18n/path-msgs'
import type { RouteRecordRaw } from 'vue-router'
import { getLangTagRoutes } from './lang-tag-routes'

export function getAppRoutes(qint: Qint): RouteRecordRaw[] {
  // Load the route path segments translation messages.
  qint.conf.langTags.forEach((langTag) => {
    if (pathSegmentMsgs[langTag]) {
      qint.i18n.mergeLocaleMessage(langTag, pathSegmentMsgs[langTag])
    }
  })

  return [
    {
      path: '/',
      name: 'root',
      redirect: () => `/${qint.getLangTag() || qint.conf.langTags[0]}`,
    },

    ...getLangTagRoutes(qint),

    {
      path: '/:catchAll(.*)*',
      name: 'catchAll',
      component: () => import('pages/Error404.vue'),
    },
  ]
}
