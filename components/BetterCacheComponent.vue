<template>
  <div>
    <h1>My Better Cached Component</h1>
    <div v-if="isValidating">revalidating post...</div>
    <v-btn color="accent" @click="mutate()">Revalidate Post</v-btn>
    <div>
      <h2>Posts</h2>
      <template v-if="state === STATES.LOADING"> loading ... </template>
      <template v-else-if="state === STATES.ERROR"> failed to load </template>

      <template v-if="state === STATES.SUCCESS">
        <div v-if="posts">
          {{ posts.title }}
        </div>
        <div v-else>
          <p>Empty state</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";
import useSwerv from "~/composables/useSwerv";

export default defineComponent({
  setup() {
    const {
      data: posts,
      error,
      isValidating,
      mutate,
      state,
      STATES,
    } = useSwerv("https://jsonplaceholder.typicode.com/posts/111");

    return {
      posts,
      error,
      isValidating,
      mutate,
      state,
      STATES,
    };
  },
});
</script>
