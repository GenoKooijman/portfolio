<template>
    <header class="sticky top-0 z-50 w-full bg-opacity-90 bg-slate-500">
      <div class="flex justify-between items-center p-4">
        <NuxtLink to="/" class="flex items-center">
          <img src="http://localhost/wordpress/wp-content/uploads/2024/10/geno.jpg" alt="pfp" class="rounded-full w-16 h-16 object-cover" />
        </NuxtLink>
        <div class="hidden md:flex space-x-8">
          <NuxtLink to="/" class="text-xl m-6 pr-24 group relative w-max text-gray-800 hover:text-gray-900 transform transition duration-500">
            <span>Home</span>
            <span class="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-gray-700 group-hover:w-[37%]"></span>
          </NuxtLink>
          <NuxtLink to="/about" class="text-xl m-6 pr-24 group relative w-max text-gray-800 hover:text-gray-900 transform transition duration-500">
            <span>About</span>
            <span class="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-gray-700 group-hover:w-[37%]"></span>
          </NuxtLink>
          <NuxtLink to="/contact" class="text-xl m-6 pr-24 group relative w-max text-gray-800 hover:text-gray-900 transform transition duration-500">
            <span>Contact</span>
            <span class="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-gray-700 group-hover:w-[42%]"></span>
          </NuxtLink>
        </div>
        <button id="toggleMenu" @click="toggleMenu" class="md:hidden flex flex-col space-y-1 transition-transform duration-300">
          <div :class="{'transform rotate-45 translate-y-2': isMenuOpen}" class="w-6 h-0.5 bg-gray-800 transition-transform duration-300"></div>
          <div :class="{'opacity-0': isMenuOpen}" class="w-6 h-0.5 bg-gray-800 transition-opacity duration-300"></div>
          <div :class="{'transform -rotate-45 -translate-y-2': isMenuOpen}" class="w-6 h-0.5 bg-gray-800 transition-transform duration-300"></div>
        </button>
      </div>
      <div id="mobileMenu" :class="{'hidden': !isMenuOpen, 'flex': isMenuOpen}" class="md:hidden flex-col space-y-4 p-4 transition-transform duration-300 transform">
        <NuxtLink to="/" class="text-xl text-white hover:text-gray-900 transform transition duration-500">
          Home
        </NuxtLink>
        <NuxtLink to="/about" class="text-xl text-white hover:text-gray-900 transform transition duration-500">
          About
        </NuxtLink>
        <NuxtLink to="/contact" class="text-xl text-white hover:text-gray-900 transform transition duration-500">
          Contact
        </NuxtLink>
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
      closeMenu(event) {
        if (!this.$el.contains(event.target)) {
          this.isMenuOpen = false;
        }
      },
    },
    mounted() {
      document.addEventListener('click', this.closeMenu);
    },
    beforeDestroy() {
      document.removeEventListener('click', this.closeMenu);
    },
  };
  </script>
  
 
  