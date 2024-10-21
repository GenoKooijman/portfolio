<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'

// Define the interface for a post
interface Post {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf?: {
    pfp?: string; 
  };
}

const posts = ref<Post[]>([]) 
const pfpImage = ref<string | null>(null) 

onMounted(async () => {
  const config = useRuntimeConfig()
  const apiUrl = `${config.public.API_BASE_URL}/wp/v2/pages?slug=home-page`

  try {
    const response = await fetch(apiUrl)
    console.log('API Response:', response) 

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('API Data:', data) 
    posts.value = data

  
    pfpImage.value = 'http://localhost/wordpress/wp-content/uploads/2024/10/geno.jpg'
    console.log('Set Image URL:', pfpImage.value) 
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>

<template>
  <section class="min-h-screen">
    <ul>
      <li v-for="post in posts" :key="post.id" class="mb-8">
        <div class="flex flex-col md:grid md:grid-cols-2 md:grid-rows-2 mt-6">
          <h1 class="text-4xl ml-12 font-bold col-start-1 row-start-1">{{ post.title.rendered }}</h1>
          <div class="text-lg ml-14 col-start-1 row-start-1 pt-14 mr-6 " v-html="post.content.rendered"></div>
          <div v-if="pfpImage">
        <img :src="pfpImage" alt="pfp" class="col-start-2 rounded-lg drop-shadow-2xl mt-8 md:mt-0 ml-12 md:ml-48 h-[350px] md:h-[500px]" />
      </div>
        </div>
      </li>
    </ul>
    
  </section>  
</template>

