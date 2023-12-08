import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';



const app = createApp(App);
app.use(router);

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

// Intercepte todas as solicitações e inclua o token de acesso, se estiver disponível
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Verifique se o usuário está autenticado antes de montar a aplicação
router.isReady().then(() => {
    const token = localStorage.getItem('token');

    if (token) {
        // Se o token estiver presente, o usuário está autenticado, então vá para a rota "home" ou outra rota protegida
        router.push({ name: 'home' });
    } else {
        // Se o token não estiver presente, o usuário não está autenticado e você pode redirecioná-lo para a rota de login
        router.push({ name: 'login' });
    }

    app.mount('#app');
});
