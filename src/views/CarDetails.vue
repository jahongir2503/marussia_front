<template>
  <div class="car-details-page">
    <h1>{{ car.name }}</h1>
    <div class="car-details">
      <div class="car-image">
        <img
            :src="car.image ? getImageUrl(car.image) : getPlaceholderImage()"
            alt="car image"
            class="car-image"
        />
      </div>
      <div class="car-info">
        <h2>{{ car.name }}</h2>
        <p>{{ car.transmission }}</p>
        <p>{{ car.engine_capacity }} AT ({{ car.horsepower }} H.P.)</p>
        <p class="price">{{ car.price }} $</p>
        <MyButton @click="buyCar(car.id)" label="Submit Request">Оформить заявку</MyButton>
      </div>
    </div>

    <div class="car-specifications">
      <h2>Technical Specifications</h2>
      <ul>
        <li><strong>Engine:</strong> {{ car.engine_capacity }} AT ({{ car.horsepower }} H.P.)</li>
        <li><strong>Transmission:</strong> {{ car.transmission }}</li>
        <li><strong>Specifications:</strong> {{ car.specifications }}</li>
      </ul>
    </div>

    <div class="car-description">
      <h2>Описание</h2>
      <p>{{ car.description }}</p>
    </div>
  </div>
</template>

<script>
import MyButton from '@/components/UI/Button.vue';
import apiClient from '@/axios';

export default {
  components: {
    MyButton,
  },
  data() {
    return {
      car: {}, // Данные об автомобиле
    };
  },
  async mounted() {
    await this.fetchCarDetails();
  },
  methods: {
    getImageUrl(imagePath) {
      return `http://localhost:8000/storage/${imagePath}`; // Генерация правильного пути к изображениям
    },
    getPlaceholderImage() {
      return require('@/assets/placeholder.png'); // Заглушка, если изображения нет
    },
    async fetchCarDetails() {
      try {
        // Получаем ID автомобиля из маршрута
        const carId = this.$route.params.id;

        // Получаем данные автомобиля
        const response = await apiClient.get(`/cars/${carId}`);
        this.car = response.data;

        // Получаем цену из таблицы наличия
        const carInStock = await apiClient.get(`/car_in_stock?car_id=${carId}`);
        if (carInStock.data && carInStock.data.length > 0) {
          this.car.price = carInStock.data[0].price; // Добавляем цену
        }
      } catch (error) {
        console.error('Ошибка при получении деталей автомобиля:', error);
      }
    },
    async buyCar(carId) {
      try {
        const requestData = {
          car_id: carId,
          status_id: 1,
        };
        await apiClient.post('/buy_car', requestData);
        alert('Заявка успешно отправлена! Наши дилеры скоро свяжутся с вами.');
      } catch (error) {
        console.error('Ошибка при оформлении заявки:', error);
      }
    },
  },
};
</script>

<style scoped>
.car-details-page {
  padding: 100px;
  background-color: black;
  color: white;
}

.car-details {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.car-image img {
  max-width: 100%;
  border-radius: 10px;
}

.car-info {
  max-width: 400px;
}

.price {
  color: red;
  font-size: 2rem;
  margin-top: 10px;
}

.car-specifications ul {
  list-style-type: none;
  padding: 0;
}

.car-specifications li {
  margin: 10px 0;
}

.car-description {
  margin-top: 40px;
}
</style>
