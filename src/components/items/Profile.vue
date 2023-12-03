<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn :ripple="false" v-bind="props" icon="mdi-account-circle" variant="plain" color="white" class="text-h5" />
    </template>
    <v-list bg-color="#171F26">
      <v-list-item v-for="(item, i) in items" :key="i">
        <v-btn variant="text" :prepend-icon="item.icon" :to=item.rota>{{ item.title }}</v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
const items = [
  {
    title: 'Perfil',
    icon: 'mdi-account-circle',
    rota: "/perfil"
  },
  {
    title: 'Playlists',
    icon: 'mdi-playlist-check' ,
    rota: '/playlists'
  },
  {
    title: 'Favoritos',
    icon: 'mdi-star' ,
    rota: '/favoritos'
  },
  {
    title: 'Sair',
    icon: 'mdi-logout' ,
    rota: '/sair'
  },
]
</script>

<style scoped></style>