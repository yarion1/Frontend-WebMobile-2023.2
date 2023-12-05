<template >
    <div class="template-playlist">
        <v-btn class="button-playlist" color="white" variant="tonal" dark @click="openCreatePlaylistModal">Criar
            Playlist</v-btn>

        <v-dialog v-model="createPlaylistModal" persistent max-width="600px">
            <v-card class="bg-gray-900">
                <v-btn icon @click="createPlaylistModal = false" class="position-absolute top-0 right-0 m-2">
                    <v-icon color="white">mdi-close</v-icon>
                </v-btn>

                <v-card-title class="headline text-center text-white">Nova Playlist</v-card-title>

                <v-card-text>
                    <v-form @submit.prevent="createPlaylist">
                        <v-text-field class="input-playlist" v-model="newPlaylistName" label="Nome da PlayList" color="white"
                            variant="underlined"></v-text-field>

                        <v-btn class="mx-auto" min-width="200px" color="white" variant="tonal" type="submit">Criar</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>

        <h2 v-if="playlists.length == 0" class="uppercase py-16 ml-4 text-yellow-500 text-lg font-semibold">
            Nenhuma PlayList Criada
        </h2>

        <div class="mx-5" v-for="playlist in playlists" :key="playlist.id">



            <h2 v-if="playlist.contents && playlist.contents.length > 0"
                class="uppercase py-16 text-yellow-500 text-lg font-semibold">
                {{ playlist.name }}
            </h2>

            <h2 v-else class="uppercase py-4 pt-16 text-yellow-500 text-lg font-semibold">
                {{ playlist.name }}
            </h2>

            <div v-if="playlist.contents && playlist.contents.length > 0"
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                <MovieItem :key="movie.id" v-for="movie in playlist.contents" :movie="movie" :genres="genres" />
            </div>

            <div v-else class="uppercase text-white py-4">
                PlayList Vazia
            </div>
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
            playlists: [],
            createPlaylistModal: false,
            newPlaylistName: "",
            rules: [v => !!v || 'Campo obrigatório'],
        };
    },

    async mounted() {
        this.fetchGenres();
        this.fetchPlayLists();
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

        async fetchPlayLists() {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                    },
                };

                const response = await backendClient.get(`/playlists`, config);
                this.playlists = response.data;
            } catch (error) {
                console.log(error);
            }
        },

        openCreatePlaylistModal() {
            this.createPlaylistModal = true;
        },

        async createPlaylist() {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                    },
                };

                const response = await backendClient.post(`/playlists`, {
                    name: this.newPlaylistName,
                    type: "movies"
                }, config);

            } catch (error) {
                console.log(error);
                alert("Erro ao criar playlist")
            }
            this.createPlaylistModal = false;
            this.fetchPlayLists();
        },
    },
};
</script>
  
<style>
/* Estilos adicionais conforme necessário */
.button-playlist {
    margin-top: 15px;
    margin-left: 15px;
}

.template-playlist {
    height: 100vh;
}

.input-playlist {
    color: white;
}
</style>
  