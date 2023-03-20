<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    AppLayout: defineAsyncComponent(() =>
      import('./layouts/AppLayout.vue')
    )
  }
})
</script>

<template>
  <main>
    <AppLayout />
  </main>
</template>
