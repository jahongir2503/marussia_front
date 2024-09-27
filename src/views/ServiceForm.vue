<template>
  <div class="service-form-page">
    <h1>Выберите услуги для автомобиля</h1>

    <!-- Уведомления об ошибках или успешных действиях -->
    <div v-if="messages.length" class="messages">
      <p v-for="(message, index) in messages" :key="index" :class="message.type">{{ message.text }}</p>
    </div>

    <form @submit.prevent="submitForm">
      <!-- Список услуг из БД -->
      <label for="service">Услуга</label>
      <select id="service" v-model="form.serviceId" required>
        <option v-for="service in services" :key="service.id" :value="service.id">
          {{ service.name }} ({{ service.price }} ₽)
        </option>
      </select>

      <MyButton class="btn" type="submit">Оставить Заявку</MyButton>
    </form>
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
      form: {
        serviceId: '', // ID выбранной услуги
      },
      services: [], // Список сервисов из БД
      messages: [], // Сообщения об ошибках/успехах
    };
  },
  mounted() {
    this.fetchServices(); // Загружаем список услуг при загрузке страницы
  },
  methods: {
    async fetchServices() {
      try {
        const token = localStorage.getItem('token');
        const response = await apiClient.get('/service', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.services = response.data.data;
      } catch (error) {
        console.error('Ошибка при получении услуг:', error);
        this.addMessage('Не удалось загрузить список услуг.', 'error');
      }
    },
    async submitForm() {
      try {
        const token = localStorage.getItem('token');
        const requestId = localStorage.getItem('request_id'); // Получаем ранее созданный реквест

        const requestData = {
          request_id: requestId,
          service_id: this.form.serviceId,
        };

        const response = await apiClient.post(
            '/service_in_request',
            requestData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );

        this.addMessage('Заявка успешно отправлена!', 'success');
        console.log('Заявка успешно отправлена:', response.data);
      } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        this.addMessage('Ошибка при отправке заявки. Попробуйте позже.', 'error');
      }
    },
    addMessage(text, type) {
      this.messages.push({ text, type });
      setTimeout(() => {
        this.messages.shift();
      }, 5000);
    },
  },
};
</script>

<style scoped>
.service-form-page {
  padding: 70px;
  background-color: black;
  color: white;
  text-align: center;
}

form label {
  margin-top: 10px;
}

form select {
  margin: 10px 0;
  padding: 10px;
  width: 300px;
  font-size: 16px;
}

.btn {
  margin-top: 20px;
  padding: 10px 78px;
}
</style>
