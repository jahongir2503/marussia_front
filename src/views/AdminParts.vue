<template>
  <div class="parts-page">
    <h1>Запчасти</h1>
    <MyButton @click="openCreateModal" label="Добавить Запчасть">Добавить Запчасть</MyButton>

    <div v-for="part in partsList" :key="part.id" class="part-card">
      <h2>{{ part.name }}</h2>
      <p>Описание: {{ part.description }}</p>
      <p>Цена: {{ part.price }}</p>
      <p>Категория ID: {{ part.catigories_id }}</p>
      <img :src="getImageUrl(part.image)" alt="part image" />
      <MyButton @click="openEditModal(part)" label="Редактировать">Редактировать</MyButton>
      <MyButton @click="deletePart(part.id)" label="Удалить">Удалить</MyButton>
    </div>

    <!-- Модальное окно для создания и редактирования запчастей -->
    <Modal v-if="isModalOpen" @close="closeModal" is-visible>
        <h3>{{ isEditing ? 'Редактировать Запчасть' : 'Добавить Запчасть' }}</h3>

        <form @submit.prevent="submitForm">
          <div>
            <label for="name">Название Запчасти</label>
            <input type="text" id="name" v-model="partForm.name" required />
          </div>
          <div>
            <label for="description">Описание</label>
            <textarea id="description" v-model="partForm.description" required></textarea>
          </div>
          <div>
            <label for="price">Цена</label>
            <input type="number" id="price" v-model="partForm.price" required />
          </div>
          <div>
            <label for="catigories_id">ID Категории</label>
            <input type="number" id="catigories_id" v-model="partForm.catigories_id" required />
          </div>
          <div>
            <label for="image">Изображение</label>
            <input type="file" id="image" @change="handleFileUpload" />
          </div>
          <MyButton :label="isEditing ? 'Обновить Запчасть' : 'Создать Запчасть'" type="submit" />
          <MyButton @click="closeModal" label="Отмена" />
        </form>
    </Modal>
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
      isModalOpen: false,
      isEditing: false,
      partForm: {
        id: null,
        name: '',
        description: '',
        price: '',
        catigories_id: '',
        image: null,
      },
    };
  },
  created() {
    this.fetchParts();
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
    openCreateModal() {
      this.isEditing = false;
      this.partForm = { id: null, name: '', description: '', price: '', catigories_id: '', image: null };
      this.isModalOpen = true;
    },
    openEditModal(part) {
      this.isEditing = true;
      this.partForm = { ...part, image: null };
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
      formData.append('catigories_id', this.partForm.catigories_id);
      if (this.partForm.image) {
        formData.append('image', this.partForm.image);
      }

      try {
        if (this.isEditing) {
          formData.append('_method', 'PATCH');
          await apiClient.post(`/spare_part/${this.partForm.id}`, formData);
        } else {
          await apiClient.post('/spare_part', formData);
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
      return imagePath ? `http://127.0.0.1:8000/${imagePath}` : 'placeholder.jpg'; // Путь к изображению или заглушка
    }
  },
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
</style>
