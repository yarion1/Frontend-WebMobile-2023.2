<template>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <v-toolbar-title> Cinescope </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Adicione aqui os itens de menu ou links de navegação -->
    </v-app-bar>
  </template>
  
  <script>
  export default {
    methods: {
      toggleDrawer() {
        // Implemente a lógica para abrir/fechar o menu lateral, se aplicável
      }
    }
  };
  </script>