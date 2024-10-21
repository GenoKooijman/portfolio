// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_URL || 'http://localhost/wordpress/wp-json',
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  })