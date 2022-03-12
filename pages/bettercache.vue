<template>
  <v-container>
    <div class="text-center">
      <v-btn color="warning" nuxt to="/">Go to Home Page</v-btn>
      <BetterCacheComponent />
    </div>
  </v-container>
</template>

<script>
export default {
  name: "betterPage",
};
</script>
