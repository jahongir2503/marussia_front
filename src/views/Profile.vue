<template>
  <section class="profile">
    <h2>Profile</h2>
    <div class="profile-info">
      <div class="user-info">
        <h3>{{ user.name }}</h3>
        <p>ФИО: {{ user.full_name }}</p>
        <p>Почта: {{ user.email }}</p>
        <p>Тел.: {{ user.phone }}</p>
        <button @click="editProfile">Редактировать Профиль</button>
      </div>
      <div class="requests">
        <h3>Заявки</h3>
        <div v-for="request in requests" :key="request.id" class="request-item">
          <p>Название: {{ request.name }}</p>
          <p>Автомобиль: {{ request.car.name }}</p>
          <p>Дата подачи: {{ request.date }}</p>
          <p>Статус: {{ request.status }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import apiClient from '@/axios';

export default {
  data() {
    return {
      user: null, // Данные пользователя
      requests: [], // Заявки пользователя
    };
  },
  methods: {
    async fetchProfileData() {
      const token = localStorage.getItem('token');
      try {
        const profileResponse = await apiClient.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = profileResponse.data;

        const requestsResponse = await apiClient.get('/profile/requests', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.requests = requestsResponse.data;
      } catch (error) {
        console.error('Ошибка получения данных профиля или заявок', error);
      }
    },
    editProfile() {
      // Логика для редактирования профиля
    }
  },
  mounted() {
    this.fetchProfileData();
  }
};
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  padding: 50px;
}

.profile-info {
  display: flex;
  justify-content: space-between;
}

.user-info, .requests {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 45%;
}

.user-info h3 {
  font-size: 2rem;
  color: black;
}

.requests .request-item {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
