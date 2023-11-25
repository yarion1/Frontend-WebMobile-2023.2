<template>
  <v-btn :ripple="false" v-if="isMobile" color="white" class="text-h5" variant="plain" icon="mdi-magnify"
    @click="isSearching = !isSearching" />

  <v-text-field v-else flat solo class="textField" rounded="lg" color="primary" variant="outlined" prepend-inner-icon="mdi-magnify" />

  <v-dialog v-model="isSearching">
    <v-card class="card" rounded="lg">
      <v-text-field clearable prepend-inner-icon="mdi-magnify" v-model="search" />
      <v-card-actions class="cardActions">
        <v-btn class="cancel" @click="isSearching = !isSearching" elevation="2">Cancelar</v-btn>
        <v-btn class="search" @click="RequestSearch"  elevation="2" >Buscar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';


defineProps({
  isMobile: {
    type: Boolean,
  }
})

const isSearching = ref(false)
const search = ref('')

const RequestSearch =() => {
  console.log('Roda de busca', search.value); // como o valor usado tem que ser por referencia ele tem ser passado com .value na frente 
}

</script>

<style scoped>
  .card{
    background-color: #171F26;
    padding: 1rem 1rem 0 1rem;
  }

  .cardActions{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .cancel, .search{
    padding: 0.5rem 2rem;
    border-radius: 5px;
    color: white;
    font-weight: 400;
  }
  .cancel{
    background-color: #D90D1E;
  }
  .search{
    background-color: #67A225;
  }
  .v-text-field{
    color: #fff;
  }
  .textField{
    margin-top: 20px;
    max-width: 30%;
  }
</style>
