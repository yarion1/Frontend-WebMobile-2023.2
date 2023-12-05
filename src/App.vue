<template>
  <div class="flex justify-between border-b border-gray-500">
    <Nav />
  </div>
  <router-view />
</template>

<script lang="ts" setup>
import Nav from "@/components/Nav.vue";
</script>
<style scoped>
* {
  background-color: #1a202c ;
}
</style>
