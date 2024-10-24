<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const isDarkMode = ref(false);
const isMenuOpen = ref(false);

// Toggle dark mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

// Toggle the burger menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.classList.toggle('overflow-hidden', isMenuOpen.value);
};

// Close the burger menu
const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.classList.remove('overflow-hidden');
};

// Close the menu when clicking outside of it
const handleOutsideClick = (event) => {
  const menu = document.getElementById("burger-menu");
  const button = document.getElementById("burger-button");
  if (isMenuOpen.value && !menu.contains(event.target) && !button.contains(event.target)) {
    closeMenu();
  }
};

onMounted(() => {
  isDarkMode.value = document.documentElement.classList.contains("dark");
  document.addEventListener("click", handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleOutsideClick);
  document.body.classList.remove('overflow-hidden');
});
</script>

<template>
  <header class="sticky top-0 z-50 w-full bg-zinc-800 dark:bg-white transition-colors duration-300">
    <div class="flex justify-between items-center p-4">
      <NuxtLink to="/#section1" class="grid grid-rows-2 text-xl items-center">
        <div class="text-2xl text-white dark:text-black font-arvo">Geno</div>
        <div class="row-start-2 text-2xl text-white dark:text-black font-arvo pl-4">Kooijman</div>
      </NuxtLink>

      <div class="hidden relative md:flex space-x-8">
        <NuxtLink to="/#section1" class="text-xl text-white dark:text-black font-chakra m-6 pr-24 group relative w-max hover:text-slate-300 transition-all duration-500">
          <span>Home</span>
          <span class="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-white dark:bg-zinc-800 group-hover:w-[37%]"></span>
        </NuxtLink>
        <NuxtLink to="/#section2" class="text-xl text-white dark:text-black font-chakra m-6 pr-24 group relative w-max hover:text-slate-300 transition-all duration-500">
          <span>About</span>
          <span class="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-white dark:bg-zinc-800 group-hover:w-[37%]"></span>
        </NuxtLink>
        <NuxtLink to="/" class="text-xl text-white dark:text-black font-chakra m-6 pr-24 group relative w-max hover:text-slate-300 transition-all duration-500">
          <span>Projects</span>
          <span class="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-white dark:bg-zinc-800 group-hover:w-[45%]"></span>
        </NuxtLink>
      </div>

      <button @click="toggleDarkMode" class="hidden md:block p-4 w-12 h-12 rounded-full bg-white dark:bg-black transition-all duration-500 border-2 border-zinc-500 dark:border-zinc-400 shadow-lg"></button>

      <div class="md:hidden flex items-center">
        <button id="burger-button" @click="toggleMenu" class="flex flex-col space-y-1.5 relative">
          <div :class="{ 'transform rotate-45 translate-y-[10px]': isMenuOpen }" class="w-6 h-0.5 bg-white dark:bg-zinc-800 transition-transform duration-300"></div>
          <div :class="{ 'opacity-0': isMenuOpen }" class="w-6 h-0.5 bg-white dark:bg-zinc-800 transition-opacity duration-300"></div>
          <div :class="{ 'transform -rotate-45 -translate-y-[6px]': isMenuOpen }" class="w-6 h-0.5 bg-white dark:bg-zinc-800 transition-transform duration-300"></div>
        </button>
      </div>

      <transition name="dropdown">
        <div
          id="burger-menu"
          v-if="isMenuOpen"
          class="md:hidden absolute bg-zinc-800 dark:bg-white w-full top-full left-0 flex flex-col items-center space-y-4 p-4 transition duration-300"
        >
          <NuxtLink to="/#section1" class="text-xl text-white dark:text-black hover:text-gray-900 transition-all duration-500" @click="closeMenu">Home</NuxtLink>
          <NuxtLink to="/#section2" class="text-xl text-white dark:text-black hover:text-gray-900 transition-all duration-500" @click="closeMenu">About</NuxtLink>
          <NuxtLink to="/#projects" class="text-xl text-white dark:text-black hover:text-gray-900 transition-all duration-500" @click="closeMenu">Projects</NuxtLink>
        </div>
      </transition>
    </div>
  </header>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.5s;
}
.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
}
</style>




