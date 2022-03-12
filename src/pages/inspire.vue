<template>
  <v-container>
    <div class="text-center">
      <v-btn color="secondary" nuxt to="/">Go to Home Page</v-btn>
      <v-btn color="primary" nuxt to="/bettercache">Go to better cached</v-btn>
      <MyCachedComponent />
    </div>
  </v-container>
</template>

<script>
export default {
  name: "InspirePage",
};
</script>
