<template>
  <div class="container">
    <NavbarButtom />

    <div class="row justify-content-center mt-5">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title">{{ isEdit ? 'Editar Usuário' : 'Criar Usuário' }}</h1>

            <!-- Formulário para criar/editar usuário -->
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">Nome:</label>
                <input type="text" id="name" v-model="user.name" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="user.email" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="password">Senha:</label>
                <!-- Remova o 'required' se for uma edição -->
                <div class="input-group">
                  <input :type="showPassword ? 'text' : 'password'" id="password" v-model="user.password" class="form-control" :required="!isEdit">
                  <div class="input-group-append">
                    <button type="button" class="btn btn-primary mx-2" @click="togglePasswordVisibility">
                      <i v-if="!showPassword" class="bi bi-eye-slash"></i>
                      <i v-else class="bi bi-eye"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="password_confirmation">Confirmação de Senha:</label>
                <div class="input-group">
                  <input :type="showPassword ? 'text' : 'password'" id="password_confirmation" v-model="user.password_confirmation" class="form-control" :required="!isEdit">
                  <div class="input-group-append">
                    <button type="button" class="btn btn-primary mx-2" @click="togglePasswordVisibility">
                      <i v-if="!showPassword" class="bi bi-eye-slash"></i>
                      <i v-else class="bi bi-eye"></i>
                    </button>
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-primary mt-2">{{ isEdit ? 'Editar' : 'Criar' }}</button>
            </form>
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
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      isEdit: false,
      showPassword: false,
    };
  },
  methods: {

    // Método para criar ou editar um usuário na API Laravel
    submitForm() {
      const apiUrl = this.isEdit ? `${process.env.VUE_APP_API_URL}/api/users/${this.$route.params.id}` : `${process.env.VUE_APP_API_URL}/api/users`;

      axios
          .request({
            url: apiUrl,
            method: this.isEdit ? 'put' : 'post',
            data: this.user,
          })
          .then(() => {
            if (this.isEdit) {
              alert('Usuário editado com sucesso!');
            } else {
              alert('Usuário criado com sucesso!');
            }
            console.log('Redirecionando para /home'); // Adicione esta linha para depuração
            this.$router.push('/home');
          })
          .catch((error) => {
            console.error(error);
            alert('Ocorreu um erro ao salvar o usuário.');
          });
    },
    // Método para buscar os detalhes do usuário caso seja uma edição
    fetchUserDetails() {
      if (this.isEdit) {
        axios
            .get(`${process.env.VUE_APP_API_URL}/api/users/${this.$route.params.id}/edit`)
            .then((response) => {
              this.user = response.data.user;
            })
            .catch((error) => {
              console.error(error);
            });
      }
    },
    // Método para alternar a visibilidade da senha
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
  created() {
    if (this.$route.params.id) {
      this.isEdit = true;
      this.fetchUserDetails();
    }
  },
};
</script>
