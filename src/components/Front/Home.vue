<template>
  <div class="container mx-auto">
    <PopularMovies />
    <UpcomingMovies />
  </div>
</template>

<script>
import PopularMovies from "@/components/Front/PopularMovies.vue";
import UpcomingMovies from "@/components/Front/UpcomingMovies.vue";

export default {
  components: {
    PopularMovies,
    UpcomingMovies,
  },
  mounted() {
    
  },
};
</script>

<style></style>