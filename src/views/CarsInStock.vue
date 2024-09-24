<template>
  <section class="cars-in-stock">
    <h2>Машины в наличии</h2>

    <div v-if="cars.length" class="cars-list">
      <div class="car-card" v-for="car in cars" :key="car.id">
        <img :src="car.image" :alt="car.name" class="car-image" />
        <h3>{{ car.name }}</h3>
        <p>От <span class="price">{{ car.price }}</span></p>
        <div class="buttons">
          <MyButton @click="buyCar(car.id)">Купить</MyButton>
          <router-link :to="`/models/${car.id}`" class="btn-link">
            <MyButton>Подробнее</MyButton>
          </router-link>
        </div>
      </div>
    </div>

    <div v-else class="no-cars">
      <p>Извините, в данный момент машины отсутствуют в наличии.</p>
    </div>
  </section>
</template>

<script>
import apiClient from '@/axios';
import MyButton from "@/components/UI/Button.vue";

export default {
  name: "CarsInStock",
  components: {
    MyButton,
  },
  data() {
    return {
      cars: [],
    };
  },
  methods: {
    async fetchCars() {
      try {
        const response = await apiClient.get('/cars'); // Запрос к API Laravel
        this.cars = response.data; // Заполняем массив машин
      } catch (error) {
        console.error("Ошибка при получении списка машин", error);
      }
    },
    buyCar(id) {
      console.log(`Покупка машины с ID: ${id}`);
      // Логика для покупки машины
    }
  },
  mounted() {
    this.fetchCars(); // Загружаем список машин при загрузке компонента
  }
};
</script>

<style scoped>

body{
  background-color: black;
}

.cars-in-stock {
  text-align: center;
  color: white;
  margin-top: 76px;
  background: black;
}

.cars-in-stock h2 {
  font-size: 3vw;
  margin-bottom: 30px;
}

.cars-list {
  display: flex;
  justify-content: center;
  gap: 3vw;
}

.car-card {
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  width: 20vw;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.car-image {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
}

.car-card h3 {
  font-size: 1.8vw;
  color: black;
}

.car-card p {
  font-size: 1.2vw;
  color: black;
}

.price {
  color: red;
  font-weight: bold;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.no-cars {
  margin-top: 50px;
  color: white;
  font-size: 1.5vw;
}
</style>
