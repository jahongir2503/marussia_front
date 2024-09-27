<template>
  <div class="cars-in-stock-page">
    <h1>Машины в наличии</h1>

    <div v-if="cars.length" class="car-list">
      <div v-for="car in cars" :key="car.id" class="car-card">
        <img :src="car.image" alt="Car image" class="car-image" />
        <h3>{{ car.name }}</h3> <!-- Используем поле name как модель автомобиля -->
        <p>От <span class="price">{{ car.price }} $</span></p>
        <div class="buttons">
          <MyButton @click="buyCar(car.id)" label="Buy">Купить</MyButton>
          <MyButton @click="showDetails(car.id)" label="More">Подробнее</MyButton>
        </div>
      </div>
    </div>

    <div v-else class="no-cars-message">
      <p>На данный момент автомобилей в наличии нет.</p>
    </div>
  </div>
</template>

<script>
import apiClient from '@/axios';
import MyButton from '@/components/UI/Button.vue'; // Используем кастомную кнопку

export default {
  components: {
    MyButton
  },
  data() {
    return {
      cars: [], // Массив с машинами
    };
  },
  mounted() {
    this.fetchCarsInStock();
  },
  methods: {
    async fetchCarsInStock() {
      try {
        const token = localStorage.getItem('token');
        // Получаем машины в наличии
        const response = await apiClient.get('/car_in_stock', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const carsInStock = response.data.data;

        // Для каждой машины получаем информацию по car_id из таблицы cars
        for (const car of carsInStock) {
          const carDetails = await this.fetchCarDetails(car.car_id);
          this.cars.push({
            ...carDetails, // Добавляем модель (name), изображение и другие данные
            price: car.price, // Добавляем цену из car_in_stock
          });
        }
      } catch (error) {
        console.error('Ошибка при получении данных о машинах:', error);
      }
    },
    async fetchCarDetails(carId) {
      try {
        const token = localStorage.getItem('token');
        const response = await apiClient.get(`/cars/${carId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error(`Ошибка при получении данных о машине с ID ${carId}:`, error);
        return {};
      }
    },
    showDetails(carId) {
      this.$router.push({ name: 'CarDetails', params: { id: carId } }); // Переход на страницу деталей
    },
    buyCar(carId) {
      this.$router.push({ name: 'BuyCarForm', params: { id: carId } }); // Переход на форму покупки
    }
  }
};
</script>

<style scoped>
.cars-in-stock-page {
  padding: 215px;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.car-card h3 {
  font-size: 1.5rem;
}

.car-card p {
  margin: 10px 0;
}

.car-card .price {
  color: #ff3333;
  font-weight: bold;
}

.car-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.no-cars-message {
  font-size: 1.5rem;
  margin-top: 40px;
}
</style>
