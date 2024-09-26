<template>
  <div class="profile-page">
    <h1>Profile</h1>

    <div class="profile-content">
      <div class="requests">
        <h2>Заявки</h2>
        <div v-if="requests.length">
          <div v-for="request in requests" :key="request.id" class="request-card">
            <p><strong>Название:</strong> {{ request.name }}</p>
            <p><strong>Автомобиль:</strong> {{ request.car_name }}</p>
            <p><strong>Дата подачи:</strong> {{ request.created_at }}</p>
            <p><strong>Статус:</strong> {{ request.status }}</p>
          </div>
        </div>
        <p v-else>У вас пока нет заявок или заказов.</p>
      </div>

      <div class="user-info">
        <h2>User</h2>
        <p><strong>ФИО:</strong> {{ user.full_name }}</p>
        <p><strong>Почта:</strong> {{ user.email }}</p>
        <p><strong>Тел.:</strong> {{ user.phone }}</p>
        <button @click="editProfile">Редактировать Профиль</button>
      </div>
    </div>


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
      user: {
        full_name: '',
        email: '',
        phone: '',
      },
      requests: [], // Данные о заявках
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.user = user;
    } else {
      this.$router.push('/login'); // Перенаправление на страницу входа, если пользователь не авторизован
    }
    this.fetchUserRequests();
  },
  methods: {
    async fetchUserRequests() {
      try {
        const token = localStorage.getItem('token');
        const response = await apiClient.get('/requests', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.requests = response.data;
      } catch (error) {
        console.error('Ошибка при получении заявок:', error);
      }
    },
    editProfile() {
      this.$router.push('/edit-profile');
    }
  },
};
</script>

<style scoped>
.profile-page {
  background-color: black;
  color: white;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-content {
  display: flex;
  justify-content: space-between;
  width: 80%;
}

.requests, .user-info {
  background-color: white;
  color: black;
  padding: 20px;
  border-radius: 10px;
  width: 45%;
}

.request-card {
  background-color: #f5f5f5;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

button {
  background-color: #ff3333;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;
}

button:hover {
  background-color: #ff6666;
}

p {
  margin: 5px 0;
}
</style>
