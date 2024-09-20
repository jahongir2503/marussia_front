<template>
  <header>
    <h1 class="logo">MARUSSIA</h1>
    <nav>
      <ul>
        <li><router-link to="/">Модели</router-link></li>
        <li><router-link to="/stock">Автомобили в наличии</router-link></li>
        <li><router-link to="/details">Детали</router-link></li>
        <li><router-link to="/services">Услуги</router-link></li>
        <li><router-link to="/about">О нас</router-link></li>
        <li><router-link to="/login">Войти</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  background-color: black;
  height: 10vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.logo {
  font-family: 'Goblin One', sans-serif;
  font-size: 2.5vw;
  color: red;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 2vw;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-family: 'Fira Sans Extra Condensed', sans-serif;
  font-size: 1.2vw;
}
</style>
