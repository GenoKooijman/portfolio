<template>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

onMounted(() => {
  isDarkMode.value = document.documentElement.classList.contains('dark');
});
</script>

<style scoped>
button {
  background-color: var(--button-bg);
  color: var(--button-text);
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.dark {
  background-color: #333;
  color: #fff;
}
</style>
  