<template>
  <q-page class="q-px-lg">
    <h5>{{ t('r.Welcome to Qint Blog') }}</h5>
    <div v-if="postLcList" class="q-pa-md row items-start q-gutter-md">
      <q-card
        v-for="postLc in postLcList"
        :key="postLc.id"
        style="max-width: 300px"
      >
        <q-card-section>
          <q-btn
            flat
            no-caps
            class="text-h6"
            :to="{
              name: `${langTag}BlogPostLc`,
              params: { slug: postLc.slug },
            }"
          >
            {{ postLc.title }}
          </q-btn>
        </q-card-section>

        <q-card-section class="q-py-none">
          <div v-html="postLc.summary" />
        </q-card-section>

        <q-separator dark />

        <q-card-actions>
          <q-btn
            flat
            :to="{
              name: `${langTag}BlogPostLc`,
              params: { slug: postLc.slug },
            }"
            >{{ t('r.Read more') }}</q-btn
          >
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { qint } from 'src/boot/int'
import data from 'src/content/db'
import { defineComponent, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'BlogPostLcList',

  setup() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { t, locale: langTag } = useI18n()
    const { langTags } = qint.conf

    // Will hold the list of the blog post localizations for the current
    // language tag.
    const postLcList = ref()

    // When the language tag changes, update the `postLcList`.
    watch(
      langTag,
      (langTag) => {
        // In a more realistic scenario, a backend api fetch call would be used
        // to get the data.
        postLcList.value = data.blog.postLc.filter(
          (pl) => pl.langTag === langTag
        )
      },
      { immediate: true }
    )

    // The paths of the blog in all the app language tags.
    const paths: Record<string, string> = {}
    langTags.forEach((langTag) => {
      paths[langTag] = qint.localizeUrlPath({
        urlPath: '/blog',
        langTag,
        msgKey: 'ps',
      })
    })

    // Set/update the hreflang link tags.
    const link = qint.hreflangPaths({ paths, xDefaultLangTag: langTags[0] })
    if (link) qint.meta.value = { link }

    onBeforeUnmount(() => {
      qint.meta.value = {}
    })

    return { t, langTag, postLcList }
  },
})
</script>
