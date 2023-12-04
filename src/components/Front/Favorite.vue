<template>
  <div class="container mx-auto">
    <h2 class="uppercase py-20 text-yellow-500 text-lg font-semibold">
      Favorites Movies
    </h2>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
    >
      <MovieItem
        :key="movie.id"
        v-for="movie in movies"
        :movie="movie"
        :genres="genres"
      />
    </div>
  </div>
</template>

<script>

import MovieItem from "@/components/items/MovieItem.vue";
import { backendClient } from "@/services/api";

export default {
  components: {
    MovieItem,
  },

  data() {
    return {
      movies: [],
      genres: [],
    };
  },

  async mounted() {
    this.fetchGenres();
    try {
      const response = await backendClient.get("/favorites");
      this.movies = response.data.contents;
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    async fetchGenres() {
      try {
        const response = await this.$http.get("/genre/movie/list");
        this.genres = response.data.genres;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
/* Estilos adicionais conforme necessário */
</style>
