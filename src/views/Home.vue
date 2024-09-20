<template>
  <div>
    <main>
      <div class="car-promo">
        <div class="car-details">
          <h1>Marussia <span class="highlight">B1</span></h1>
          <p>От 49.999 $</p>
        </div>
        <MyButton class="promo-button">Подробнее</MyButton>
      </div>
    </main>
    <ModelRange  class="model-range"/>
  </div>
</template>

<script>
import ModelRange from "@/components/ModelRange.vue";
import MyButton from "@/components/UI/Button.vue";

export default {
  name: "Home",
  components: {
    ModelRange,
    MyButton
  }
};
</script>

<style scoped>
main {
  text-align: left;
  background-image: url('@/assets/car-image.png');
  background-size: cover;
  background-position: center;
  height: 120vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}


.car-promo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
  height: 100%;
  position: relative;
}

.car-details {
  margin-top: 8%;
  margin-left: 5%;
  color: aliceblue;
}

.car-details h1 {
  font-size: 4vw;
  font-weight: bold;
}

.car-details p {
  font-size: 1.5vw;
  margin-top: 10px;
  color: white;
}

.highlight {
  color: red;
}

.promo-button {
  position: absolute;
  right: 10%;
  bottom: 24%;
  padding: 15px 30px;
  background-color: red;
  color: white;
  border: none;
  font-size: 1.5vw;
  cursor: pointer;
}

.model-range {
  padding: 50px;
  margin: 0px;
}
</style>
