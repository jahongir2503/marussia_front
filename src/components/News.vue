<template>
  <div class="news">
    <h1>Новости</h1>
    <div class="news-grid">
      <div class="news-item" v-for="item in news" :key="item.id">
        <!-- Проверка наличия изображения, если нет, показываем заглушку -->
        <img
            :src="item.image ? getImageUrl(item.image) : getPlaceholderImage()"
            alt="news image"
            class="news-image"
        />
        <div class="news-date">
          {{ formatDate(item.created_at) }}
        </div>
        <h2>{{ item.name }}</h2>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/axios'; // Подключаем axios для запросов

export default {
  data() {
    return {
      news: [] // Массив для хранения новостей
    };
  },
  created() {
    this.fetchNews(); // Загружаем новости при инициализации компонента
  },
  methods: {
    // Метод для загрузки новостей с сервера
    async fetchNews() {
      try {
        const response = await apiClient.get('/news'); // Делаем запрос на сервер
        this.news = response.data.data; // Сохраняем полученные данные в массив
      } catch (error) {
        console.error('Ошибка при получении новостей:', error);
      }
    },
    // Метод для форматирования даты
    formatDate(date) {
      const options = {year: 'numeric', month: 'long', day: 'numeric'};
      return new Date(date).toLocaleDateString('en-GB', options);
    },
    // Получаем ссылку на изображение с сервера
    getImageUrl(imagePath) {
      return `http://localhost:8000/storage/${imagePath}`; // Путь к изображениям на сервере
    },
    // Получаем заглушку, если нет изображения
    getPlaceholderImage() {
      return require('@/assets/placeholder.png'); // Путь к заглушке
    }
  }
};
</script>

<style scoped>
.news {
  padding: 60px 0;
  text-align: center;
  color: white;
  background-color: black;
}

.news-grid {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.news-item {
  width: 300px;
  padding: 20px;
}

.news-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
}

.news-date {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}
</style>
