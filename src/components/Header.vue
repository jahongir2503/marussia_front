<template>
  <header>
    <router-link to="/" class="logo-link">
      <h1 class="logo">MARUSSIA</h1>
    </router-link>
    <nav>
      <ul>
        <li><router-link to="/">Модели</router-link></li>
        <li><router-link to="/stock">Автомобили в наличии</router-link></li>
        <li><router-link to="/details">Детали</router-link></li>
        <li><router-link to="/services">Услуги</router-link></li>
        <li><router-link to="/about">О нас</router-link></li>

        <li v-if="isAuthenticated">
          <router-link :to="`/profile/${user.id}`">{{ user.name }}</router-link>
        </li>

        <li v-else>
          <a href="#" @click.prevent="showLoginModal = true">Войти</a>
        </li>
      </ul>
    </nav>


    <Modal :isVisible="showLoginModal" @close="showLoginModal = false">
      <h2 class="modal-title">Login</h2>
      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Email" class="modal-input" required />
        <input type="password" v-model="password" placeholder="Password" class="modal-input" required />
        <div v-if="loginError" class="error-message">{{ loginError }}</div> <!-- Сообщение об ошибке входа -->
        <button type="submit" class="modal-button">Login</button>
      </form>
      <div class="modal-footer">
        <a href="#" @click.prevent="openRegisterModal">Registration</a>
        <router-link to="/forgot-password">Forgot your password?</router-link>
      </div>
    </Modal>


    <Modal :isVisible="showRegisterModal" @close="showRegisterModal = false">
      <h2 class="modal-title">Registration</h2>
      <form @submit.prevent="register">
        <input type="text" v-model="name" placeholder="Name" class="modal-input" required />
        <input type="text" v-model="surname" placeholder="Surname" class="modal-input" required />
        <input type="text" v-model="patronymic" placeholder="Patronymic" class="modal-input" required />
        <input type="text" v-model="phoneNumber" placeholder="Phone Number" class="modal-input" required />
        <input type="email" v-model="email" placeholder="Email" class="modal-input" required />
        <input type="password" v-model="password" placeholder="Password" class="modal-input" required />
        <div v-if="registrationError" class="error-message">{{ registrationError }}</div>
        <button type="submit" class="modal-button">Register</button>
      </form>
      <div class="modal-footer">
        <a href="#" @click.prevent="openLoginModal">Уже есть аккаунт? Войти</a>
      </div>
    </Modal>
  </header>
</template>

<script>
import Modal from "@/components/UI/Modal.vue";
import apiClient from '@/axios';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      showLoginModal: false,
      showRegisterModal: false,
      email: '',
      password: '',
      name: '',
      surname: '',
      patronymic: '',
      phoneNumber: '',
      user: null,
      loginError: '',
      registrationError: '',
    };
  },
  computed: {
    isAuthenticated() {
      return !!this.user;
    }
  },
  methods: {
    async login() {
      try {
        const response = await apiClient.post('/login', {
          email: this.email,
          password: this.password
        });
        localStorage.setItem('token', response.data.token);
        this.fetchUserProfile();
        this.showLoginModal = false;
        this.loginError = '';
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.loginError = 'Неверные данные для входа';
        } else {
          this.loginError = 'Произошла ошибка. Попробуйте позже.';
        }
      }
    },
    async register() {
      try {
        const response = await apiClient.post('/register', {
          name: this.name,
          surname: this.surname,
          patronymic: this.patronymic,
          phone: this.phoneNumber,
          email: this.email,
          password: this.password
        });
        localStorage.setItem('token', response.data.token);
        this.fetchUserProfile();
        this.showRegisterModal = false;
        this.registrationError = '';
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.registrationError = 'Неверные данные для регистрации';
        } else {
          this.registrationError = 'Произошла ошибка. Попробуйте позже.';
        }
      }
    },
    async fetchUserProfile() {
      try {
        const token = localStorage.getItem('token');
        const response = await apiClient.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.user = response.data;
      } catch (error) {
        console.error('Ошибка при получении данных профиля', error);
      }
    },
    openRegisterModal() {
      this.showLoginModal = false;
      this.showRegisterModal = true;
    },
    openLoginModal() {
      this.showRegisterModal = false;
      this.showLoginModal = true;
    }
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.fetchUserProfile();
    }
  }
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
