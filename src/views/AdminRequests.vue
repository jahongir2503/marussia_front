<template>
  <div class="admin-requests">
    <h1>Управление заявками</h1>
    <div v-if="requests.length">
      <div v-for="request in requests" :key="request.id" class="request-card">
        <h3>{{ request.title }}</h3>
        <p>{{ request.description }}</p>
        <p>{{ request.status }}</p>
        <button @click="editRequest(request.id)">Изменить статус</button>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "@/axios";

export default {
  data() {
    return {
      requests: []
    };
  },
  mounted() {
    this.fetchRequests();
  },
  methods: {
    fetchRequests() {
      apiClient.get("/requests").then(response => {
        this.requests = response.data;
      });
    },
    editRequest(requestId) {
      // Переход на страницу редактирования заявки
      this.$router.push({ name: "EditRequest", params: { id: requestId } });
    }
  }
};
</script>

<style scoped>
.admin-requests {
  padding: 20px;
}

.request-card {
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
}

button {
  margin: 5px;
}
</style>
