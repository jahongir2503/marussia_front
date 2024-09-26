<template>
  <div class="register-page">
    <h1>Регистрация</h1>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="name">Имя</label>
        <input type="text" v-model="name" id="name" required />
        <span v-if="errors.name" class="error">{{ errors.name[0] }}</span>
      </div>

      <div class="form-group">
        <label for="surname">Фамилия</label>
        <input type="text" v-model="surname" id="surname" required />
        <span v-if="errors.surname" class="error">{{ errors.surname[0] }}</span>
      </div>

      <div class="form-group">
        <label for="last_name">Отчество</label>
        <input type="text" v-model="last_name" id="last_name" required />
        <span v-if="errors.last_name" class="error">{{ errors.last_name[0] }}</span>
      </div>

      <div class="form-group">
        <label for="email">Электронная почта</label>
        <input type="email" v-model="email" id="email" required />
        <span v-if="errors.email" class="error">{{ errors.email[0] }}</span>
      </div>

      <div class="form-group">
        <label for="number">Номер телефона</label>
        <input type="text" v-model="number" id="number" required />
        <span v-if="errors.number" class="error">{{ errors.number[0] }}</span>
      </div>

      <div class="form-group">
        <label for="password">Пароль</label>
        <input type="password" v-model="password" id="password" required />
        <span v-if="errors.password" class="error">{{ errors.password[0] }}</span>
      </div>

      <button type="submit">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import apiClient from '@/axios'; // Подключаем настроенный axios

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      name: '',
      surname: '',
      last_name: '',
      email: '',
      number: '',
      password: '',
      errors: {}, // Переменная для хранения ошибок
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await apiClient.post('/registration', {
          name: this.name,
          surname: this.surname,
          last_name: this.last_name,
          email: this.email,
          number: this.number,
          password: this.password,
        });
        // Очистка ошибок при успешной регистрации
        this.errors = {};
        console.log(response.data);
        // Перенаправление после успешной регистрации
        this.$router.push('/');
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors;
        } else {
          console.error('Ошибка при регистрации:', error);
        }
      }
    },
  },
};
</script>

<style scoped>
.register-page {
  background-color: black;
  color: white;
  padding: 80px;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.error {
  color: red;
  font-size: 14px;
}

button {
  background-color: #ff3333;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}

button:hover {
  background-color: #ff6666;
}
</style>
