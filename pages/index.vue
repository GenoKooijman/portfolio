<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRuntimeConfig } from "#app";
import { gsap } from "gsap";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";

interface Post {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
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

const firstProject = computed(() => projects.value[0]);
const secondProject = computed(() => projects.value[1]);
const thirdProject = computed(() => projects.value[2]);
const fourthProject = computed(() => projects.value[3]);

onMounted(async () => {
  const config = useRuntimeConfig();
  const apiUrl = `${config.public.API_BASE_URL}/wp/v2/pages?slug=home-page`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    posts.value = data;
    customFieldAbout.value = data[0].acf?.about;

    pfpImage.value =
      "http://localhost/wordpress/wp-content/uploads/2024/10/geno.jpg";

    projects.value = [
      { image: "http://localhost/wordpress/wp-content/uploads/2024/10/geno.jpg", title: "Project 1" },
      { image: "http://localhost/wordpress/wp-content/uploads/2024/10/geno.jpg", title: "Project 2" },
      { image: "http://localhost/wordpress/wp-content/uploads/2024/10/thumbnail_560ee8b7-60ff-4d9a-88a4-d4a5c37b1066.jpg", title: "Project 3" },
      { image: "http://localhost/wordpress/wp-content/uploads/2024/10/annexbios.jpg", title: "Project 4" },
    ];

    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

    const panels = gsap.utils.toArray<HTMLElement>(".panel");
    const panelsContainer = document.querySelector<HTMLElement>("#panels-container");

    if (panelsContainer && panels.length > 0) {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const totalWidth = panels.length * window.innerWidth;
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: panelsContainer,
            pin: true,
            start: "top top",
            scrub: 1,
            end: () => `+=${totalWidth}`,
            markers: false,
          },
        });
      });

      mm.add("(max-width: 767px)", () => {
        panelsContainer.style.display = 'block';
      });
    }

    gsap.to(window, { scrollTo: 0, duration: 0 });

    document.querySelectorAll(".anchor").forEach((anchor) => {
      anchor.addEventListener("click", function (this: HTMLAnchorElement, e: Event) {
        e.preventDefault();
        const targetElem = document.querySelector(this.getAttribute("href")!);
        if (targetElem) {
          gsap.to(window, {
            scrollTo: { y: targetElem, autoKill: false },
            duration: 1,
          });
        }
      });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<template>
  <!-- home  -->
  <div class="overflow-x-hidden">
    <section
      id="section1"
      class="min-h-screen pt-24 transition-colors duration-300 bg-zinc-800 dark:bg-white text-white w-full"
    >
      <ul>
        <li v-for="post in posts" :key="post.id" class="mb-8">
          <div class="flex flex-col md:grid md:grid-cols-2 mt-6">
            <div class="col-start-1">
              <h1
                class="text-4xl md:text-9xl text-white dark:text-black ml-12 font-bold font-arvo"
              >
                {{ post.title.rendered }}
              </h1>
              <div
                class="text-4xl md:text-9xl font-bold text-white dark:text-black font-chakra ml-24 pt-8"
                v-html="post.content.rendered"
              ></div>
            </div>
            <div
              v-if="pfpImage"
              class="col-start-2 flex items-start ml-20 mt-4 md:mt-0 md:ml-48"
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
    <!-- about -->
    <section
      id="section2"
      class="min-h-screen pt-24 pb-14 transition-colors duration-300 bg-zinc-800 dark:bg-white text-white w-full"
    >
      <div class="ml-14 md:ml-36 gap-2 md:gap-4">
        <div
          class="text-xl md:text-7xl font-semibold text-white dark:text-black tracking-tighter font-arvo"
        >
          HELLO I AM GENO
        </div>
        <div
          class="row-start-2 text-lg md:text-xl font-semibold text-white dark:text-black font-chakra md:pl-[37%]"
        >
          Kooijman
        </div>
        <div
          class="pl-1 md:pl-12 text-lg md:text-3xl text-white dark:text-black font-chakra w-[90%] md:w-[40%]"
        >
          {{ customFieldAbout }}
        </div>
      </div>
    </section>
    </div>
    <!-- projects -->
    <div id="page" class="site">
  <main id="content" class="site-content w-full" role="main">
    <section id="panels">
      <div id="panels-container" class="flex w-full overflow-hidden">

        <section
          id="section3"
          class="panel flex-shrink-0 flex-grow-0 w-screen min-h-screen pt-24 pb-14 transition-colors duration-300 bg-zinc-800 dark:bg-white text-white dark:text-black"
        >
          <div
            v-if="firstProject"
            class="flex flex-col items-center pt-12 w-full md:flex md:flex-row md:justify-start"
          >
            <div class="flex flex-col items-center pl-12 mr-6 md:mr-0 md:w-1/2">
              <img
                class="w-[300px] h-[275px] object-cover rounded-lg md:w-[600px] md:h-[550px]"
                :src="firstProject.image"
                :alt="firstProject.title"
                v-if="firstProject.image"
              />
              <p v-else>No image available</p>
            </div>
            <div class="flex flex-col pl-4 md:pl-12 justify-start md:w-1/2 mt-4 md:mt-0">
              <div class="font-bold text-3xl mb-4 font-arvo text-white dark:text-black text-center md:text-left">Project Title</div>
              <div class="text-lg w-full font-chakra text-white dark:text-black text-center md:text-left">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Vel, quisquam. Dignissimos maiores voluptatem laudantium
                ducimus, quo blanditiis hic aut ipsa magni beatae similique
                saepe, neque laboriosam ex exercitationem possimus
                temporibus?
              </div>
            </div>
          </div>
        </section>

        <section
          id="section4"
          class="panel flex-shrink-0 flex-grow-0 w-screen min-h-screen pt-24 pb-14 transition-colors duration-300 bg-zinc-800 dark:bg-white text-white dark:text-black"
        >
          <div
            v-if="thirdProject"
            class="flex flex-col items-center pt-12 w-full md:flex md:flex-row md:justify-start"
          >
            <div class="flex flex-col items-center pl-12 mr-6 md:mr-0 md:w-1/2">
              <img
                class="w-[300px] h-[275px] object-cover rounded-lg md:w-[600px] md:h-[550px]"
                :src="thirdProject.image"
                :alt="thirdProject.title"
                v-if="thirdProject.image"
              />
              <p v-else>No image available</p>
            </div>
            <div class="flex flex-col pl-4 md:pl-12 justify-start md:w-1/2 mt-4 md:mt-0">
              <div class="font-bold text-3xl mb-4 font-arvo text-white dark:text-black text-center md:text-left">Hallo</div>
              <div class="text-lg w-full font-chakra text-white dark:text-black text-center md:text-left">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Atque similique rerum tempora nesciunt voluptates voluptate
                iure impedit, sint velit officia explicabo quod laudantium
                ad cupiditate, eaque omnis dolore quam quae.
              </div>
            </div>
          </div>
        </section>

        <section
          id="section5"
          class="panel flex-shrink-0 flex-grow-0 w-screen min-h-screen pt-24 pb-14 transition-colors duration-300 bg-zinc-800 dark:bg-white text-white dark:text-black"
        >
          <div
            v-if="fourthProject"
            class="flex flex-col items-center pt-12 w-full md:flex md:flex-row md:justify-start"
          >
            <div class="flex flex-col items-center pl-12 mr-6 md:mr-0 md:w-1/2">
              <img
                class="w-[300px] h-[275px] object-cover rounded-lg md:w-[600px] md:h-[550px]"
                :src="fourthProject.image"
                :alt="fourthProject.title"
                v-if="fourthProject.image"
              />
              <p v-else>No image available</p>
            </div>
            <div class="flex flex-col pl-4 md:pl-12 justify-start md:w-1/2 mt-4 md:mt-0">
              <div class="font-bold text-3xl mb-4 font-arvo text-white dark:text-black text-center md:text-left">Another Title</div>
              <div class="text-lg w-full mb-4 font-chakra text-white dark:text-black text-center md:text-left">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quod officia doloribus quis doloremque rem animi ipsam, quas
                soluta! Omnis velit nisi eveniet iste nam distinctio at,
                repellat esse quod natus.
              </div>
            </div>
          </div>
          <NuxtLink
            to="/projects"
            class="float-right border-2 border-white pr-8 md:pr-16 pl-8 md:pl-0 mr-20 md:mr-0 text-xl flex items-center text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200 rounded-lg"
          >
            More Projects
            <Icon name="ic:outline-read-more" class="bg-white dark:bg-black pl-4 h-10 w-10" />
          </NuxtLink>
        </section>

      </div>
    </section>
  </main>
</div>
  <!-- contact/footer -->
  <section
    id="section6"
    class="min-h-screen w-full pt-24 pb-14 transition-colors duration-300 bg-zinc-800 dark:bg-white text-white dark:text-black"
  >
    <div class="grid grid-rows-4 grid-cols-3 gap-4">
      <div class="text-[5rem] font-arvo tracking-tight w-[40%] relative">
        LET'S
        <div
          class="absolute top-1/2 left-full transform -translate-y-1/2 space-y-4 ml-8"
        >
          <div
            class="relative inline-block w-36 md:ml-[500px] py-4 rounded-full text-white text-center transition-colors border-2 border-white dark:border-black duration-300 hover:bg-gray-700 dark:hover:bg-gray-200 overflow-hidden"
          >
            <div class="absolute inset-0 flex items-center animate-marquee">
              <span class="whitespace-nowrap text-sm text-white dark:text-black"> Number: 06 58767486</span>
            </div>
          </div>
          <div
            class="relative inline-block w-36 ml-[150px] md:ml-[100px] py-4 rounded-full text-white text-center transition-colors border-2 border-white dark:border-black duration-300 hover:bg-gray-700 dark:hover:bg-gray-200 overflow-hidden mt-4"
          >
            <div class="absolute inset-0 flex items-center animate-marquee">
              <span class="whitespace-nowrap text-sm text-white dark:text-black">Instagram</span>
            </div>
          </div>
          <div
            class="relative inline-block w-36 md:ml-[400px] py-4 rounded-full text-white text-center transition-colors border-2 border-white dark:border-black duration-300 hover:bg-gray-700 dark:hover:bg-gray-200 overflow-hidden mt-4"
          >
            <div class="absolute inset-0 flex items-center animate-marquee">
              <span class="whitespace-nowrap text-sm text-white dark:text-black">LinkedIn</span>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div class="text-[5rem] font-arvo tracking-tighter w-[40%] row-start-3 relative">
        CONNECT
        <div
          class="absolute top-1/2 left-full transform -translate-y-1/2 space-y-4 ml-8"
        >
          <div
            class="relative inline-block w-36 mb-6 md:mb-0 ml-[150px] md:ml-64 py-4 rounded-full text-white text-center transition-colors border-2 border-white dark:border-black duration-300 hover:bg-gray-700 dark:hover:bg-gray-200 overflow-hidden"
          >
            <div class="absolute inset-0 flex items-center animate-marquee">
              <span class="whitespace-nowrap text-sm text-white dark:text-black">genokooijman@gmail.com</span>
            </div>
          </div>
          <div
            class="relative inline-block w-36 md:ml-[500px] py-4 rounded-full text-white text-center transition-colors border-2 border-white dark:border-black duration-300 hover:bg-gray-700 dark:hover:bg-gray-200 overflow-hidden mt-4"
          >
            <div class="absolute inset-0 flex items-center animate-marquee">
              <span class="whitespace-nowrap text-sm text-white dark:text-black">GitHub</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-marquee {
  animation: marquee 5s linear infinite;
}

.animate-marquee span {
  letter-spacing: 0.2em;
  word-spacing: 0.5em;
}
</style>