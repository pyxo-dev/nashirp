<template>
  <q-page v-if="postLc" class="q-px-lg">
    <h4 v-html="postLc.title"></h4>
    <div class="text-body1" v-html="postLc.body"></div>
  </q-page>
</template>

<script lang="ts">
import { qint } from 'src/boot/int'
import type { Ref } from 'vue'
import { defineComponent, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

interface IndexPostLc {
  title: string
  body: string
}
// Current index post localization.
const postLc: Ref<IndexPostLc | undefined> = ref()

export default defineComponent({
  name: 'IndexPostLc',

  setup() {
    const i18n = useI18n()
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { locale: langTag } = i18n
    const { langTags } = qint.conf

    const paths: Record<string, string> = {}
    langTags.forEach((lt) => (paths[lt] = '/'))

    // Set the hreflang link tags.
    const link = qint.hreflangPaths({ paths, xDefaultLangTag: langTags[0] })
    if (link) qint.meta.value = { link }

    onBeforeUnmount(() => {
      // Reset the hreflang link tags.
      qint.meta.value = {}
    })

    // When the language tag changes, update the post localization.
    watch(
      langTag,
      async (langTag) => {
        await updatePostLc(langTag)
      },
      { immediate: true }
    )

    return { postLc }
  },
})

async function updatePostLc(langTag: string) {
  try {
    postLc.value = (<{ default: IndexPostLc }>(
      await import(`src/content/${langTag}/index.ts`)
    )).default
  } catch (err) {
    console.error(err)
  }
}
</script>
