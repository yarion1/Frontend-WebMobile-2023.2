<template>
  <div class="container mx-auto border-b border-gray-600 px-4 py-4">
    <h2 class="text-2xl md:text-4xl font-semibold mb-5">
      Cast
    </h2>

    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <div :key="index" v-for="(cast, index) in casts.slice(0,10)" class="mb-4">
        <img
          :src="castProfileImage(cast)"
          alt=""
          class="w-full h-auto object-cover hover:opacity-75 transition ease-in-out duration-150"
        />
        <span class="block mt-2 text-gray-300 text-sm truncate">{{ cast.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    casts: {
      required: true,
    },
  },
  methods: {
    castProfileImage(cast) {
      if (cast.profile_path) {
        return "https://image.tmdb.org/t/p/w300/" + cast.profile_path;
      } else {
        return "https://via.placeholder.com/300x450";
      }
    },
  },
};
</script>

<style></style>
