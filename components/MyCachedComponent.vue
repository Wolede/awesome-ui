<template>
  <div>
    <h1>My Cached Component</h1>
    <div v-if="isValidating">revalidating...</div>
    <v-btn color="accent" @click="mutateUsers()">Revalidate Users</v-btn>
    <div>
      <h2>Users</h2>
      <div v-if="errorUsers">failed to load</div>
      <div v-if="!users && !errorUsers">loading...</div>
      <div v-else>
        <ul>
          <li v-for="(user, i) in users" :key="i">
            {{ user.name }}
          </li>
        </ul>
      </div>
    </div>
    ----
    <div>
      <h2>First Post</h2>
      <div v-if="errorPost">failed to load</div>
      <div v-if="!post && !errorPost">loading...</div>
      <div v-else>
        {{ post.title }}
      </div>
    </div>
  </div>
</template>

<script>
import useSWRV from "swrv";
import { defineComponent, ref, useContext } from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    const { $axios } = useContext();
    const fetcher = async (key) => await $axios.$get(key);

    const {
      data: users,
      error: errorUsers,
      isValidating,
      mutate: mutateUsers,
    } = useSWRV("https://jsonplaceholder.typicode.com/users", fetcher, {
      revalidateOnFocus: false,
    });

    const { data: post, error: errorPost } = useSWRV(
      "https://jsonplaceholder.typicode.com/posts/1",
      fetcher
    );

    return {
      users,
      errorUsers,
      post,
      errorPost,
      isValidating,
      mutateUsers,
    };
  },
});
</script>
