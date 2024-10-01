<template>
  <div class="profile-page">
    <h1>Профиль</h1>
    <div class="user-info">
      <h3>Имя: {{ userData.name }}</h3>
      <p>Фамилия: {{ userData.surname }}</p>
      <p>Отчество: {{ userData.last_name }}</p>
      <p>Почта: {{ userData.email }}</p>
      <p>Тел.: {{ userData.number }}</p>
    </div>

    <!-- Если пользователь админ, показываем админские функции -->
    <div v-if="isAdmin" class="admin-section">
      <h2>Административные функции</h2>
      <ul>
        <li><router-link to="/admin/cars">Управление автомобилями</router-link></li>
        <li><router-link to="/admin/parts">Управление запчастями</router-link></li>
        <li><router-link to="/admin/news">Управление новостями</router-link></li>
        <li><router-link to="/admin/requests">Управление заявками</router-link></li>
      </ul>
    </div>

    <!-- Если пользователь обычный, показываем его заявки -->
    <div v-else>
      <h2>Мои заявки</h2>

      <!-- Запросы на покупку автомобилей -->
      <div v-if="carRequests.length">
        <h2>Запросы на покупку автомобилей</h2>
        <ul>
          <li v-for="request in carRequests" :key="request.id">
            <strong>Операция:</strong> Покупка авто {{ request.car.name }} <br>
            <strong>Дата запроса:</strong> {{ formatDate(request.created_at) }} <br>
            <strong>Статус:</strong> {{ request.status.name }}
          </li>
        </ul>
      </div>

      <!-- Записи на ТО -->
      <div v-if="serviceRequests.length">
        <h2>Записи на обслуживание</h2>
        <ul>
          <li v-for="request in serviceRequests" :key="request.id">
            <strong>Операция:</strong> ТО {{ request.service_name }} <br>
            <strong>Машина:</strong> {{ request.car.name }} <br>
            <strong>Дата запроса:</strong> {{ formatDate(request.created_at) }} <br>
            <strong>Статус:</strong> {{ request.status.name }}
          </li>
        </ul>
      </div>

      <p v-else>У вас пока нет заявок.</p>
    </div>
  </div>
</template>

<script>
import apiClient from '@/axios'; // axios клиент для API запросов

export default {
  data() {
    return {
      userData: {}, // Информация о пользователе
      carRequests: [], // Запросы на покупку авто
      serviceRequests: [], // Записи на ТО
      isAdmin: false // Флаг для проверки администратора
    };
  },
  created() {
    this.checkUserRole(); // Проверяем роль пользователя
    this.fetchUserData(); // Получаем данные пользователя
    this.fetchUserRequests(); // Получаем заявки пользователя
  },
  methods: {
    // Метод для загрузки запросов пользователя
    async fetchUserRequests() {
      try {
        const userId = localStorage.getItem('user_id');

        // Запросы на покупку автомобилей
        const carResponse = await apiClient.get(`/api/user/${userId}/buy_car`);
        this.carRequests = carResponse.data.data;

        // Записи на ТО
        const serviceResponse = await apiClient.get(`/api/user/${userId}/service_requests`);
        this.serviceRequests = serviceResponse.data.data;

      } catch (error) {
        console.error('Ошибка при загрузке запросов:', error);
      }
    },
    // Проверяем роль пользователя
    checkUserRole() {
      const roleId = localStorage.getItem('role_id'); // Получаем роль из localStorage
      this.isAdmin = roleId === '1';
    },
    // Получаем данные пользователя
    async fetchUserData() {
      try {
        const userId = localStorage.getItem('user_id');
        const response = await apiClient.get(`/user/${userId}`);
        this.userData = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке данных пользователя:', error);
      }
    },
    // Форматирование даты
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  }
};
</script>

<style scoped>
.profile-page {
  padding: 100px;
  color: white;
  background-color: black;
}

.user-info {
  margin-bottom: 30px;
}

.admin-section {
  margin-top: 30px;
}

ul {
  list-style-type: none;
}

li {
  margin-bottom: 20px;
}

h1, h2, h3 {
  color: red;
}

.request-card {
  background-color: white;
  color: black;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
