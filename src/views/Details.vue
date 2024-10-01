<template>
  <div class="details-page">
    <div class="header">
      <h1>Детали</h1>
      <div class="search-filter">
        <!-- Поиск по имени -->
        <input type="text" v-model="searchQuery" @input="filterParts" placeholder="Поиск..." />
        <button @click="resetSearch">Сбросить поиск</button>

        <!-- Фильтр по категориям -->
        <select v-model="selectedCategory" @change="filterParts">
          <option value="">Фильтр</option>
          <option v-for="category in categoriesList" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <button @click="resetFilters">Сбросить фильтр</button>
      </div>
    </div>

    <!-- Список деталей -->
    <div class="parts-grid">
      <div v-for="part in filteredPartsList" :key="part.id" class="part-card">
        <img :src="getImageUrl(part.image)" alt="image" class="part-image" />
        <h2>{{ part.name }}</h2>
        <p>Категория: {{ getCategoryName(part.categories_id) }}</p>
        <p>Цена: {{ part.price }} $</p>
        <MyButton @click="viewDetails(part.id)" label="Подробнее">Подробнее</MyButton>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/axios';
import MyButton from '@/components/UI/Button.vue';

export default {
  components: {
    MyButton,
  },
  data() {
    return {
      partsList: [], // Все детали
      filteredPartsList: [], // Отфильтрованные детали
      categoriesList: [], // Список категорий
      searchQuery: '', // Поисковый запрос
      selectedCategory: '', // Выбранная категория для фильтрации
    };
  },
  created() {
    this.fetchParts();
    this.fetchCategories(); // Загружаем категории
  },
  methods: {
    async fetchParts() {
      try {
        const response = await apiClient.get('/spare_part');
        this.partsList = response.data.data;
        this.filteredPartsList = this.partsList; // Изначально все детали
      } catch (error) {
        console.error('Ошибка при загрузке деталей:', error);
      }
    },
    async fetchCategories() {
      try {
        const response = await apiClient.get('/spare_parts_categories');
        this.categoriesList = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      }
    },
    filterParts() {
      const searchLower = this.searchQuery.toLowerCase();
      this.filteredPartsList = this.partsList.filter(part => {
        const matchesName = part.name.toLowerCase().includes(searchLower);
        const matchesCategory =
            this.selectedCategory === '' || part.categories_id === parseInt(this.selectedCategory);
        return matchesName && matchesCategory;
      });
    },
    resetSearch() {
      this.searchQuery = '';
      this.filterParts();
    },
    resetFilters() {
      this.selectedCategory = '';
      this.filterParts();
    },
    getCategoryName(id) {
      const category = this.categoriesList.find(cat => cat.id === id);
      return category ? category.name : 'Неизвестная категория';
    },
    getImageUrl(imagePath) {
      return imagePath ? `http://127.0.0.1:8000/storage/${imagePath}` : 'placeholder.jpg';
    },
    viewDetails(partId) {
      this.$router.push(`/part-details/${partId}`);
    }
  }
};
</script>

<style scoped>
.details-page {
  padding: 100px;
  background-color: black;
  color: white;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-filter {
  display: flex;
  align-items: center;
}

.search-filter input,
.search-filter select {
  padding: 8px;
  margin-right: 10px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 5px;
}

button {
  padding: 8px 12px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.parts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.part-card {
  background-color: white;
  color: black;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.part-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  margin-bottom: 10px;
}

h2 {
  font-size: 1.2rem;
  margin: 10px 0;
}

p {
  margin: 5px 0;
}

.MyButton {
  margin-top: 10px;
}
</style>
