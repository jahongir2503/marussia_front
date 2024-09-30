<template>
  <div class="select-car-page">
    <h1>Выберите автомобиль для обслуживания</h1>

    <!-- Уведомления об ошибках -->
    <div v-if="messages.length" class="messages">
      <p v-for="(message, index) in messages" :key="index" :class="message.type">{{ message.text }}</p>
    </div>

    <!-- Список автомобилей -->
    <div v-if="cars.length">
      <div v-for="car in cars" :key="car.id" class="car-card">
        <h3>{{ car.name }}</h3>
        <MyButton @click="openModal(car.id)" class="btn">Выбрать</MyButton>
      </div>
    </div>
    <div v-else>
      <p>Нет доступных автомобилей.</p>
    </div>

    <!-- Модальное окно для выбора услуги -->
    <Modal v-if="showModal" @close="closeModal" is-visible>
      <h2>Выберите услугу</h2>
      <label for="service">Услуга</label>
      <select id="service" v-model="selectedServiceId">
        <option v-for="service in services" :key="service.id" :value="service.id">
          {{ service.name }} ({{ service.price }} $)
        </option>
      </select>
      <MyButton @click="submitRequest" class="btn">Подтвердить</MyButton>
    </Modal>
  </div>
</template>

<script>
import apiClient from '@/axios';
import MyButton from '@/components/UI/Button.vue'; // Кастомная кнопка
import Modal from '@/components/UI/Modal.vue'; // Модалка

export default {
  components: {
    MyButton,
    Modal,
  },
  data() {
    return {
      cars: [], // Список машин
      services: [], // Список услуг
      selectedCarId: null, // ID выбранной машины
      selectedServiceId: null, // ID выбранной услуги
      showModal: false, // Управление показом модального окна
      messages: [],
    };
  },
  mounted() {
    this.fetchCars();
    this.fetchServices();
  },
  methods: {
    async fetchCars() {
      try {
        const token = localStorage.getItem('token');
        const response = await apiClient.get('/cars', {
          headers: {Authorization: `Bearer ${token}`},
        });
        this.cars = response.data.data;
      } catch (error) {
        this.addMessage('Ошибка загрузки списка машин.', 'error');
      }
    },
    async fetchServices() {
      try {
        const token = localStorage.getItem('token');
        const response = await apiClient.get('/service', {
          headers: {Authorization: `Bearer ${token}`},
        });
        this.services = response.data.data;
      } catch (error) {
        this.addMessage('Ошибка загрузки списка услуг.', 'error');
      }
    },
    openModal(carId) {
      this.selectedCarId = carId;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedServiceId = null; // Сбрасываем выбранную услугу
    },
    async submitRequest() {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('user_id');
        const requestData = {
          user_id: userId,
          car_id: this.selectedCarId,
          service_id: [this.selectedServiceId],
          description: 'Запрос на сервис',
          status_id: 1,
        };

        await apiClient.post('/request', requestData, {
          headers: {Authorization: `Bearer ${token}`},
        });

        this.addMessage('Заявка успешно отправлена!', 'success');
        this.closeModal(); // Закрываем модальное окно после успешной отправки
      } catch (error) {
        this.addMessage('Ошибка при отправке заявки.', 'error');
      }
    },
    addMessage(text, type) {
      this.messages.push({text, type});
      setTimeout(() => this.messages.shift(), 5000);
    },
  },
};
</script>

<style scoped>
.select-car-page {
  padding: 70px;
  background-color: black;
  color: white;
  text-align: center;
}

.car-card {
  margin: 20px;
  padding: 20px;
  background-color: white;
  color: black;
  border-radius: 10px;
}

.btn {
  margin-top: 10px;
}
</style>