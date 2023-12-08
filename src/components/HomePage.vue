<template>
  <div class="container">
    <NavbarButtom />

    <div class="row justify-content-center mt-5">
      <div class="col-lg-8">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title">Lista de Usuários</h1>
            <router-link to="/users/create" class="btn btn-primary">Criar Usuário</router-link>
            <div class="table-responsive">
              <table class="table w-100">
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>
                    <router-link :to="'/users/' + user.id + '/edit'" class="btn btn-sm btn-info">Editar</router-link>
                    <button @click="deleteUser(user.id)" class="btn btn-sm btn-danger mx-2">Excluir</button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavbarButtom from "@/components/NavbarButtom.vue";

export default {
  components: {NavbarButtom},
  data() {
    return {
      users: [],
    };
  },
  methods: {
    // Método para buscar a lista de usuários na API Laravel
    fetchUsers() {
      axios
          .get(`${process.env.VUE_APP_API_URL}/api/users`)
          .then((response) => {
            this.users = response.data.users;
          })
          .catch((error) => {
            console.error(error);
          });
    },
    // Método para excluir um usuário
    deleteUser(userId) {
      if (confirm('Tem certeza que deseja excluir este usuário?')) {
        axios
            .delete(process.env.VUE_APP_API_URL + `/api/users/${userId}`)
            .then(() => {
              // Após a exclusão bem-sucedida, atualize a lista de usuários
              this.fetchUsers();
            })
            .catch((error) => {
              console.error(error);
            });
      }
    },
  },
  created() {
    // Chame o método para buscar a lista de usuários ao carregar a página
    this.fetchUsers();
  },
};
</script>
