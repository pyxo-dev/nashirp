<template>
  <router-view />
</template>
<script lang="ts">
import { useMeta } from 'quasar'
import { qint } from 'src/boot/int'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  setup() {
    useMeta(() => qint.meta.value)
  },
})
</script>
