<template>
  <v-app>
    <div class="register-background">
      <v-app-bar app color="#111111" dark style="height: 74px;">
        <v-toolbar-title class="text-center" style="color: red">
          Cinescope
        </v-toolbar-title>
      </v-app-bar>
      <v-container class="register-container">
        <v-form @submit.prevent="register">
          <v-card max-width="700" class="mx-auto my auto" color="#111111">
            <v-card-title class="text-center text-h4">
              Registre-se
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="username"
                    label="Nome de usuário"
                    variant="underlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="email"
                    label="E-mail"
                    variant="underlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="password"
                    label="Senha"
                    type="password"
                    variant="underlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="confirmPassword"
                    label="Confirmar Senha"
                    type="password"
                    variant="underlined"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="text-center">
                  <v-btn color="red" dark type="submit">Registrar</v-btn>
                  <p class="mt-2">
                    Já tem uma conta?  <router-link to="/login">Clique aqui</router-link>
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-form>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import { backendClient } from "@/services/api";

export default {
  data() {
    return {
      serverUrl: "/auth/register",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async register() {
      try {
        const response = await backendClient.post(`${this.serverUrl}`, {
          name: this.username,
          email: this.email,
          password: this.password,
        });
        this.$router.push("/login");
      } catch (error) {
        console.error("Erro ao registrar:", error.response.data);
      }
    },
  },
};
</script>

<style lang="scss">
@import "../styles/style.scss";
.register-background {
  min-height: 100vh; /* Garante que a imagem de fundo cubra toda a altura da tela */
  display: flex;
  justify-content: center;
  align-items: center;
}
.register-container {
  max-width: 400px; /* A largura máxima desejada para o formulário de registro */
}
</style>
