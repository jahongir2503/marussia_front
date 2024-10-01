<template>
  <div class="admin-requests">
    <h1>Управление Запросами</h1>

    <!-- Для каждого запроса -->
    <div v-for="request in requestsList" :key="request.id" class="request-card">
      <h2>{{ getRequestType(request) }}</h2>
      <p><strong>Пользователь:</strong> {{ getUserName(request.user_id) }}</p>
      <p><strong>Описание:</strong> {{ request.description || 'Нет описания' }}</p>
      <p><strong>Машина:</strong> {{ getCarName(request.car_id) }}</p>
      <p><strong>Дата заявки:</strong> {{ request.date }}</p>
      <p><strong>Текущий статус:</strong> {{ getStatusName(request.status_id) }}</p>

      <!-- Селектор для изменения статуса -->
      <label for="status">Изменить статус:</label>
      <select v-model="request.status_id" @change="updateRequestStatus(request)">
        <option v-for="status in statusList" :key="status.id" :value="status.id">
          {{ status.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import apiClient from '@/axios';

export default {
  data() {
    return {
      requestsList: [],
      statusList: [], // Список статусов
      carsList: [], // Список машин
      usersList: [] // Список пользователей
    };
  },
  created() {
    this.fetchRequests();
    this.fetchStatuses(); // Загружаем статусы
    this.fetchCars(); // Загружаем машины
    this.fetchUsers(); // Загружаем всех пользователей
  },
  methods: {
    // Получаем все запросы всех пользователей
    async fetchRequests() {
      try {
        const response = await apiClient.get('/all_requests'); // Обращаемся к API для всех запросов
        this.requestsList = response.data.data;
      } catch (error) {
        console.error('Ошибка при загрузке запросов:', error);
      }
    },
    // Получаем список статусов
    async fetchStatuses() {
      try {
        const response = await apiClient.get('/request_status');
        this.statusList = response.data.data;
      } catch (error) {
        console.error('Ошибка при загрузке статусов:', error);
      }
    },
    // Получаем список машин
    async fetchCars() {
      try {
        const response = await apiClient.get('/cars');
        this.carsList = response.data.data;
      } catch (error) {
        console.error('Ошибка при загрузке машин:', error);
      }
    },
    // Получаем список пользователей
    async fetchUsers() {
      try {
        const response = await apiClient.get('/users');
        this.usersList = response.data.data;
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
      }
    },
    // Возвращаем имя пользователя по его ID
    getUserName(userId) {
      const user = this.usersList.find(user => user.id === userId);
      return user ? `${user.name} ${user.surname}` : 'Неизвестный пользователь';
    },
    // Возвращаем название машины по её ID
    getCarName(carId) {
      const car = this.carsList.find(car => car.id === carId);
      return car ? car.name : 'Неизвестная машина';
    },
    // Возвращаем название статуса по его ID
    getStatusName(statusId) {
      const status = this.statusList.find(status => status.id === statusId);
      return status ? status.name : 'Неизвестный статус';
    },
    // Обновляем статус запроса
    async updateRequestStatus(request) {
      try {
        await apiClient.patch(`/update_request/${request.id}`, {
          status_id: request.status_id
        });
        alert('Статус обновлен успешно!');
      } catch (error) {
        console.error('Ошибка при обновлении статуса:', error);
      }
    },
    getRequestType(request) {
      return request.description ? 'Запись на ТО' : 'Покупка автомобиля';
    }
  }
};
</script>

<style scoped>
.admin-requests {
  padding: 100px;
}
.request-card {
  border: 1px solid #ccc;
  padding: 15px;
  margin: 15px 0;
}
</style>
