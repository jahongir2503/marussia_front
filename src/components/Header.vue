<template>
  <header>
    <router-link to="/" class="logo-link">
      <h1 class="logo">MARUSSIA</h1>
    </router-link>
    <nav>
      <ul>
        <li><router-link to="/stock">Автомобили в наличии</router-link></li>
        <li><router-link to="/car-select">Услуги</router-link></li>
        <li><router-link to="/details">Детали</router-link></li>
        <li><router-link to="/AboutUs">О нас</router-link></li>
        <li v-if="!isAuthenticated"><a href="#" @click.prevent="showLoginModal = true">Войти</a></li>
        <li v-else>
          <router-link to="/profile">Профиль</router-link> <br>
          <a href="#" @click.prevent="logout">Выйти</a>
        </li>
      </ul>
    </nav>

    <!-- Модальное окно для входа -->
    <Modal :isVisible="showLoginModal" @close="showLoginModal = false">
      <h2 class="modal-title">Login</h2>
      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Email" class="modal-input" required />
        <input type="password" v-model="password" placeholder="Password" class="modal-input" required />
        <button type="submit" class="modal-button">Login</button>
        <p v-if="loginError" class="error-message">{{ loginError }}</p>
      </form>
      <div class="modal-footer">
        <router-link to="/Register">Регистрация</router-link>
        <router-link to="/forgot-password">Forgot your password?</router-link>
      </div>
    </Modal>
  </header>
</template>

<script>
import Modal from "@/components/UI/Modal.vue";
import axios from "axios";

export default {
  components: {
    Modal
  },
  data() {
    return {
      showLoginModal: false,
      email: '',
      password: '',
      loginError: '',
      isAuthenticated: false,
    };
  },
  methods: {
    login() {
      axios
          .post("http://127.0.0.1:8000/api/authorization", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            const token = response.data.token;
            const userId = response.data.user_id;
            localStorage.setItem("token", token); // Сохраняем токен в localStorage
            localStorage.setItem("user_id", userId); // Сохраняем токен в localStorage
            this.isAuthenticated = true;
            this.showLoginModal = false;
            this.loginError = '';
          })
          .catch((error) => {
            this.loginError = "Ошибка авторизации. Проверьте данные.";
          });
    },
    logout() {
      localStorage.removeItem("token"); // Удаляем токен из localStorage
      this.isAuthenticated = false; // Обновляем статус авторизации
      this.$router.push('/'); // Перенаправляем на главную страницу
    },
    checkAuth() {
      const token = localStorage.getItem("token");
      this.isAuthenticated = !!token;
    },
  },
  created() {
    this.checkAuth(); // Проверяем авторизацию при загрузке компонента
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  background-color: black;
  height: 10vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.modal-title {
  text-align: center;
  color: red;
  margin-bottom: 20px;
}

.modal-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.modal-button {
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
}

.modal-button:hover {
  background-color: darkred;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.modal-footer a {
  color: red;
  text-decoration: none;
}

.error-message {
  color: red;
  text-align: center;
  margin-bottom: 10px;
}

.logo-link {
  text-decoration: none;
}

.logo {
  font-family: 'Goblin One', sans-serif;
  font-size: 2.5vw;
  color: red;
  cursor: pointer;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 2vw;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-family: 'Fira Sans Extra Condensed', sans-serif;
  font-size: 1.2vw;
}
</style>
