<template>
  <div>
    <NuxtRouteAnnouncer />
    
  </div>
  <DarkModeToggle />
  <AppHeader />
  <NuxtPage />
  <AppFooter />
</template>

<script setup>
import DarkModeToggle from '~/components/darkModeToggle.vue';
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(4px);
}
</style>
