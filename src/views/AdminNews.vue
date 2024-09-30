<template>
  <div class="news-page">
    <h1>News</h1>
    <MyButton @click="openCreateModal" label="Добавить новость" >Добавить новость</MyButton>

    <div v-for="news in newsList" :key="news.id" class="news-card">
      <p>{{ formatDate(news.created_at) }}</p>
      <h2>{{ news.name }}</h2>
      <p>{{ news.description }}</p>
      <img :src="getImageUrl(news.image)" alt="news image" />
      <MyButton @click="openEditModal(news)" label="Редактировать">Редактировать</MyButton>
      <MyButton @click="deleteNews(news.id)" label="Удалить" >Удалить</MyButton>
    </div>
<div class="color">
  <Modal v-if="isModalOpen" @close="closeModal" is-visible>
    <h3>{{ isEditing ? 'Редактировать новость' : 'Добавить новость' }}</h3>
    <form @submit.prevent="submitForm" >
      <div>
        <label  for="name">Заголовок новости</label> <br>
        <input type="text" id="name" v-model="newsForm.name" required>
      </div>
      <div>
        <label for="description">Описание</label> <br>
        <textarea id="description" v-model="newsForm.description" required></textarea>
      </div>
      <div>
        <label for="image">Изображение</label>
        <input type="file" id="image" @change="handleFileUpload">
      </div>
      <div class="button-group">
        <Button @click="submitForm" >
          {{ isEditing ? 'Обновить новость' : 'Создать новость' }}
        </Button>
      </div>
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
      newsList: [],
      isModalOpen: false,
      isEditing: false,
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
      this.newsForm = { ...news, image: null };
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

      // Добавление файла изображения, если он выбран
      if (this.newsForm.image) {
        formData.append('image', this.newsForm.image);
      }

      try {
        let response;
        if (this.isEditing) {
          formData.append('_method', 'PATCH');
          response = await apiClient.post(`/news/${this.newsForm.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else {
          response = await apiClient.post('/news', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }
        this.fetchNews();
        this.closeModal();
      } catch (error) {
        console.error('Ошибка при отправке формы:', error);
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
    getImageUrl(imagePath) {
      return imagePath ? `http://127.0.0.1:8000/storage/${imagePath}` : 'placeholder.jpg'; // Путь к изображению или заглушка
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
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

.modal-content form div {
  margin-bottom: 15px;
  width: 100%;
}

.modal-content input[type="text"],
.modal-content textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.color{
  color: white;
}

.modal-content input[type="file"] {
  width: 100%;
  padding: 5px;

}

.modal-content button {
  padding: 10px 20px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: darkred;
}

.modal-content .button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  color: white;
}
</style>
