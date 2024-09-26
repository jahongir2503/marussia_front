<template>
  <div class="cars-in-stock-page">
    <h1>Машины в наличии</h1>

    <div v-if="cars.length" class="car-list">
      <div v-for="car in cars" :key="car.id" class="car-card">
        <h3>{{ car.model }}</h3>
        <p>Цена: {{ car.price }} ₽</p>
        <img :src="car.image" alt="Car image" />
        <div class="buttons">
          <button @click="showDetails(car.id)">Подробнее</button>
          <button @click="buyCar(car.id)">Купить</button>
        </div>
      </div>
    </div>

    <div v-else class="no-cars-message">
      <p>На данный момент автомобилей в наличии нет.</p>
    </div>
  </div>
</template>

<script>
import apiClient from '@/axios'; // Используем настроенный клиент API

export default {
  data() {
    return {
      cars: [], // Массив с машинами из API
    };
  },
  mounted() {
    this.fetchCars();
  },
  methods: {
    async fetchCars() {
      try {
        const token = localStorage.getItem('token'); // Получаем токен из localStorage
        const response = await apiClient.get('/car_in_stock', {
          headers: {
            Authorization: `Bearer ${token}`, // Передаём токен в заголовке
          },
        });
        this.cars = response.data;
      } catch (error) {
        console.error('Ошибка при получении данных о машинах:', error);
      }
    },
    showDetails(carId) {
      this.$router.push({ name: 'CarDetails', params: { id: carId } }); // Переход на страницу деталей
    },
    async buyCar(carId) {
      try {
        const token = localStorage.getItem('token'); // Получаем токен из localStorage
        const response = await apiClient.post('/buy_car', { car_id: carId }, {
          headers: {
            Authorization: `Bearer ${token}`, // Передаём токен в заголовке
          },
        });
        console.log('Покупка успешна:', response.data);
      } catch (error) {
        console.error('Ошибка при покупке автомобиля:', error);
      }
    }
  }
};
</script>

<style scoped>
.cars-in-stock-page {
  padding: 20px;
  background-color: black;
  color: white;
  text-align: center;
}

.car-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.car-card {
  background-color: white;
  color: black;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
}

.car-card img {
  width: 100%;
  height: auto;
}

.buttons {
  margin-top: 15px;
}

button {
  background-color: #ff3333;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  margin: 5px;
}

button:hover {
  background-color: #ff6666;
}

.no-cars-message {
  font-size: 1.5rem;
  margin-top: 40px;
}
</style>
