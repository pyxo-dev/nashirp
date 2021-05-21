<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          icon="menu"
          @click="togglePrimaryDrawer"
        />

        <q-btn :to="'/'" flat no-caps no-wrap class="q-ml-xs">
          <q-icon :name="laLanguageSolid" color="green" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold">
            {{ t('Qint') }}
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="grey-8" :to="pt('blog')">
            <q-icon :name="laReadme" color="grey-8" size="28px" />
            <q-tooltip>{{ t('blog').c() }}</q-tooltip>
          </q-btn>

          <q-btn
            round
            dense
            flat
            color="grey-8"
            type="a"
            href="https://github.com/pyxo-dev/qint"
            target="_blank"
          >
            <q-icon :name="laCodeSolid" color="grey-8" size="28px" />
            <q-tooltip>{{ t('source code').c() }}</q-tooltip>
          </q-btn>

          <q-space />
          <q-space />
        </div>

        <qint-lang-tag-selector />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="primaryDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            v-for="link in links1"
            :key="link.text"
            :to="pt(link.to)"
            v-ripple
            clickable
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ t(link.text).c() }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import {
  laCodeSolid,
  laLanguageSolid,
  laReadme,
} from '@quasar/extras/line-awesome'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import QintLangTagSelector from '../components/QintLangTagSelector.vue'
import { pt } from '../i18n/helpers'

export default defineComponent({
  name: 'MainLayout',

  components: {
    QintLangTagSelector,
  },

  setup() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { t } = useI18n()

    const primaryDrawerOpen = ref(false)
    function togglePrimaryDrawer() {
      primaryDrawerOpen.value = !primaryDrawerOpen.value
    }

    return {
      t,
      pt,

      laLanguageSolid,
      laReadme,
      laCodeSolid,

      primaryDrawerOpen,
      togglePrimaryDrawer,

      links1: [
        { icon: 'home', text: 'home', to: '' },
        { icon: laReadme, text: 'blog', to: 'blog' },
      ],
    }
  },
})
</script>
