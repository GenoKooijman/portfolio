<script setup lang="ts">
import { ref, onMounted, } from 'vue'
import { useRuntimeConfig } from '#app'

interface Post {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
}

const posts = ref<Post[]>([]) 

onMounted(async () => {
  const config = useRuntimeConfig()
  const apiUrl = `${config.public.API_BASE_URL}/wp/v2/pages?slug=home-page`

  try {
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    posts.value = data
    
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>

<template>
  <section class="min-h-screen">
    <h1></h1>
    <ul>
      <li class="mb-8" v-for="post in posts" :key="post.id">
        <h1 class="text-3xl">{{ post.title.rendered }}</h1>
        <div class="text-2xl" v-html="post.content.rendered"></div>
      </li>
    </ul>
  </section>  
</template>

