<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "MyButton"
};
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  font-size: 1.2vw;
  border-radius: 5px;
  border: 2px solid red;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.btn:hover {
  background-color: red;
  color: white;
}

.btn {
  color: red;
  background-color: white;
}
</style>
