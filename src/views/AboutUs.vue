<template>
  <section class="about-us">
    <h2>About Us</h2>
    <p>
      Our company was established in 2007 with the aim of providing integrated solutions for owners and enthusiasts of Marussia cars, including purchase, servicing, and acquisition of spare parts.
    </p>
    <p>
      We specialize in providing high-quality services for Marussia vehicles, offering customers a wide range of services, from technical maintenance and repair to purchasing original spare parts.
    </p>
    <p>
      Our goal is to ensure Marussia car owners have a flawless ownership and servicing experience by delivering innovative services and professional maintenance that meet the highest quality standards and customer expectations.
    </p>

    <div class="contacts">
      <h3>Contacts</h3>
      <p><strong>Phone number</strong></p>
      <p>+ 7 998 827 523 43 89</p>

      <p><strong>Email</strong></p>
      <p>MatussiaAvto@gmail.com</p>

      <h3>Social Networks</h3>
      <ul>
        <li>
          <a href="https://inst.com/russian_supercar" target="_blank">
            <img src="#" alt="Instagram" />
            https://inst.com/russian_supercar
          </a>
        </li>
        <li>
          <a href="https://fb.com/russian_supercar" target="_blank">
            <img src="#" alt="Facebook" />
            https://fb.com/russian_supercar
          </a>
        </li>
        <li>
          <a href="https://vk.com/russian_supercar" target="_blank">
            <img src="#" alt="VK" />
            https://vk.com/russian_supercar
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "AboutUs",
};
</script>

<style scoped>
.about-us {
  text-align: center;
  color: white;
  margin: 75px auto;
  max-width: 100%;
  background-color: black;
}

.about-us h2 {
  font-size: 3vw;
  margin-bottom: 30px;
}

.about-us p {
  font-size: 1.2vw;
  margin-bottom: 20px;
}

.contacts {
  margin-top: 40px;
}

.contacts h3 {
  font-size: 2vw;
  margin-bottom: 15px;
}

.contacts p {
  font-size: 1.2vw;
}

.contacts ul {
  list-style: none;
  padding: 0;
}

.contacts ul li {
  margin-bottom: 10px;
}

.contacts ul li a {
  color: white;
  text-decoration: none;
  font-size: 1.2vw;
}

.contacts ul li a img {
  width: 20px;
  margin-right: 10px;
}
</style>
