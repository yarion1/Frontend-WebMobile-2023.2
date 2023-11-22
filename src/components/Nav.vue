<template>
  <v-container class="wrapper">
    <v-row color="#171F26">
      <h2 class="title">Cinescope</h2>
      <div class="actionWrapper">
        <a href="#">Filmes</a>
        <a href="#">Atores</a>
        <a href="#">Perfil</a>
      </div>
      <v-text-field 
        solo 
        flat 
        rounded="lg" 
        color="primary" 
        variant="outlined" 
        prepend-inner-icon="mdi-magnify" />
    </v-row>
  </v-container>
</template>
  
<script setup lang="ts">


</script>

<style scoped>
.wrapper {
  max-width: 100%;
  background-color: #171F26;
}

.title {
  color: #D90D1E;
  font-weight: 600;
  font-size: 1.5rem;
  padding: 1rem 2rem;
}

a{
  text-decoration: none;
  background-color: transparent;
  color: white;
  font-size: 1.125rem;
  font-weight: 500;
}
.actionWrapper{
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  gap:10px
}
</style>