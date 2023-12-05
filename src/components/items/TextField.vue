<template>
  <v-btn
    :ripple="false"
    v-if="isMobile"
    color="white"
    class="text-h5"
    variant="plain"
    icon="mdi-magnify"
    @click="isSearching = !isSearching"
  />
  <div v-else class="brc">
    <v-text-field
      flat
      solo
      class="textField"
      rounded="lg"
      placeholder="Search"
      color="primary"
      variant="outlined"
      @input="debounceSearch"
      prepend-inner-icon="mdi-magnify"
      v-model="searchTerm"
      @focus="handleFocus"
    />
    <div class="absolute mt-10 rounded bg-gray-800 w-60 z-50">
      <ul class="mt-3" v-if="showSearchResult">
        <li :key="index" v-for="(movie, index) in searchResult">
          <router-link
            :to="`/movie/${movie.id}`"
            @click.native="showSearchResult = false"
            class="flex items-center border-b border-gray-500 p-1"
          >
            <img :src="posterPath(movie.poster_path)" alt="" class="w-10" />
            <span class="ml-3">{{ movie.title }}</span>
          </router-link>
        </li>
      </ul>
      <ul class="px-3" v-if="searchResult.length == 0 && showSearchResult">
        <li>No result found for "{{ searchTerm }}"</li>
      </ul>
    </div>
  </div>

  <v-dialog v-model="isSearching" class="h-75">
    <v-card class="card" rounded="lg">
      <v-text-field
        clearable
        prepend-inner-icon="mdi-magnify"
        v-model="searchTerm"
        @input="debounceSearch"
      />
      <div class="absolute mt-15 rounded bg-gray-800 w-[92%] z-50">
        <ul class="mt-3" v-if="showSearchResult">
          <li :key="index" v-for="(movie, index) in searchResult">
            <router-link
              :to="`/movie/${movie.id}`"
              @click.native="showSearchResult = false"
              class="flex items-center border-b border-gray-500 p-1"
            >
              <img :src="posterPath(movie.poster_path)" alt="" class="w-10" />
              <span class="ml-3">{{ movie.title }}</span>
            </router-link>
          </li>
        </ul>
        <ul class="px-3" v-if="searchResult.length == 0 && showSearchResult">
          <li>No result found for "{{ searchTerm }}"</li>
        </ul>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isMobile: {
      type: Boolean,
    },
  },
  data() {
    return {
      searchResult: [],
      searchTerm: "",
      showSearchResult: false,
      isSearching: false,
    };
  },
  mounted() {
    this.keyboardEvents();
  },
  methods: {
    debounceSearch(event) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        if (event.target.value.length > 3) {
          this.fetchSearch(event.target.value);
        } else {
          this.showSearchResult = false;
        }
      }, 600);
    },
    async fetchSearch(term) {
      try {
        const response = await this.$http.get("/search/movie?query=" + term);
        this.searchResult = response.data.results;
        this.showSearchResult = response.data.results ? true : false;
      } catch (error) {
        console.log(error);
      }
    },

    handleFocus() {
      if (this.searchTerm != "") {
        this.showSearchResult = true;
      }
    },
    keyboardEvents() {
      let windowObj = this;

      window.addEventListener("click", (e) => {
        if (!this.$el.contains(e.target)) {
          this.showSearchResult = false;
        }
      });

      window.addEventListener("keypress", (e) => {
        if (e.keyCode == "47") {
          e.preventDefault();
          windowObj.$refs.searchBox.focus();
        }
      });
      window.addEventListener("keydown", (e) => {
        if (e.key == "Escape") {
          this.showSearchResult = false;
        }
      });
    },
    posterPath(poster_path) {
      if (poster_path) {
        return "https://image.tmdb.org/t/p/w500/" + poster_path;
      } else {
        return "https://via.placeholder.com/50x75";
      }
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #171f26;
  padding: 1rem 1rem 0 1rem;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  color: #fff;
}
.cardActions {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.cancel,
.search {
  padding: 0.5rem 4rem;
  border-radius: 5px;
  color: white;
  font-weight: 400;
}
.brc{
  width: 242px;
}
.cancel {
  background-color: #d90d1e;
}
.search {
  background-color: #67a225;
}
.v-text-field {
  color: #fff;
  max-height: 30px;
  max-width: 100%;
  width: 100%;
}
.textField {
  margin-top: -23px;
  max-width: 100%;
}
</style>
