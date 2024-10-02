<template>
  <div class="warranty-page">
    <div class="header-section">
      <h1>Гарантийные условия</h1>
      <img src="@/assets/placeholder.png" alt="Car Image" class="header-image"/>
    </div>

    <div class="warranty-section">
      <h2>Общие условия гарантии</h2>
      <p>Наша компания предоставляет гарантию на все автомобили сроком на 3 года или 100 000 километров пробега, в зависимости от того, что наступит раньше.</p>
    </div>

    <div class="warranty-section">
      <h2>Что покрывает гарантия</h2>
      <ul>
        <li>Двигатель и его компоненты</li>
        <li>Трансмиссия</li>
        <li>Подвеска и ходовая часть</li>
        <li>Система рулевого управления</li>
        <li>Тормозная система</li>
      </ul>
    </div>

    <div class="warranty-section">
      <h2>Что не покрывает гарантия</h2>
      <ul>
        <li>Нормальный износ компонентов</li>
        <li>Повреждения, вызванные неправильной эксплуатацией</li>
        <li>Механические повреждения от аварий</li>
      </ul>
    </div>

    <div class="warranty-section">
      <h2>Как воспользоваться гарантией</h2>
      <p>Обратитесь в ближайший сервисный центр с паспортом и документами на автомобиль.</p>
    </div>

    <div class="warranty-contact">
      <h2>Контакты</h2>
      <p>Телефон службы поддержки: +7 999 123-45-67</p>
      <p>Email: support@marussiaavto.com</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WarrantyPage'
}
</script>

<style scoped>
.warranty-page {
  background-color: #000;
  color: white;
  padding: 100px 20px;
  text-align: center;
}

.header-section {
  margin-bottom: 40px;
}

.header-section h1 {
  font-size: 40px;
  color: #E74C3C;
  margin-bottom: 20px;
}

.header-image {
  max-width: 100%;
  height: auto;
}

.warranty-section {
  margin-bottom: 30px;
}

.warranty-section h2 {
  font-size: 28px;
  color: #E74C3C;
  margin-bottom: 15px;
}

.warranty-section p,
.warranty-section ul {
  font-size: 18px;
  line-height: 1.8;
}

.warranty-section ul {
  list-style-type: none;
  padding-left: 0;
}

.warranty-section ul li {
  margin-bottom: 10px;
}

.warranty-contact {
  margin-top: 40px;
}

.warranty-contact h2 {
  font-size: 26px;
  color: #E74C3C;
  margin-bottom: 20px;
}

.warranty-contact p {
  font-size: 18px;
}

</style>
