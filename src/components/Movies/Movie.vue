<template>
  <div>
    <div class="container mx-auto flex flex-col md:flex-row mt-20 border-b border-gray-600 pb-2">
      <img :src="posterPath" alt="" class="w-full md:w-64" />
      <div class="ml-0 md:ml-24 mt-4 md:mt-0">
        <h1 class="text-4xl font-semibold">{{ this.movie.title }}</h1>
        <span class="text-gray-500 text-sm flex mt-2 md:mt-0">
          <svg
            class="fill-current text-yellow-500 w-4 h-4 mr-1"
            viewBox="0 0 24 24"
          >
            <!-- SVG path here -->
          </svg>
          {{ this.movie.vote_average * 10 }} % | {{ movie.release_date }}
          <span :key="index" v-for="(item, index) in movie.genres" class="ml-1">
            {{ item.name }}
            <span v-if="movie.genres.length - 1 != index">,</span>
          </span>
        </span>
        <p class="mt-3 md:mt-5">
          {{ this.movie.overview }}
        </p>

        <div class="mt-3 md:mt-5">
          <span class="mt-5 font-semibold">Featured Cast</span>

          <div class="flex flex-wrap">
            <div :key="index" v-for="(crew, index) in movie.credits.crew">
              <div v-if="index < 2" class="flex flex-col mt-2 md:mt-5 mr-5">
                <span>{{ crew.name }}</span>
                <span class="text-gray-500">{{ crew.job }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-3 md:mt-5">
          <a
            @click.prevent="openYouTubeModel"
            target="blank"
            class="rounded bg-yellow-500 px-5 py-3 inline-flex text-black cursor-auto"
          >
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <!-- SVG path here -->
            </svg>
            <span class="ml-3">Play Trailer</span>
          </a>

          <a
            href="#"
            class="rounded bg-yellow-500 px-5 py-3 inline-flex text-black mt-3 md:ml-5 md:mt-0"
          >
            <img src="@/assets/images/heart-white.png" alt="" />
            <span class="ml-3">Favourite</span>
          </a>
        </div>
      </div>
    </div>

    <Cast :casts="movie.credits.cast" />
    <Images
      :images="movie.images.backdrops"
      v-on:on-image-click="showImageModel"
    />
    <MediaModel
      v-model="modelOpen"
      :mediaURL="mediaURL"
      :isVideo="this.isVideo"
    />
  </div>
</template>


<script>
import Cast from "./Cast";
import Images from "./Images";
import MediaModel from "../models/MediaModel";

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
      isVideo: false,
      mediaURL: "",
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
  methods: {
    async fetchMovie(movieId) {
      const response = await this.$http.get(
        "/movie/" + movieId + "?append_to_response=credits,videos,images"
      );
      this.movie = response.data;
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

<style></style>
