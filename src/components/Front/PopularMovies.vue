<template>
    <div class="mx-5">
      <h2 class="uppercase py-16 text-red-500 text-lg font-semibold">
        Popular Movies
      </h2>
  
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
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
        const response = await this.$http.get("/movie/popular");
        this.movies = response.data.results;
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
  