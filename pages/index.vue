<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
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
  const apiUrl = `${config.public.API_BASE_URL}/wp/v2/pages`

  try {
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    posts.value = data

 
    await nextTick()

    
    const namePhotoElement = document.getElementById('namePhoto')
    if (namePhotoElement) {
      namePhotoElement.classList.add('text-red-500', 'font-bold', 'text-xl') 
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>

<template>
  <div>
    <h1>Pages</h1>
    <ul>
      <li class="mb-8" v-for="post in posts" :key="post.id">
        <h2 class="bg-black w-64 h-12 text-white pt-3">{{ post.title.rendered }}</h2>
        <div v-html="post.content.rendered"></div>
      </li>
    </ul>
  </div>  
</template>

