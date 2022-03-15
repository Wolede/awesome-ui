<template>
  <div>
    <h1>data: {{ data }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  asyncData(ctx) {
    const data = ctx.$vuetify.theme.themes

    console.log(data)

    return { data }
  },
})
</script>
