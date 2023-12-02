<template>
  <v-container class="wrapper">
    <div class="text-red title">Cinescope</div>
    <Menu :isMobile="breakpoint" />
    <SearchField :isMobile="breakpoint" />
    <Profile />
  </v-container>
</template>
  
<script setup lang="ts">

import Menu from '@/components/items/Menu.vue'
import SearchField from '@/components/items/TextField.vue'
import Profile from '@/components/items/Profile.vue'

import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

const screenWidth = ref(window.innerWidth);

const breakpoint = computed(() => screenWidth.value < 576);

onMounted(() => {
  window.addEventListener('resize', handleScreenSizeChange);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleScreenSizeChange);
});

function handleScreenSizeChange() {
  screenWidth.value = window.innerWidth;
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  height: 75px;
  max-width: 100%;
  background-color: #171F26;
}

.title {
  font-weight: 700;
  padding: 1rem 2rem;
}

@media (max-width: 576px) {
  .title {
    font-size: 1.5rem;
  }
}

@media (min-width: 768px) {
  .title {
    font-size: 2rem;
  }
}

a {
  text-decoration: none;
  background-color: transparent;
  color: white;
  font-size: 1.125rem;
  font-weight: 500;
}

.actionWrapper {
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  gap: 10px
}
</style>
