<script setup>
import { ref, onMounted } from "vue";

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

onMounted(() => {
  isDarkMode.value = document.documentElement.classList.contains("dark");
});
</script>

<template>
  <header class="sticky top-0 z-50 w-full transition-colors duration-300 bg-zinc-800 dark:bg-white">
    <div class="flex justify-between items-center p-4">
      <NuxtLink to="/#section1" class="grid grid-rows-2 text-xl items-center">
        <div class="text-2xl text-white dark:text-black  font-arvo">Geno</div>
        <div class="row-start-2 text-2xl text-white dark:text-black font-arvo pl-4">
          Kooijman
        </div>
      </NuxtLink>

      <div class="hidden relative md:flex space-x-8">
        <NuxtLink
          to="/#section1"
          class="text-xl text-white dark:text-black font-chakra m-6 pr-24 group relative w-max hover:text-slate-300 transition-all duration-500"
        >
          <span>Home</span>
          <span
            class="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-white dark:bg-zinc-800 group-hover:w-[37%]"
          ></span>
        </NuxtLink>
        <NuxtLink
          to="/#section2"
          class="text-xl text-white dark:text-black font-chakra m-6 pr-24 group relative w-max hover:text-slate-300 transition-all duration-500"
        >
          <span>About</span>
          <span
            class="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-white dark:bg-zinc-800 group-hover:w-[37%]"
          ></span>
        </NuxtLink>
        <NuxtLink
          to="/"
          class="text-xl text-white dark:text-black font-chakra m-6 pr-24 group relative w-max hover:text-slate-300 transition-all duration-500"
        >
          <span>Projects</span>
          <span
            class="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-white dark:bg-zinc-800 group-hover:w-[45%]"
          ></span>
        </NuxtLink>
      </div>

      <button
        @click="toggleDarkMode"
        class=" hidden md:block p-4 w-12 h-12 rounded-full   bg-white dark:bg-black transition-all duration-500 border-2 border-zinc-500 dark:border-zinc-400 shadow-lg"
      >
      </button>

      <div class="md:hidden flex items-center">
        <button @click="toggleMenu" class="flex flex-col space-y-1.5 relative">
          <div
            :class="{ 'transform rotate-45 translate-y-[10px]': isMenuOpen }"
            class="w-6 h-0.5 bg-white dark:bg-zinc-800 transition-transform duration-300"
          ></div>

          <div
            :class="{ 'opacity-0': isMenuOpen }"
            class="w-6 h-0.5 bg-white dark:bg-zinc-800 transition-opacity duration-300"
          ></div>

          <div
            :class="{ 'transform -rotate-45 -translate-y-[6px]': isMenuOpen }"
            class="w-6 h-0.5 bg-white dark:bg-zinc-800 transition-transform duration-300"
          ></div>
        </button>
      </div>

      <transition name="dropdown">
        <div
          v-if="isMenuOpen"
          class="md:hidden absolute bg-zinc-800 dark:bg-white w-full top-full left-0 flex flex-col items-center space-y-4 p-4 transition duration-300"
        >
          <NuxtLink
            to="/"
            class="text-xl text-white dark:text-black hover:text-gray-900 transition-all duration-500"
            @click="closeMenu"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="text-xl text-white dark:text-black hover:text-gray-900 transition-all duration-500"
            @click="closeMenu"
          >
            About
          </NuxtLink>
          <NuxtLink
            to="/"
            class=" text-xl text-white dark:text-black hover:text-gray-900 transition-all duration-500"
            @click="closeMenu"
          >
            Contact
          </NuxtLink>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    handleOutsideClick(event) {
      if (!this.$el.contains(event.target)) {
        this.isMenuOpen = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
};
</script>

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
