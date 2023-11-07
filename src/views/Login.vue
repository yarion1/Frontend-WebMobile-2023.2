<template>
    <div class="login-background">
        <v-app class="bg-transparent">
            <v-app-bar app color="#111111" dark>
                <v-toolbar-title class="text-center " style="color: red;"> Cinescope </v-toolbar-title>
            </v-app-bar>

            
            <v-main class="main">
                <v-container fluid class="d-flex justify-center mt-15">
                    <v-row class="w-100 d-flex justify-center">
                        <!-- Parte esquerda com título -->
                        <v-col cols="12" sm="5" class="bg-transparent">
                            <v-card class="pa-4 elevation-0 bg-transparent">
                                <v-card-text class="bg-transparent">
                                    <h4 class="text-h4 white--text">Quer saber o que a galera está dizendo sobre seu filme ou série favorita?</h4>
                                </v-card-text>
                            </v-card>
                        </v-col>

                        <!-- Parte direita com formulário de login -->
                        <v-col cols="12" sm="5">
                            <v-card class="pa-4">
                                <v-card-title class="text-h6">Login</v-card-title>
                                <v-card-text>
                                    <v-form @submit.prevent="login">
                                        <v-text-field v-model="username" label="Usuário" outlined></v-text-field>
                                        <v-text-field v-model="password" label="Senha" type="password"
                                            outlined></v-text-field>
                                        <v-btn color="primary" type="submit">Entrar</v-btn>
                                    </v-form>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </v-app>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        login() {
            // Implemente a lógica de autenticação aqui
            // Por exemplo, enviar dados de login para o servidor
            // e redirecionar o usuário após o login bem-sucedido
        },
    },
};
</script>

<style scoped>
.login-background {
    background-image: url('../assets/bg-login.png');
    /* Substitua o caminho pela sua imagem de fundo */
    background-size: cover;
    background-position: center;
    height: 100vh;
    /* Isso define a altura para cobrir toda a tela */
}

.main {
    width: 100vw;
    display: flex;
    justify-content: center;
}

.bg-transparent {
    background-color: transparent;
}

.text-h4 {
    background: transparent;
    font-size: 1.5rem;
    /* Tamanho do texto h4 */
    word-wrap: break-word;
    text-align: center;
    /* Permite quebrar a linha caso ultrapasse o tamanho */
}
</style>
  