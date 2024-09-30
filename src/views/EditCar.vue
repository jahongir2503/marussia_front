<template>
  <div>
    <h1>Редактировать Машину</h1>
    <form @submit.prevent="updateCar">
      <input v-model="car.name" placeholder="Название" />
      <input v-model="car.price" placeholder="Цена" type="number" />
      <input v-model="car.description" placeholder="Описание" />
      <input v-model="car.engine_capacity" placeholder="Объем двигателя" />
      <input v-model="car.horsepower" placeholder="Мощность" />
      <input v-model="car.transmission" placeholder="Трансмиссия" />
      <input type="file" @change="handleFileUpload" />
      <button type="submit">Сохранить</button>
    </form>
  </div>
</template>

<script>
import apiClient from '@/axios';

export default {
  data() {
    return {
      car: {
        name: '',
        price: '',
        description: '',
        engine_capacity: '',
        horsepower: '',
        transmission: '',
        image: null,
      },
    };
  },
  created() {
    this.fetchCarData();
  },
  methods: {
    async fetchCarData() {
      const carId = this.$route.params.id;
      try {
        const response = await apiClient.get(`/cars/${carId}`);
        this.car = response.data;
      } catch (error) {
        console.error('Ошибка при получении данных машины:', error);
      }
    },
    async updateCar() {
      try {
        const formData = new FormData();
        for (let key in this.car) {
          formData.append(key, this.car[key]);
        }
        formData.append('_method', 'PATCH');
        const response = await apiClient.post(`/cars/${this.$route.params.id}`, formData);
        this.$router.push('/admin/cars');
      } catch (error) {
        console.error('Ошибка при обновлении машины:', error);
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.car.image = file;
    },
  },
};
</script>
