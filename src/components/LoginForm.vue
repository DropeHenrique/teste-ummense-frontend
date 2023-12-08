<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <!-- Adicione a classe "card" para criar um card -->
        <div class="card">
          <div class="card-body">
            <h1 class="card-title text-center">Acesse a sua conta</h1>
            <form @submit.prevent="loginForm">
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="password">Senha:</label>
                <input type="password" id="password" v-model="password" class="form-control" required>
              </div>
              <button type="submit" class="btn btn-primary mt-3 btn-block">Acesse a Plataforma</button>
            </form>
            <p class="mt-3 text-center">Não tem uma conta? <router-link to="/users/create">Crie uma agora</router-link></p>
          </div>
        </div>
        <!-- Fim do card -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    loginForm() {
      axios
          .post(`${process.env.VUE_APP_API_URL}/api/login`, {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            // Login bem-sucedido
            const token = response.data.token;

            // Armazenar o token de acesso em Local Storage ou Cookies
            localStorage.setItem('token', token);

            // Redirecionar para a página após o login bem-sucedido
            this.$router.push({ name: 'home' });
          })
          .catch((error) => {
            // Tratar erros de login
            console.error(error);
            alert('Ocorreu um erro durante o login. Verifique suas credenciais.');
          });
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados para o card */
.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>
