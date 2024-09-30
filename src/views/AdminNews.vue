<template>
  <div class="news-page">
    <h1>Новости</h1>
    <MyButton @click="openCreateModal">Добавить новость</MyButton>

    <!-- Список новостей -->
    <div class="news-card" v-for="news in newsList" :key="news.id">
      <p>{{ formatDate(news.created_at) }}</p>
      <h2>{{ news.name }}</h2>
      <p>{{ news.description }}</p>
      <img v-if="news.image" :src="getImageUrl(news.image)" alt="News image" />
      <MyButton @click="openEditModal(news)">Изменить</MyButton>
      <MyButton @click="deleteNews(news.id)">Удалить</MyButton>
    </div>

    <!-- Модальное окно для добавления и редактирования новостей -->
    <Modal v-if="isModalOpen" @close="closeModal" is-visible>
      <div class="modal-header">
        <h3>{{ isEditing ? 'Редактировать новость' : 'Добавить новость' }}</h3>
      </div>
      <div class="modal-body">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Заголовок</label>
            <input type="text" id="name" v-model="newsForm.name" required />
          </div>
          <div class="form-group">
            <label for="description">Описание</label>
            <textarea id="description" v-model="newsForm.description" required></textarea>
          </div>
          <div class="form-group">
            <label for="image">Изображение</label>
            <input type="file" id="image" @change="handleFileUpload" />
          </div>
          <div class="form-actions">
            <MyButton type="submit">{{ isEditing ? 'Обновить новость' : 'Создать новость' }}</MyButton>
            <MyButton @click="closeModal">Отменить</MyButton>
          </div>
        </form>
      </div>
    </Modal>
  </div>
</template>

<script>
import apiClient from '@/axios';
import MyButton from '@/components/UI/Button.vue'; // Кастомная кнопка
import Modal from '@/components/UI/Modal.vue'; // Кастомное модальное окно

export default {
  components: {
    MyButton,
    Modal,
  },
  data() {
    return {
      newsList: [], // Список новостей
      isModalOpen: false, // Открыто ли модальное окно
      isEditing: false, // Режим редактирования
      newsForm: {
        id: null,
        name: '',
        description: '',
        image: null,
      },
    };
  },
  created() {
    this.fetchNews();
  },
  methods: {
    async fetchNews() {
      try {
        const response = await apiClient.get('/news');
        this.newsList = response.data.data;
      } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
      }
    },
    openCreateModal() {
      this.isEditing = false;
      this.newsForm = { id: null, name: '', description: '', image: null };
      this.isModalOpen = true;
    },
    openEditModal(news) {
      this.isEditing = true;
      this.newsForm = { ...news, image: null }; // Заполняем форму данными новости
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.newsForm.image = file;
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('name', this.newsForm.name);
      formData.append('description', this.newsForm.description);
      if (this.newsForm.image) {
        formData.append('image', this.newsForm.image);
      }

      try {
        if (this.isEditing) {
          formData.append('_method', 'PATCH');
          await apiClient.post(`/news/${this.newsForm.id}`, formData);
        } else {
          await apiClient.post('/news', formData);
        }
        this.fetchNews();
        this.closeModal();
      } catch (error) {
        console.error('Ошибка при сохранении новости:', error);
      }
    },
    async deleteNews(id) {
      try {
        await apiClient.delete(`/news/${id}`);
        this.fetchNews();
      } catch (error) {
        console.error('Ошибка при удалении новости:', error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
    getImageUrl(imagePath) {
      return `http://127.0.0.1:8000/${imagePath}`; // Используем базовый URL для картинок
    },
  },
};
</script>

<style scoped>
.news-page {
  padding: 100px;
}

.news-card {
  margin: 20px 0;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

img {
  max-width: 100%;
  margin-top: 10px;
}

.modal-header {
  padding-bottom: 10px;
}

.modal-body {
  padding-top: 10px;
}
</style>
