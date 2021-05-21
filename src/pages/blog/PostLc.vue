<template>
  <q-page class="q-px-lg">
    <div v-if="postLc">
      <h4>{{ postLc.title }}</h4>
      <div class="text-body1" v-html="postLc.body"></div>
    </div>
    <h4 v-else>{{ t('We are sorry, the requested page does not exist.') }}</h4>
  </q-page>
</template>

<script lang="ts">
import { qint } from 'src/boot/int'
import data from 'src/content/db'
import type { Ref } from 'vue'
import { defineComponent, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'BlogPostLc',

  setup() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { t, locale: langTag } = useI18n()
    const route = useRoute()

    // Will hold the blog post localization.
    const postLc: Ref<Record<string, unknown> | undefined> = ref()

    // When the language tag or the slug changes Get and update the post
    // localization. Also update the hreflang link tags.
    watch(
      [langTag, () => route.params.slug],
      (_value, _oldValue, onInvalidate) => {
        onInvalidate(() => {
          qint.meta.value = {}
        })

        // In a more realistic scenario, backend api fetch calls would be used
        // to get the data.

        // Update the post localization.
        postLc.value = data.blog.postLc.find(
          (pl) => pl.langTag === langTag.value && pl.slug === route.params.slug
        )

        // The current blog post.
        const post = data.blog.post.find((p) => p.id === postLc.value?.postId)
        // The language tag that will be used for the 'x-default' hreflang tag.
        const xDefaultLangTag = post?.xDefault

        // The paths of all the localizations of the current blog post.
        const paths: Record<string, string> = {}
        data.blog.postLc
          // Get the post localizations that belong to the same parent post.
          .filter((pl) => pl.postId === postLc.value?.postId)
          // Build the post localizations paths.
          .forEach((pl) => {
            const langTag = pl.langTag
            paths[langTag] =
              qint.localizeUrlPath({
                urlPath: '/blog',
                langTag,
                msgKey: 'ps',
              }) + `/${encodeURI(pl.slug)}`
          })

        // Update the hreflang link tags.
        if (xDefaultLangTag && Object.keys(paths).length) {
          const link = qint.hreflangPaths({ paths, xDefaultLangTag })
          if (link) qint.meta.value = { link }
        }
      },
      { immediate: true }
    )

    return { t, postLc }
  },
})
</script>
