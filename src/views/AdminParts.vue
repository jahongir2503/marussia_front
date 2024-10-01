<template>
  <div class="parts-page">
    <h1>Запчасти</h1>
    <MyButton @click="openCreateModal" label="Добавить Запчасть">Добавить Запчасть</MyButton>

    <div v-for="part in partsList" :key="part.id" class="part-card">
      <h2>{{ part.name }}</h2>
      <p>Описание: {{ part.description }}</p>
      <p>Цена: {{ part.price }}</p>
      <p>Категория Товара: {{ getCategoryName(part.categories_id) }}</p>
      <img :src="getImageUrl(part.image)" alt="image" width="250" height="150"/>
      <MyButton @click="openEditModal(part)" label="Редактировать">Редактировать</MyButton>
      <MyButton @click="deletePart(part.id)" label="Удалить">Удалить</MyButton>
    </div>
<div class="color" style="color: white">
  <!-- Модальное окно для создания и редактирования запчастей -->
  <Modal v-if="isModalOpen" @close="closeModal" is-visible>
    <h3>{{ isEditing ? 'Редактировать Запчасть' : 'Добавить Запчасть' }}</h3>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Название Запчасти</label><br>
        <input type="text" id="name" v-model="partForm.name" required/>
      </div>
      <div>
        <label for="description">Описание</label><br>
        <textarea id="description" v-model="partForm.description" required></textarea>
      </div>
      <div>
        <label for="price">Цена</label><br>
        <input type="number" id="price" v-model="partForm.price" required/>
      </div>
      <div>
        <label for="categories_id">Категория</label><br>
        <select v-model="partForm.categories_id" required>
          <option disabled value="">Выберите категорию</option>
          <option v-for="category in categoriesList" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="image">Изображение</label><br>
        <input type="file" id="image" @change="handleFileUpload">
      </div>
      <MyButton :label="isEditing ? 'Обновить Запчасть' : 'Создать Запчасть'" type="submit">Отправить</MyButton>
      <MyButton @click="closeModal" label="Отмена">Отмена</MyButton>
    </form>
  </Modal>
</div>

  </div>
</template>

<script>
import apiClient from '@/axios';
import MyButton from '@/components/UI/Button.vue';
import Modal from '@/components/UI/Modal.vue';

export default {
  components: {
    MyButton,
    Modal
  },
  data() {
    return {
      partsList: [],
      categoriesList: [], // Для хранения категорий
      isModalOpen: false,
      isEditing: false,
      partForm: {
        id: null,
        name: '',
        description: '',
        price: '',
        categories_id: '', // Для выбора категории
        image: null,
      },
    };
  },
  created() {
    this.fetchParts();
    this.fetchCategories(); // Загружаем категории при создании компонента
  },
  methods: {
    async fetchParts() {
      try {
        const response = await apiClient.get('/spare_part');
        this.partsList = response.data.data;
      } catch (error) {
        console.error('Ошибка при загрузке запчастей:', error);
      }
    },
    async fetchCategories() {
      try {
        const response = await apiClient.get('/spare_parts_categories'); // Загружаем категории
        this.categoriesList = response.data; // Прямо присваиваем результат
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      }
    },
    getCategoryName(id) {
      if (!this.categoriesList.length) return 'Категория не найдена'; // Если категории ещё не загружены
      const category = this.categoriesList.find(cat => cat.id === id);
      return category ? category.name : 'Категория не найдена';
    },
    openCreateModal() {
      this.isEditing = false;
      this.partForm = {
        id: null,
        name: '',
        description: '',
        price: '',
        categories_id: '',
        image: null,
      };
      this.isModalOpen = true;
    },
    openEditModal(part) {
      this.isEditing = true;
      this.partForm = { ...part, image: null }; // Очищаем поле для файла
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.partForm.image = file;
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('name', this.partForm.name);
      formData.append('description', this.partForm.description);
      formData.append('price', this.partForm.price);
      formData.append('categories_id', this.partForm.categories_id); // Отправляем ID категории
      if (this.partForm.image) {
        formData.append('image', this.partForm.image);
      }

      try {
        if (this.isEditing) {
          formData.append('_method', 'PATCH');
          await apiClient.post(`/spare_part/${this.partForm.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else {
          await apiClient.post('/spare_part', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }
        this.fetchParts();
        this.closeModal();
      } catch (error) {
        console.error('Ошибка при отправке формы:', error);
      }
    },
    async deletePart(id) {
      try {
        await apiClient.delete(`/spare_part/${id}`);
        this.fetchParts();
      } catch (error) {
        console.error('Ошибка при удалении запчасти:', error);
      }
    },
    getImageUrl(imagePath) {
      return imagePath ? `http://127.0.0.1:8000/storage/${imagePath}` : 'placeholder.jpg';
    },
  }
};
</script>


<style scoped>
.parts-page {
  padding: 100px;
}
.part-card {
  margin: 20px 0;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
}
.part-card img {
  width: 100%;
  height: auto;
  margin-top: 15px;
}
</style>
