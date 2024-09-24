<template>
  <section class="service-form">
    <h2>Запись на сервис</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="surname">Фамилия</label>
        <input type="text" id="surname" v-model="form.surname" required />
      </div>

      <div class="form-group">
        <label for="name">Имя</label>
        <input type="text" id="name" v-model="form.name" required />
      </div>

      <div class="form-group">
        <label for="middleName">Отчество</label>
        <input type="text" id="middleName" v-model="form.middleName" required />
      </div>

      <div class="form-group">
        <label for="phone">Телефон</label>
        <input type="tel" id="phone" v-model="form.phone" required />
      </div>

      <div class="form-group">
        <label for="email">Почта</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>

      <div class="form-group">
        <label for="carModel">Модель авто</label>
        <select id="carModel" v-model="form.carModel" required>
          <option disabled value="">Выберите модель автомобиля</option>
          <option v-for="car in carModels" :key="car.id" :value="car.name">
            {{ car.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="service">Услуга</label>
        <select id="service" v-model="form.service" required>
          <option disabled value="">Выберите услугу</option>
          <option v-for="service in services" :key="service.id" :value="service.name">
            {{ service.name }}
          </option>
        </select>
      </div>

      <MyButton type="submit">Оставить Заявку</MyButton>
    </form>
  </section>
</template>

<script>
import MyButton from "@/components/UI/Button.vue";

export default {
  name: "ServiceForm",
  components: {
    MyButton,
  },
  data() {
    return {
      form: {
        surname: "",
        name: "",
        middleName: "",
        phone: "",
        email: "",
        carModel: "",
        service: "",
      },
      carModels: [
        { id: 1, name: "Marussia B1" },
        { id: 2, name: "Marussia B2" }
      ],
      services: [] // Услуги будут загружаться из API
    };
  },
  methods: {
    async fetchServices() {
      try {
        const response = await fetch('/api/services'); // Пример запроса на API
        const data = await response.json();
        this.services = data;
      } catch (error) {
        console.error("Ошибка при получении списка услуг", error);
      }
    },
    submitForm() {
      console.log("Форма отправлена", this.form);
      // Здесь добавляем логику отправки данных на сервер
    }
  },
  mounted() {
    this.fetchServices(); // Загружаем список услуг при монтировании компонента
  }
};
</script>
<style scoped>
.service-form {
  text-align: center;
  color: #ffffff;
  margin-top: 75px;
  background: black;
}

.service-form h2 {
  font-size: 3vw;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-size: 1.2vw;
  display: block;
  margin-bottom: 10px;
}

.form-group input,
.form-group select {
  width: 80%;
  padding: 10px;
  font-size: 1.2vw;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white;
  color: black;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: red;
}

button[type="submit"] {
  width: 50%;
  padding: 15px;
  font-size: 1.5vw;
  border-radius: 5px;
  border: none;
  background-color: red;
  color: white;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: darkred;
}
</style>
