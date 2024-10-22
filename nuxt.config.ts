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
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Arvo:ital,wght@0,400;0,700;1,400;1,700&family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap'
        }
      ]
    }
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            'chakra': ['"Chakra Petch"', 'sans-serif'],
            'arvo': ['"Arvo"', 'serif'],
          },
        },
      },
    },
  },
});