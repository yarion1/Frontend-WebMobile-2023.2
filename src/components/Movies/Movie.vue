<template>
  <div class="container mx-auto flex flex-wrap mt-0 md:mt-0">
    <div class="container mx-auto flex flex-wrap mt-20 md:mt-20 border-b border-gray-600 pb-2">
      <img :src="posterPath" alt="" class="w-full md:w-64 md:mr-5 mb-5 md:mb-0" />
      <div class="mt-4 md:w-2/3">
        <h1 class="text-4xl font-semibold">{{ this.movie.title }}</h1>
        <span class="text-gray-500 text-sm flex items-center">
          <svg class="fill-current text-yellow-500 w-4 h-10 mr-1" viewBox="0 0 24 24">
            <g data-name="Layer 2">
              <path
                d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
                data-name="star" />
            </g>
          </svg>
          {{ this.movie.vote_average * 10 }} % | {{ movie.release_date }}
          <span :key="index" v-for="(item, index) in movie.genres" class="ml-1">
            {{ item.name }}
            <span v-if="movie.genres.length - 1 != index">,</span>
          </span>
        </span>
        <p class="mt-5">{{ this.movie.overview }}</p>

        <div class="mt-5">
          <span class="mt-5 font-semibold">Featured Cast</span>
          <div class="flex flex-wrap">
            <div :key="index" v-for="(crew, index) in movie.credits.crew">
              <div v-if="index < 2" class="flex flex-col mt-3 md:mt-5 mr-4 md:mr-5 mb-2">
                <span>{{ crew.name }}</span>
                <span class="text-gray-500">{{ crew.job }}</span>
              </div>
            </div>
          </div>
        </div>


        <v-dialog v-model="addPlayListModal" persistent max-width="600px">
          <v-card class="bg-gray-900">
            <v-btn icon @click="addPlayListModal = false" class="position-absolute top-0 right-0 m-2">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>

            <v-card-title class="headline text-center text-white">PlayLists</v-card-title>

            <v-btn v-if="allPlaylists.length == 0" class="mx-auto headline text-center text-white mt-4" min-width="200px"
              color="white" variant="tonal" type="submit" @click="redirectToPlaylist">
              Criar PlayList
            </v-btn>

            <v-card-text v-else>
              <v-form @submit.prevent="createPlaylist">
                <div v-for="playlist in allPlaylists" :key="playlist.id">
                  <v-checkbox v-model="selectedPlaylists" :label="playlist.name" :value="playlist.id" color="white"
                    label-color="white" class="check" @change="addToPlaylisy(playlist.id, $event)">
                  </v-checkbox>
                </div>
              </v-form>
            </v-card-text>

          </v-card>
        </v-dialog>

        <div class="mt-3 md:mt-5 flex flex-wrap items-center">
          <a @click.prevent="openYouTubeModel" target="blank"
            class="rounded bg-yellow-500 px-3 md:px-5 py-2 md:py-3 inline-flex text-black mb-2 md:mb-0 cursor-pointer ml-2">
            <svg class="w-4 h-4 md:w-6 md:h-6 fill-current" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
            <span class="ml-2">Play Trailer</span>
          </a>

          <button v-if="favoritesIds.includes(this.movie.id)" type="button"
            class="rounded bg-yellow-500 px-3 md:px-5 py-2 md:py-3 inline-flex text-black ml-2 md:ml-5 mb-2 md:mb-0 cursor-pointer"
            @click.prevent="addToFavorites">
            <img src="@/assets/images/heart-black.png" alt="" class="w-4 h-4 md:w-6 md:h-6" />
            <span class="ml-2">Favorito</span>
          </button>

          <button v-else type="button"
            class="rounded bg-yellow-500 px-3 md:px-5 py-2 md:py-3 inline-flex text-black ml-2 md:ml-5 mb-2 md:mb-0 cursor-pointer"
            @click.prevent="addToFavorites">
            <img src="@/assets/images/heart-white.png" alt="" class="w-4 h-4 md:w-6 md:h-6" />
            <span class="ml-2">Favorito</span>
          </button>

          <a href="#"
            class="rounded bg-yellow-500 px-3 md:px-5 py-2 md:py-3 inline-flex text-black ml-2 md:ml-5 mb-2 md:mb-0 cursor-pointer"
            @click="openModalPlayList">
            <span class="ml-2">Adicionar playlist</span>
          </a>
        </div>
      </div>


    </div>

    <Cast :casts="movie.credits.cast" />
    <Images :images="movie.images.backdrops" v-on:on-image-click="showImageModel" />
    <MediaModel v-model="modelOpen" :mediaURL="mediaURL" :isVideo="this.isVideo" />
  </div>
</template>
<script>
import Cast from "./Cast";
import Images from "./Images";
import MediaModel from "../models/MediaModel";
import { backendClient } from "@/services/api";

export default {
  components: {
    Cast,
    Images,
    MediaModel,
  },
  data() {
    return {
      movie: {
        credits: {
          crew: {},
        },
        images: {
          backdrops: {},
        },
      },
      modelOpen: false,
      addPlayListModal: false,
      isVideo: false,
      mediaURL: "",
      allPlaylists: [],
      selectedPlaylists: [],
      favoritesIds: []
    };
  },

  watch: {
    "$route.params.id": {
      handler() {
        this.fetchMovie(this.$route.params.id);
      },
      immediate: true,
    },
  },

  async mounted() {
    this.fetchPlayLists();
    this.fetchFavorites();
  },

  methods: {

    async fetchFavorites() {
      try {
        const config = {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          },
        };

        const response = await backendClient.get(`/favorites/check-favorites`, config);
        this.favoritesIds = response.data.contents

        console.log(this.favoritesIds)
      } catch (error) {
        console.log(error);
      }
    },

    redirectToPlaylist() {
      this.$router.push("/playlists");
    },

    async fetchMovie(movieId) {
      const response = await this.$http.get(
        "/movie/" + movieId + "?append_to_response=credits,videos,images"
      );
      this.movie = response.data;
    },

    async addToFavorites() {
      const content = {
        adult: this.movie.adult,
        backdrop_path: this.movie.backdrop_path,
        genre_ids: this.movie.genres.map((genre) => genre.id),
        id: this.movie.id,
        original_language: this.movie.original_language,
        original_title: this.movie.original_title,
        overview: this.movie.overview,
        popularity: this.movie.popularity,
        poster_path: this.movie.poster_path,
        release_date: this.movie.release_date,
        title: this.movie.title,
        video: this.movie.video,
        vote_average: this.movie.vote_average,
        vote_count: this.movie.vote_count,
      };

      const isChecked = this.favoritesIds.includes(+this.movie.id);

      try {
        if (isChecked) {
          const response = await backendClient.patch(`/favorites/remove/${this.movie.id}`);
          this.$toast.success("Filme removido dos favoritos");
          this.fetchFavorites();
        } else {
          const response = await backendClient.patch("/favorites/add", {
            content: content,
          });
          this.$toast.success("Filme adicionado aos favoritos");
          this.fetchFavorites();
        }
      } catch (error) {
        console.error("Erro ao adicionar aos favoritos:", error.response.data);
      }
    },

    openModalPlayList() {
      this.addPlayListModal = true;
    },

    async fetchPlayLists() {
      try {
        const config = {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          },
        };

        const response = await backendClient.get(`/playlists/name`, config);
        this.allPlaylists = response.data;

        this.allPlaylists.map(item => {
          if (item.contents.includes(this.movie.id)) {
            this.selectedPlaylists.push(item.id)
          }
        })
      } catch (error) {
        console.log(error);
      }
    },

    async addToPlaylisy(playlistId, checked) {
      const content = {
        adult: this.movie.adult,
        backdrop_path: this.movie.backdrop_path,
        genre_ids: this.movie.genres.map((genre) => genre.id),
        id: this.movie.id,
        original_language: this.movie.original_language,
        original_title: this.movie.original_title,
        overview: this.movie.overview,
        popularity: this.movie.popularity,
        poster_path: this.movie.poster_path,
        release_date: this.movie.release_date,
        title: this.movie.title,
        video: this.movie.video,
        vote_average: this.movie.vote_average,
        vote_count: this.movie.vote_count,
      };

      const isChecked = this.selectedPlaylists.includes(+playlistId);

      if (isChecked) {
        try {
          const response = await backendClient.patch(`/playlists/add/${playlistId}`, {
            contents: content,
          });

          this.fetchPlayLists();
        } catch (error) {
          console.error("Erro ao adicionar a playlist:", error.response.data);
        }
      } else {
        try {
          const response = await backendClient.patch(`/playlists/remove/${playlistId}`, {
            id: this.movie.id,
          });

          this.fetchPlayLists();
        } catch (error) {
          console.error("Erro ao remover da playlist:", error.response.data);
        }
      }

    },

    openYouTubeModel() {
      this.mediaURL = this.youtubeVideo();
      this.isVideo = true;
      this.modelOpen = true;
    },
    openImageModel() {
      this.isVideo = false;
      this.modelOpen = true;
    },
    youtubeVideo() {
      if (!this.movie.videos) return;
      return (
        "https://www.youtube.com/embed/" + this.movie.videos.results[0].key
      );
    },
    showImageModel(imageFullPath) {
      this.mediaURL = imageFullPath;
      this.isVideo = false;
      this.modelOpen = true;
    },
  },
  computed: {
    posterPath() {
      return "https://image.tmdb.org/t/p/w500/" + this.movie.poster_path;
    },
  },
};
</script>

<style>
.check {
  color: white;
}
</style>
