import type { Qint } from '@pyxo/qint'
import type { RouteRecordRaw } from 'vue-router'
import { getChildRoutes } from './common'

export function getLangTagRoutes(qint: Qint): RouteRecordRaw[] {
  const langTagRoutes: RouteRecordRaw[] = []

  qint.conf.langTags.forEach((langTag) => {
    langTagRoutes.push({
      path: `/${langTag}`,
      name: langTag.replace(/-/g, '') + 'Layout',
      component: () => import('../../layouts/MainLayout.vue'),
      children: getChildRoutes({ langTag, qint }),
      beforeEnter: [
        async () => {
          // Set the app language tag.
          await qint.setAppLangTag({ langTag })
        },
      ],
    })
  })

  return langTagRoutes
}
