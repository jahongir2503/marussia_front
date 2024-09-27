<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Footer,
    Header,
  },
  data() {

  },

};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: black;
  color: white;
  z-index: 1000;
  padding: 10px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

main {
  flex: 1;
  background-color: black;
}


footer {
  background-color: black;
  color: white;
  text-align: center;
  padding: 10px;
  margin-top: auto;
  position: relative;
  width: 100%;
}
</style>
