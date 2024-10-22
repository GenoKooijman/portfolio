
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
  