<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRuntimeConfig } from "#app";

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
    about?: string;
    projectsarray?: string | null;
    projectsarray2?: string | null;
    projectsarray3?: string | null;
    projectsarray4?: string | null;
  };
}

const posts = ref<Post[]>([]);
const pfpImage = ref<string | null>(null);
const customFieldAbout = ref<string | null>(null);
const projects = ref<{ image: string | null; title: string }[]>([]);

onMounted(async () => {
  const config = useRuntimeConfig();
  const apiUrl = `${config.public.API_BASE_URL}/wp/v2/pages?slug=home-page`;

  try {
    const response = await fetch(apiUrl);
    console.log("API Response:", response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Data:", data);
    posts.value = data;

    customFieldAbout.value = data[0].acf?.about;

    console.log(data);

    pfpImage.value =
      "http://localhost/wordpress/wp-content/uploads/2024/10/geno.jpg";
    console.log("Set Image URL:", pfpImage.value);

    projects.value = [
      {
        image: "http://localhost/wordpress/wp-content/uploads/2024/10/geno.jpg",
        title: "Project 1",
      },
      {
        image: "http://localhost/wordpress/wp-content/uploads/2024/10/geno.jpg",
        title: "Project 2",
      },
      {
        image:
          "http://localhost/wordpress/wp-content/uploads/2024/10/thumbnail_560ee8b7-60ff-4d9a-88a4-d4a5c37b1066.jpg",
        title: "Project 3",
      },
      {
        image:
          "http://localhost/wordpress/wp-content/uploads/2024/10/annexbios.jpg",
        title: "Project 4",
      },
    ];

    console.log("Projects:", projects.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<template>
  <section
    id="section1"
    class="min-h-screen pt-24 transition-colors duration-300 bg-zinc-800 dark:bg-white text-white"
  >
    <ul>
      <li v-for="post in posts" :key="post.id" class="mb-8">
        <div class="flex flex-col md:grid md:grid-cols-2 mt-6">
          <div class="col-start-1">
            <h1
              class="text-2xl md:text-9xl text-white dark:text-black ml-12 font-bold font-arvo"
            >
              {{ post.title.rendered }}
            </h1>
            <div
              class="text-2xl md:text-9xl font-bold text-white dark:text-black font-chakra ml-24 pt-8"
              v-html="post.content.rendered"
            ></div>
          </div>
          <div
            v-if="pfpImage"
            class="col-start-2 flex items-start ml-12 md:ml-48"
          >
            <img
              :src="pfpImage"
              alt="pfp"
              class="rounded-lg drop-shadow-2xl h-[350px] md:h-[500px]"
            />
          </div>
        </div>
      </li>
    </ul>
  </section>

  <section
    id="section2"
    class="min-h-screen pt-24 pb-14 scroll-mt-28 transition-colors duration-300 bg-zinc-800 dark:bg-white text-white"
  >
    <div class="grid gird-rows-3 ml-14 md:ml-36">
      <div
        class="text-xl md:text-7xl font-semibold text-white dark:text-black tracking-tighter font-arvo"
      >
        HELLO I AM GENO
      </div>
      <div
        class="row-start-2 text-lg md:text-xl font-semibold text-white dark:text-black font-chakra pl-[38%]"
      >
        Kooijman
      </div>
      <div
        class="pl-1 md:pl-6 text-lg md:text-3xl text-white dark:text-black font-chakra w-[100%] md:w-[40%] pt-6"
      >
        {{ customFieldAbout }}
      </div>
    </div>
  </section>

  <section
    id="section3"
    class="min-h-screen pt-24 pb-14 scroll-mt-28 transition-colors duration-300 bg-zinc-800 dark:bg-white text-white overflow-x-auto"
  >
    <div v-if="projects.length" class="flex space-x-4">
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="flex-shrink-0"
      >
        <div class="flex justify-center">
          <img
            class="w-[250px] h-[300px]"
            :src="project.image"
            :alt="project.title"
            v-if="project.image"
          />
          <p v-else>No image available</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </section>
</template>

<style scoped>
.scroll-mt-28 {
  scroll-margin-top: 7rem;
}
</style>
