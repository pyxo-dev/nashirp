import { qint } from 'src/boot/int'

export function pt(urlPath: string): string {
  const l = qint.i18n.locale
  const langTag = typeof l === 'string' ? l : l.value
  return (
    `/${langTag}/` + qint.localizeUrlPath({ urlPath, langTag, msgKey: 'ps' })
  )
}
