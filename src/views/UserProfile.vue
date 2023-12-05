<template>
    <v-app>
        <v-main class="main">
            <v-container fluid>
                <!-- Importando e usando o componente da barra de aplicativos -->
                <v-row justify="center">
                    <v-col cols="12" sm="8" md="6">
                        <v-card class="mt-5 card-container" color="#1a202c">
                            <v-card-title class="headline">Perfil do Usuário</v-card-title>

                            <v-card-text>
                                <v-form ref="form" @submit.prevent="updateProfile">
                                    <!-- Campos do formulário aqui -->
                                    <v-text-field v-model="user.name" label="Nome" outlined></v-text-field>
                                    <v-text-field v-model="user.email" label="E-mail" outlined></v-text-field>
                                    <v-text-field v-model="user.password" label="Nova Senha" type="password"
                                        outlined></v-text-field>
                                    <v-text-field v-model="user.confirmPassword" label="Senha Atual" type="password"
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
import { backendClient } from "@/services/api";

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

    mounted() {
        // Executa a função ao ser renderizado
        this.fetchUserData();
    },

    methods: {
        async updateProfile() {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                },
            }

            try {
                const { data } = await backendClient.put(`/users`, {
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.confirmPassword,
                    newPassword: this.user.password
                }, config);

                if (data) {
                    alert("Usuário Atualizado")
                    this.fetchUserData()
                    this.user.password = "",
                    this.user.confirmPassword = ""
                } 
            } catch (error) {
                if (error.response.data.message) {
                    alert(error.response.data.message)
                }
                console.error("Erro ao listar informações do usuário");
            }
        },
        async fetchUserData() {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                },
            }

            try {
                const { data } = await backendClient.get(`/users`, config);

                this.user.name = data.name;
                this.user.email = data.email;
            } catch (error) {
                console.error("Erro ao listar informações do usuário");
            }
        },
    },
};
</script>
  
<style scoped>
.main {
    background-color: #1a202c;
    width: 100vw;
    display: flex;
    justify-content: center;
}

.card-container {
    border: 2px solid #39424f;
    /* Cor mais escura que o fundo */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* Sombra para realçar */
}

/* Adicione estilos específicos do componente aqui, se necessário */
</style>
  