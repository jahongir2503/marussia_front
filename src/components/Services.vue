<template>
  <section class="services">
    <h2>Услуги для владельцев</h2>
    <div class="service-cards">
      <router-link to="/service" class="service-card">
        <img src="@/assets/T.o.png" alt="Регистрация на ТО" />
        <p>Регистрация на Т.О.</p>
      </router-link>
      <router-link to="/roadside-assistance" class="service-card">
        <img src="@/assets/Help.wey.png" alt="Помощь на дороге" />
        <p>Помощь на дороге</p>
      </router-link>
      <router-link to="/warranty" class="service-card">
        <img src="@/assets/candition.png" alt="Гарантийные условия" />
        <p>Гарантийные условия</p>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "Services"
}
</script>

<style scoped>
.services {
  text-align: center;
  background-color: black;
  color: white;
  padding: 50px 0;
}

.services h2 {
  font-size: 3vw;
  margin-bottom: 40px;
}

.service-cards {
  display: flex;
  justify-content: center;
  gap: 3vw;
}

.service-card {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  width: 20vw;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
  text-decoration: none;
}

.service-card img {
  width: 60px;
  height: auto;
  margin-bottom: 15px;
}

.service-card p {
  font-size: 1.2vw;
  color: black;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}
</style>
