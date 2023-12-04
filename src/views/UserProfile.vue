<template>
    <v-app>

        <v-main class="main">
            <v-container fluid>
                <!-- Importando e usando o componente da barra de aplicativos -->
                <v-row justify="center">
                    <v-col cols="12" sm="8" md="6">
                        <v-card class="mt-5" color="#111111">
                            <v-card-title class="headline">Perfil do Usuário</v-card-title>

                            <v-card-text>
                                <v-form ref="form" @submit.prevent="updateProfile">
                                    <!-- Campos do formulário aqui -->
                                    <v-text-field v-model="user.name" label="Nome" outlined></v-text-field>
                                    <v-text-field v-model="user.email" label="E-mail" outlined></v-text-field>
                                    <v-text-field v-model="user.password" label="Nova Senha" type="password"
                                        outlined></v-text-field>
                                    <v-text-field v-model="user.confirmPassword" label="Confirmar Senha" type="password"
                                        outlined></v-text-field>

                                    <v-btn color="red" type="submit">Salvar Alterações</v-btn>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
  
<script>
import AppHeader from '@/components/AppHeader.vue';

export default {
    components: {
        AppHeader,
    },
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
        };
    },
    methods: {
        updateProfile() {
            // Lógica para atualizar o perfil do usuário
            // Você pode enviar esses dados para o seu servidor
            console.log('Perfil atualizado:', this.user);
        },
    },
};
</script>
  
<style scoped>
.main {
    background-image: url('../assets/bg-login.png');
    /* Substitua o caminho pela sua imagem de fundo */
    background-size: cover;
    background-position: center;
    width: 100vw;
    display: flex;
    justify-content: center;
}

/* Adicione estilos específicos do componente aqui, se necessário */
</style>
  