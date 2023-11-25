<template>
  <v-menu v-if="isMobile">
    <template v-slot:activator="{ props }">
      <v-btn :ripple="false" v-bind="props" icon="mdi-menu" variant="plain" color="white" class="text-h5"/>
    </template>
    <v-list bg-color="#171F26">
      <v-list-item v-for="(item, i) in items" :key="i">
        <v-btn variant="text" :prepend-icon="item.icon" @click="redirect(item.rota)">{{ item.title }}</v-btn>
      </v-list-item>
    </v-list>
  </v-menu>

  <v-btn class="desktopButton" v-else v-for="(item, i) in items" :key="i" variant="text" :prepend-icon="item.icon" @click="redirect(item.rota)">{{ item.title }}</v-btn>
</template>

<script setup lang="ts">
const items = [
  {
    title: 'Filmes',
    icon: 'mdi-movie',
    rota: "/filmes"
  },
  {
    title: 'Atores',
    icon: 'mdi-account' ,
    rota: '/atores'
  },
]

const redirect = (rota: string) => {
  console.log('redirecoinar para', rota)
} 

defineProps({
  isMobile: {
    type: Boolean,
  }
})
</script>


<style scoped>
.desktopButton{
  color: white;
}
</style>