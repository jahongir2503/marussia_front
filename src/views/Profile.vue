<template>
  <div class="profile-page">
    <h1>Профиль</h1>
    <div class="user-info">
      <h3>{{ userData.name }}</h3>
      <p>ФИО: {{ userData.fullName }}</p>
      <p>Почта: {{ userData.email }}</p>
      <p>Тел.: {{ userData.phone }}</p>
      <MyButton @click="editProfile" label="Редактировать Профиль">Редактировать Данные</MyButton>
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
      <div v-if="userRequests.length">
        <div v-for="request in userRequests" :key="request.id" class="request-card">
          <p>Название: {{ request.title }}</p>
          <p>Автомобиль: {{ request.car }}</p>
          <p>Дата подачи: {{ request.date }}</p>
          <p>Статус: {{ request.status }}</p>
        </div>
      </div>
      <p v-else>У вас пока нет заявок.</p>
    </div>
  </div>
</template>

<script>
import MyButton from '@/components/UI/Button.vue'; // Кастомная кнопка
import apiClient from '@/axios'; // axios клиент для API запросов

export default {
  components: {
    MyButton
  },
  data() {
    return {
      userData: {}, // Информация о пользователе
      userRequests: [], // Заявки пользователя
      isAdmin: false,  // Флаг для проверки администратора
    };
  },
  created() {
    this.checkUserRole(); // Проверяем роль пользователя
    this.fetchUserData(); // Получаем данные пользователя
    this.fetchUserRequests(); // Получаем заявки пользователя
  },
  methods: {
    // Проверяем роль пользователя
    checkUserRole() {
      const roleId = localStorage.getItem('role_id'); // Получаем роль из localStorage
      this.isAdmin = roleId === '1'; // Если роль 1 - администратор
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
    // Получаем заявки пользователя
    async fetchUserRequests() {
      try {
        const userId = localStorage.getItem('user_id');
        const response = await apiClient.get(`/requests?user_id=${userId}`);
        this.userRequests = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке заявок:', error);
      }
    },
    // Переход на страницу редактирования профиля
    editProfile() {
      this.$router.push('/edit-profile');
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

.request-card {
  background-color: white;
  color: black;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
