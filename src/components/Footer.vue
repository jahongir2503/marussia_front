<template>
  <footer class="footer">
    <div class="footer-left">
      <h2 class="logo">MARUSSIA</h2>
      <p>Контактная информация</p>
      <p>+7 998 827 523 43 89</p>
      <p><a href="mailto:MatussiaAvto@gmail.com">MatussiaAvto@gmail.com</a></p>
    </div>
    <div class="footer-right">
      <p>Центр поддержки</p>
      <p>8 889 889-89-72</p>
      <p>Наши социальные сети</p>
      <div class="social-icons">
        <a href="#"><img src="@/assets/car-image.png" alt="Instagram"></a>
        <a href="#"><img src="@/assets/car-image.png" alt="Facebook"></a>
        <a href="#"><img src="@/assets/car-image.png" alt="VK"></a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  padding: 40px 5%;
  background-color: black;
  color: white;
}

.footer-left {
  padding: 20px;
  text-decoration: none;
  color: white;
}

.footer-left a {
  color: white;
  text-decoration: none;
}

.footer-left a:hover {
  color: #ccc;
}

.logo {
  color: red;
  font-size: 2vw;
  font-family: 'Goblin One', sans-serif;
}

.footer-right {
  text-align: right;
}

.footer-right p {
  margin: 0 0 10px;
}

.social-icons {
  display: flex;
  gap: 20px;
}

.social-icons a img {
  width: 40px;
  height: auto;
}
</style>
