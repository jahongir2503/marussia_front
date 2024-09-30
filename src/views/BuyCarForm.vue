<template>
  <div class="buy-car-form">
    <h1>Подтвердите покупку автомобиля</h1>

    <div v-if="car">
      <h2>{{ car.name }}</h2>
      <img :src="car.image" alt="Car image" />
      <p>Цена: {{ car.price }} $</p>

      <MyButton @click="submitRequest">Подтвердить покупку</MyButton>
    </div>

    <div v-if="isSuccess" class="success-message">
      <p>Заявка успешно отправлена! Ожидайте звонка наших дилеров.</p>
    </div>

    <div v-if="isLoading" class="loading-message">
      <p>Отправка заявки...</p>
    </div>

    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>

    <div v-else-if="!car && !isLoading" class="loading-message">
      <p>Загрузка данных об автомобиле...</p>
    </div>
  </div>
</template>

<script>
import apiClient from '@/axios';
import MyButton from '@/components/UI/Button.vue';

export default {
  components: {
    MyButton,
  },
  data() {
    return {
      car: null, // Информация о машине
      isSuccess: false, // Успешное выполнение заявки
      isLoading: false, // Идет ли процесс отправки заявки
      errorMessage: '', // Сообщение об ошибке
    };
  },
  mounted() {
    this.fetchCarDetails(); // Загружаем данные об автомобиле при монтировании компонента
  },
  methods: {
    async fetchCarDetails() {
      const carId = this.$route.params.id; // Получаем ID машины из параметров маршрута
      try {
        const response = await apiClient.get(`/cars/${carId}`);
        this.car = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке данных об автомобиле:', error);
        this.errorMessage = 'Не удалось загрузить данные автомобиля.';
      }
    },
    async submitRequest() {
      try {
        this.isLoading = true; // Отображаем индикатор загрузки
        this.errorMessage = ''; // Очищаем ошибку перед новым запросом
        const userId = localStorage.getItem('user_id'); // Предполагаем, что user_id хранится в localStorage
        const carId = this.$route.params.id;
        const statusId = 1; // Начальный статус заявки "Ожидайте звонка"

        const requestData = {
          user_id: userId,
          car_id: carId,
          status_id: statusId,
          date: new Date().toISOString().split('T')[0], // Текущая дата
        };

        await apiClient.post('/buy_car', requestData);
        this.isSuccess = true; // Показываем успешное сообщение
        this.isLoading = false; // Отключаем индикатор загрузки
      } catch (error) {
        console.error('Ошибка при отправке заявки:', error);
        this.errorMessage = 'Не удалось отправить заявку. Пожалуйста, попробуйте позже.';
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.buy-car-form {
  padding: 50px;
  background-color: black;
  color: white;
  text-align: center;
}

img {
  max-width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
}

p {
  font-size: 1.5rem;
}

button {
  margin-top: 20px;
}

.success-message {
  color: #4caf50;
  font-size: 1.5rem;
  margin-top: 20px;
}

.loading-message, .error-message {
  font-size: 1.5rem;
  color: #ff3333;
  margin-top: 20px;
}
</style>
