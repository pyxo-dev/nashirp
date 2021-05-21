<template>
  <q-select
    v-model="langTag"
    :options="langTagOptions"
    dense
    borderless
    emit-value
    map-options
    options-dense
    style="min-width: 100px"
  />
</template>

<script lang="ts">
import { qint } from 'src/boot/int'
import { computed, defineComponent, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'QintLangTagSelector',

  setup() {
    const router = useRouter()
    const { locale: langTag } = useI18n()
    const { langTags, langTagsConf } = qint.conf

    // Build `q-select` options.
    const langTagOptions = langTags.map((langTag) => ({
      label: langTagsConf?.[langTag]?.nativeName || langTag,
      value: langTag,
    }))

    // The target path to redirect to when the language tag changes,
    // computed from the hreflang link tags.
    const targetPath = computed(() => {
      const hreflang = langTagsConf?.[langTag.value]?.hreflang || langTag.value
      // Get the corresponding href from the meta link tags.
      const href = qint.meta.value.link?.[`hreflang-${hreflang}`]?.href

      if (href) {
        const url = new URL(href)
        // Get the path by removing the url origin from the href.
        return url.href.replace(url.origin, '')
      } else {
        // Case when no hreflang link tag exists for the language tag.
        return `/${langTag.value}`
      }
    })

    // When the language tag changes, redirect to the route corresponding to the
    // new language tag.
    watch(langTag, async () => {
      await router.push(targetPath.value)
    })

    return { langTag, langTagOptions }
  },
})
</script>
