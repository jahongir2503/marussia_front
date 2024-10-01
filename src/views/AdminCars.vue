<template>
  <div class="cars-page">
    <h1>Cars Management</h1>
    <!-- Кнопка для добавления новой машины -->
    <MyButton @click="openCreateModal">Add Car</MyButton>

    <!-- Список машин -->
    <div v-for="car in carList" :key="car.id" class="car-card">
      <h2>{{ car.name }}</h2>
      <p>{{ car.description }}</p>
      <p><strong>Specifications:</strong> {{ car.specifications }}</p>
      <p><strong>Engine Capacity:</strong> {{ car.engine_capacity }}</p>
      <p><strong>Horsepower:</strong> {{ car.horsepower }}</p>
      <p><strong>Transmission:</strong> {{ car.transmission }}</p>
      <img :src="carImagePath(car.image)" alt="Car Image"/>
      <MyButton @click="openEditModal(car)">Edit</MyButton>
      <MyButton @click="deleteCar(car.id)" color="red">Delete</MyButton>
      <!-- Кнопка для добавления машины в наличие -->
      <MyButton @click="openAddStockModal(car)">Add to Stock</MyButton>
    </div>
    <div class="color">
      <!-- Модальное окно для добавления и редактирования машин -->
      <Modal v-if="isModalOpen" @close="closeModal" :is-visible="isModalOpen">
        <h3>{{ isEditing ? 'Edit Car' : 'Add Car' }}</h3>
        <form @submit.prevent="submitForm">
          <div>
            <label for="name">Car Name</label><br>
            <input type="text" id="name" v-model="carForm.name" required/>
          </div>
          <div>
            <label for="description">Description</label><br>
            <textarea id="description" v-model="carForm.description" required></textarea>
          </div>
          <div>
            <label for="specifications">Specifications</label><br>
            <input type="text" id="specifications" v-model="carForm.specifications"/>
          </div>
          <div>
            <label for="engine_capacity">Engine Capacity</label><br>
            <input type="number" id="engine_capacity" v-model="carForm.engine_capacity"/>
          </div>
          <div>
            <label for="horsepower">Horsepower</label><br>
            <input type="number" id="horsepower" v-model="carForm.horsepower"/>
          </div>
          <div>
            <label for="transmission">Transmission</label><br>
            <input type="text" id="transmission" v-model="carForm.transmission"/>
          </div>
          <div>
            <label for="image">Image</label><br>
            <input type="file" id="image" @change="handleFileUpload"/>
          </div>
          <MyButton @click="submitForm">
            {{ isEditing ? 'Обновить данные' : 'Добавить машину' }}
          </MyButton>
          <MyButton @click="closeModal" color="gray">Cancel</MyButton>
        </form>
      </Modal>

      <!-- Модальное окно для добавления машины в наличие -->
      <Modal v-if="isStockModalOpen" @close="closeStockModal" :is-visible="isStockModalOpen">
        <h3>Add {{ selectedCar.name }} to Stock</h3>
        <form @submit.prevent="submitStockForm">
          <div>
            <label for="price">Price</label> <br>
            <input type="number" id="price" v-model="stockForm.price" required/>
          </div>
          <br>
          <MyButton type="submit">Add to Stock</MyButton>
          <MyButton @click="closeStockModal" color="gray">Cancel</MyButton>
        </form>
      </Modal>
    </div>





  </div>
</template>

<script>
import apiClient from '@/axios';
import Modal from '@/components/UI/Modal.vue';
import MyButton from '@/components/UI/Button.vue';

export default {
  components: {
    Modal,
    MyButton
  },
  data() {
    return {
      carList: [],
      isModalOpen: false,
      isStockModalOpen: false,
      isEditing: false,
      carForm: {
        id: null,
        name: '',
        description: '',
        engine_capacity: '',
        horsepower: '',
        transmission: '',
        specifications: '',
        image: null,
      },
      stockForm: {
        price: ''
      },
      selectedCar: null
    };
  },
  created() {
    this.fetchCars();
  },
  methods: {
    async fetchCars() {
      try {
        const response = await apiClient.get('/cars');
        this.carList = response.data.data;
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    },
    openCreateModal() {
      this.isEditing = false;
      this.carForm = {
        id: null,
        name: '',
        description: '',
        engine_capacity: '',
        horsepower: '',
        transmission: '',
        specifications: '',
        image: null
      };
      this.isModalOpen = true;
    },
    openEditModal(car) {
      this.isEditing = true;
      this.carForm = {...car, image: null};
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    closeStockModal() {
      this.isStockModalOpen = false;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.carForm.image = file;
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('name', this.carForm.name);
      formData.append('description', this.carForm.description);
      formData.append('engine_capacity', this.carForm.engine_capacity);
      formData.append('horsepower', this.carForm.horsepower);
      formData.append('transmission', this.carForm.transmission);
      formData.append('specifications', this.carForm.specifications);

      if (this.carForm.image) {
        formData.append('image', this.carForm.image);
      }

      try {
        let response;
        if (this.isEditing) {
          formData.append('_method', 'PATCH');
          response = await apiClient.post(`/cars/${this.carForm.id}`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
          });
        } else {
          response = await apiClient.post('/cars', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
          });
        }
        this.fetchCars();
        this.closeModal();
      } catch (error) {
        console.error('Error submitting car form:', error);
      }
    },
    async deleteCar(id) {
      try {
        await apiClient.delete(`/cars/${id}`);
        this.fetchCars();
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    },
    openAddStockModal(car) {
      this.selectedCar = car;
      this.isStockModalOpen = true;
    },
    carImagePath(imagePath) {
      return imagePath ? `http://127.0.0.1:8000/storage/${imagePath}` : 'placeholder.jpg';
    }
  }
};
</script>

<style scoped>
.cars-page {
  padding: 100px;
}

.car-card {
  margin: 20px 0;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
}

.car-card img {
  width: 100%;
  height: auto;
  margin-top: 15px;
}

.color{
  color: white;
}
</style>
