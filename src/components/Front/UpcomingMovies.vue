<template>
  <div id="example">
    <h2 class="uppercase text-yellow-500 font-semibold text-lg mt-20 ml-2">
      Upcoming Movies
    </h2>
    <swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      :pagination="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(movie, index) in upcomingMovies" :key="index">
        <figure>
          <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" />
          <figcaption>
            <router-link :to="`/movie/${movie.id}`">
              {{ movie.title }}
            </router-link>
          </figcaption>
        </figure>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';

export default defineComponent({
  data() {
    return {
      upcomingMovies: [],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const upcomingMovies = ref([]);
    const modules = ref([EffectCoverflow, Pagination]);

    const fetchUpcomingMovies = async () => {
      try {
        const app = getCurrentInstance();
        if (app && app.appContext.config.globalProperties.$http) {
          const response = await app.appContext.config.globalProperties.$http.get(
            "https://api.themoviedb.org/3/movie/upcoming"
          );

          upcomingMovies.value = response.data.results.slice(1, 8);
        } else {
          console.error("Vue $http is not available");
        }
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    onMounted(() => {
      fetchUpcomingMovies(); 
    });

    return {
      modules,
      upcomingMovies,
    };
  },
});
</script>

<style>
#example {
  padding: 20px;
  min-height: 100vh; 
}

.mySwiper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 480px;
}

.swiper-slide img {
  display: block;
  width: 100%;
}
</style>