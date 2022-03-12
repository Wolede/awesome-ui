<template>
  <div>
    <h1>MyComponent</h1>
    <h2>Users</h2>
    <div v-if="fetchUsersState.pending">loading...</div>
    <div v-else-if="fetchUsersState.error">error</div>
    <ul v-else>
      <li v-for="(user, i) in users" :key="i">
        {{ user.name }}
      </li>
    </ul>
    <v-btn @click="fetchUsers">refetch users</v-btn>

    <h2>Albums</h2>
    <div v-if="fetchAlbumsState.pending">loading...</div>
    <div v-else-if="fetchAlbumsState.error">error</div>
    <ul v-else>
      <li v-for="(album, i) in albums" :key="i">
        {{ album.title }}
      </li>
    </ul>
    <v-btn @click="fetchAlbums">refetch albums</v-btn>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  useFetch,
  useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $axios } = useContext()
    const users = ref([])
    const albums = ref([])

    const { fetch: fetchUsers, fetchState: fetchUsersState } = useFetch(
      async () => {
        users.value = await $axios.$get(
          'https://jsonplaceholder.typicode.com/users'
        )
      }
    )

    const { fetch: fetchAlbums, fetchState: fetchAlbumsState } = useFetch(
      async () => {
        albums.value = await $axios.$get(
          'https://jsonplaceholder.typicode.com/albums'
        )
      }
    )

    return {
      users,
      albums,
      fetchUsers,
      fetchUsersState,
      fetchAlbums,
      fetchAlbumsState,
    }
  },
})
</script>
