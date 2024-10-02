<template>
  <section class="model-range">
    <h2>Модельный Ряд</h2>
    <div class="model-cards">
      <div class="model-card" v-for="car in cars" :key="car.id">
        <img :src="car.image" :alt="car.name" class="model-image">
        <h3>{{ car.name }}</h3>
        <p>От <span class="price">{{ car.price }}</span></p>
      </div>
    </div>
  </section>
</template>

<script>
import MyButton from "@/components/UI/Button.vue";

export default {
  name: "ModelRange",
  components: {
    MyButton
  },
  data() {
    return {
      cars: [
        { id: 1, name: "Marussia B1", price: "39,999 $", image: require('@/assets/cattouchret 1.png') },
        { id: 2, name: "Marussia B2", price: "49,999 $", image: require('@/assets/marussia-b2.png') }
      ]
    };
  }
};
</script>

<style scoped>
.model-range {
  text-align: center;
  color: white;
  margin: 50px 0;
  background: black;
}

.model-range h2 {
  font-size: 3vw;
  margin-bottom: 30px;
}

.model-cards {
  display: flex;
  justify-content: center;
  gap: 3vw;
}

.model-card {
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  width: 20vw;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.model-image {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
}

.model-card h3 {
  font-size: 1.8vw;
  color: black;
}

.model-card p {
  font-size: 1.2vw;
  color: black;
}

.price {
  color: red;
  font-weight: bold;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
</style>
