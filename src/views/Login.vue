<template>
  <div class="login-background">
    <v-app class="bg-transparent">
      <v-app-bar app color="#111111" dark style="height: 74px;">
        <v-toolbar-title class="text-center" style="color: red;">
          Cinescope
        </v-toolbar-title>
      </v-app-bar>

      <v-main class="main">
        <v-container fluid class="d-flex justify-center mt-15">
          <v-row class="w-100 d-flex justify-center">
            <v-col cols="12" sm="5" class="bg-transparent">
              <v-card class="pa-4 elevation-0 bg-transparent">
                <v-card-text class="bg-transparent">
                  <h4 class="text-h4 white--text">
                    Quer saber o que a galera está dizendo sobre seu filme ou
                    série favorita?
                  </h4>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" sm="5">
              <v-card class="pa-4" color="#111111">
                <v-card-title class="text-h4">Login</v-card-title>
                <v-card-text>
                  <v-form @submit.prevent="login">
                    <v-text-field v-model="username" label="Usuário" variant="underlined"></v-text-field>
                    <v-text-field v-model="password" label="Senha" type="password" variant="underlined"></v-text-field>
                    <v-col cols="12" class="text-center">
                      <v-btn color="red" dark type="submit">Logar</v-btn>
                      <p class="mt-2">
                        Ainda não tem uma conta?
                        <router-link to="/register">Clique aqui</router-link>
                      </p>
                    </v-col>
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
import { backendClient } from "@/services/api";
export default {
  data() {
    return {
      serverUrl: "/auth",
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await backendClient.post(`${this.serverUrl}`, {
          username: this.username,
          password: this.password,
        });

        if (response.data.access_token) {
          localStorage.setItem("access_token", response.data.access_token);
          this.$router.push("/home");
        } else {
          this.$toast.error("Usuário ou senha inválidos");
        }
      } catch (error) {
        if (error.response.data.statusCode === 401) {
          this.$toast.error("Usuário ou senha inválidos");
        } else {
          this.$toast.error("Erro ao efetuar login, tente novamente mais tarde");
        }
        console.error("Erro ao logar:",);
      }
    },
  },
};
</script>

<style scoped>
.login-background {
  background-image: url("../assets/bg-login.png");
  background-size: cover;
  background-position: center;
  height: 100vh;
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
  word-wrap: break-word;
  text-align: center;

}
</style>
