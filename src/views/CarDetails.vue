<template>
  <section class="car-details">
    <button @click="$router.push('/stock')" class="back-button">Назад к автомобилям</button>

    <div class="car-header">
      <div class="car-image-container">
        <img :src="car.image" :alt="car.name" class="car-image" />
        <!-- Если у тебя есть слайдер или несколько изображений, тут можно добавить их переключение -->
      </div>

      <div class="car-info">
        <h1>{{ car.name }}</h1>
        <ul>
          <li><strong>{{ car.specs.transmission }}</strong></li>
          <li><strong>{{ car.specs.engine }}</strong></li>
          <li><strong>{{ car.specs.drivetrain }}</strong></li>
        </ul>
        <h2 class="price">{{ car.price }}</h2>
        <MyButton @click="arrangePurchase">Забронировать</MyButton>
      </div>
    </div>

    <div class="car-specifications">
      <h3>Технические характеристики</h3>
      <ul>
        <li><strong>Мощность:</strong> {{ car.specs.power }}</li>
        <li><strong>Тип двигателя:</strong> {{ car.specs.type }}</li>
        <li><strong>Подвеска:</strong> {{ car.specs.suspension }}</li>
        <li><strong>Вес:</strong> {{ car.specs.weight }}</li>
        <li><strong>Размеры:</strong> {{ car.specs.dimensions }}</li>
      </ul>
    </div>

    <div class="car-description">
      <h3>Описание</h3>
      <p>{{ car.description }}</p>
    </div>
  </section>
</template>

<script>
import MyButton from "@/components/UI/Button.vue";

export default {
  name: "CarDetails",
  components: {
    MyButton
  },
  data() {
    return {
      car: {} // Машина будет загружаться из API
    };
  },
  methods: {
    async fetchCarDetails() {
      const carId = this.$route.params.id;
      try {
        const response = await fetch(`/api/cars/${carId}`);
        const data = await response.json();
        this.car = data;
      } catch (error) {
        console.error("Ошибка при загрузке данных автомобиля", error);
      }
    },
    arrangePurchase() {
      console.log(`Бронирование автомобиля: ${this.car.name}`);
      // Тут можно реализовать логику для бронирования
    }
  },
  mounted() {
    this.fetchCarDetails(); // Загружаем данные автомобиля при загрузке компонента
  }
};
</script>

<style scoped>
.car-details {
  padding: 20px;
  color: white;
  background-color: black;
}

.back-button {
  background-color: transparent;
  border: 2px solid red;
  color: red;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  margin-bottom: 20px;
}

.back-button:hover {
  background-color: red;
  color: white;
}

.car-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 30px;
}

.car-image-container {
  width: 50%;
}

.car-image {
  width: 100%;
  border-radius: 10px;
}

.car-info {
  width: 45%;
  text-align: left;
}

.car-info h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.car-info ul {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.car-info ul li {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.price {
  font-size: 2rem;
  color: red;
}

.car-specifications, .car-description {
  margin-top: 40px;
}

.car-specifications h3, .car-description h3 {
  font-size: 1.8rem;
  margin-bottom: 15px;
}

.car-specifications ul {
  list-style: none;
  padding: 0;
}

.car-specifications ul li {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.car-description p {
  font-size: 1.2rem;
}
</style>
