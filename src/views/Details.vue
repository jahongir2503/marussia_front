<template>
  <div class="details-page">
    <h1>Детали</h1>

    <!-- Поиск и фильтрация -->
    <div class="filter-bar">
      <input
          v-model="searchQuery"
          placeholder="Поиск по названию..."
          class="search-input"
      />
      <MyButton @click="filterItems" class="search-button">Поиск</MyButton>

      <div class="filtering">
        <select v-model="selectedCategoryId">
          <option value="">Все категории</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <!-- Кнопки сброса -->
      <div v-if="isSearchApplied || isFilterApplied" class="reset-buttons">
        <MyButton v-if="isSearchApplied" @click="resetSearch" class="reset-button">Сбросить Поиск</MyButton>
        <MyButton v-if="isFilterApplied" @click="resetFilter" class="reset-button">Сбросить Фильтр</MyButton>
      </div>
    </div>

    <!-- Список карточек деталей -->
    <div v-if="filteredDetails.length > 0" class="details-grid">
      <div class="detail-card" v-for="detail in filteredDetails" :key="detail.id">
        <img :src="detail.image || placeholderImage" alt="Detail image" />
        <h3>{{ detail.name }}</h3>
        <p>From {{ detail.price }} ₽</p>
        <MyButton @click="openDetailModal(detail)" class="more-button">Подробнее</MyButton>
      </div>
    </div>
    <p v-else>Детали не найдены.</p>

    <!-- Модальное окно с подробной информацией о детали -->
    <Modal v-if="isDetailModalOpen" @close="closeDetailModal" is-visible>
      <div class="detail-modal-content">
        <h2>{{ selectedDetail.name }}</h2>
        <img :src="selectedDetail.image || placeholderImage" alt="Detail image" />
        <p><strong>Цена:</strong> {{ selectedDetail.price }} ₽</p>
        <p><strong>Категория:</strong> {{ selectedDetail.category.name }}</p>
        <p><strong>Описание:</strong> {{ selectedDetail.description }}</p>
        <MyButton @click="addToCart(selectedDetail)">Добавить в корзину</MyButton>
      </div>
    </Modal>
  </div>
</template>

<script>
import MyButton from "@/components/UI/Button.vue";
import Modal from "@/components/UI/Modal.vue";
import apiClient from "@/axios";

export default {
  components: {
    MyButton,
    Modal
  },
  data() {
    return {
      details: [], // Список деталей
      searchQuery: '', // Поисковый запрос
      selectedCategoryId: '', // Выбранная категория
      filteredDetails: [], // Отфильтрованные детали
      isDetailModalOpen: false, // Статус открытия модального окна
      selectedDetail: null, // Выбранная деталь для модального окна
      placeholderImage: 'https://via.placeholder.com/150', // Placeholder для изображений
      isSearchApplied: false, // Статус, показывающий, был ли применен поиск
      isFilterApplied: false, // Статус, показывающий, была ли применена фильтрация
      categories: [] // Список категорий
    };
  },
  mounted() {
    this.fetchDetails(); // Загружаем детали при монтировании компонента
    this.fetchCategories(); // Загружаем категории для фильтра
  },
  getImageUrl(imagePath) {
    return `http://localhost:8000/storage/${imagePath}`; // Генерация правильного пути к изображениям
  },
  getPlaceholderImage() {
    return require('@/assets/placeholder.png'); // Заглушка, если изображения нет
  },
  methods: {
    // Загрузка деталей с фильтрацией по категории и поиску
    fetchDetails() {
      let queryParams = [];

      // Если в строку поиска введено значение, добавляем его к запросу
      if (this.searchQuery) {
        queryParams.push(`name=${this.searchQuery}`);
        this.isSearchApplied = true;
      } else {
        this.isSearchApplied = false;
      }

      // Если выбрана категория, добавляем параметр категории (categories_id)
      if (this.selectedCategoryId) {
        queryParams.push(`categories_id=${this.selectedCategoryId}`);
        this.isFilterApplied = true;
      } else {
        this.isFilterApplied = false;
      }

      // Выполняем запрос на детали с фильтрацией по категории и поиску
      const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
      apiClient.get(`/spare_part${queryString}`)
          .then(response => {
            this.details = response.data.data;
            this.filteredDetails = this.details;
          })
          .catch(error => {
            console.error('Ошибка при загрузке деталей:', error);
          });
    },

    // Загрузка категорий для фильтра
    fetchCategories() {
      apiClient.get('/categories')
          .then(response => {
            this.categories = response.data;
          })
          .catch(error => {
            console.error('Ошибка при загрузке категорий:', error);
          });
    },

    // Применение фильтрации и поиска
    filterItems() {
      this.fetchDetails(); // Заново загружаем данные с фильтрацией и поиском
    },

    // Сброс поиска
    resetSearch() {
      this.searchQuery = '';
      this.isSearchApplied = false;
      this.fetchDetails(); // Загрузка данных без поиска
    },

    // Сброс фильтрации
    resetFilter() {
      this.selectedCategoryId = '';
      this.isFilterApplied = false;
      this.fetchDetails(); // Загрузка данных без фильтра
    },

    // Открытие модального окна с детальной информацией
    openDetailModal(detail) {
      this.selectedDetail = detail;
      this.isDetailModalOpen = true;
    },

    // Закрытие модального окна
    closeDetailModal() {
      this.isDetailModalOpen = false;
    },

    // Добавление детали в корзину
    addToCart(detail) {
      apiClient.post(`/cart/${detail.id}`, { quantity: 1 })
          .then(() => {
            alert('Товар добавлен в корзину');
          })
          .catch(error => {
            console.error('Ошибка при добавлении в корзину:', error);
          });
    }
  }
};
</script>





<style scoped>
.details-page {
  text-align: center;
  color: white;
  padding: 100px;
}

.filter-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  font-size: 1rem;
  margin-right: 10px;
}

.reset-buttons {
  margin-left: 20px;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.detail-card {
  background-color: white;
  color: black;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.detail-card img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.detail-modal-content {
  text-align: center;
}

.more-button {
  margin-top: 10px;
}
</style>
