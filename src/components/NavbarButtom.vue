<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/home" class="navbar-brand">Teste Ummense</router-link>
      <div class="justify-content-end" id="navbarNav">
        <ul class="navbar-nav d-flex">
          <li class="nav-item ms-auto">
            <button @click="logout" class="btn btn-danger">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    logout() {
      // Envie uma solicitação de logout para a API Laravel
      axios
          .post(`${process.env.VUE_APP_API_URL}/api/logout`)
          .then(() => {
            // Limpa o token de acesso armazenado no localStorage ou em cookies
            localStorage.removeItem('token');

            // Redirecione o usuário para a página de login
            this.$router.push({ name: 'login' });
          })
          .catch((error) => {
            console.error(error);
          });
    },
  },
};
</script>
