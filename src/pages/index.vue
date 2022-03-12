<template>
  <v-container>
    <div>
      <v-btn color="primary" nuxt to="/inspire">Go to Cached Page</v-btn>

      <MyComponent />
    </div>
  </v-container>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>
