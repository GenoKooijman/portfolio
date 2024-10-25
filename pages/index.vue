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

    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

    const panels = gsap.utils.toArray<HTMLElement>(".panel");
    const panelsContainer =
      document.querySelector<HTMLElement>("#panels-container");

    if (panelsContainer && panels.length > 0) {
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
    }

    gsap.to(window, { scrollTo: 0, duration: 0 });

    document.querySelectorAll(".anchor").forEach((anchor) => {
      anchor.addEventListener(
        "click",
        function (this: HTMLAnchorElement, e: Event) {
          e.preventDefault();
          const targetElem = document.querySelector(this.getAttribute("href")!);
          if (targetElem) {
            gsap.to(window, {
              scrollTo: {
                y: targetElem,
                autoKill: false,
              },
              duration: 1,
            });
          }
        }
      );
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
    <!-- projects -->
    <div id="page" class="site">
      <main id="content" class="site-content w-full" role="main">
        <section id="panels">
          <div id="panels-container" class="flex w-full overflow-hidden">
            <section
              id="section3"
              class="panel flex-shrink-0 flex-grow-0 w-screen min-h-screen pt-24 pb-14 transition-colors duration-300 bg-zinc-800 dark:bg-white text-white"
            >
              <div
                v-if="firstProject"
                class="flex justify-center md:flex md:flex-row md:justify-start items-start pt-12 w-full"
              >
                <div class="flex flex-col items-start pl-12 md:w-1/2">
                  <img
                    class="w-[600px] h-[550px] object-cover rounded-lg"
                    :src="firstProject.image"
                    :alt="firstProject.title"
                    v-if="firstProject.image"
                  />
                  <p v-else>No image available</p>
                </div>

                <div class="flex flex-col pl-4 md:pl-12 justify-start md:w-1/2">
                  <div class="font-bold text-3xl mb-4">Project Title</div>
                  <div class="text-lg w-full">
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
              class="panel flex-shrink-0 flex-grow-0 w-screen min-h-screen pt-24 pb-14 transition-colors duration-300 bg-zinc-800 dark:bg-white text-white"
            >
              <div
                v-if="thirdProject"
                class="flex justify-center md:flex md:flex-row md:justify-start items-start pt-12 w-full"
              >
                <div
                  class="flex flex-col items-start pl-12 col-span-2 md:w-1/2"
                >
                  <img
                    class="w-[600px] h-[550px] object-cover rounded-lg"
                    :src="thirdProject.image"
                    :alt="thirdProject.title"
                    v-if="thirdProject.image"
                  />
                  <p v-else>No image available</p>
                </div>

                <div class="flex flex-col pl-4 md:pl-12 justify-start md:w-1/2">
                  <div class="font-bold text-3xl mb-4">hallo</div>
                  <div class="text-lg w-full">
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
              class="panel flex-shrink-0 flex-grow-0 w-screen min-h-screen pt-24 pb-14 transition-colors duration-300 bg-zinc-800 dark:bg-white text-white"
            >
              <div
                v-if="fourthProject"
                class="flex justify-center md:flex md:flex-row md:justify-start items-start pt-12 w-full"
              >
                <div class="flex flex-col items-start pl-12 md:w-1/2">
                  <img
                    class="w-[600px] h-[550px] object-cover rounded-lg"
                    :src="fourthProject.image"
                    :alt="fourthProject.title"
                    v-if="fourthProject.image"
                  />
                  <p v-else>No image available</p>
                </div>

                <div class="flex flex-col pl-4 md:pl-12 justify-start md:w-1/2">
                  <div class="font-bold text-3xl mb-4">Another Title</div>
                  <div class="text-lg w-full">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod officia doloribus quis doloremque rem animi ipsam, quas
                    soluta! Omnis velit nisi eveniet iste nam distinctio at,
                    repellat esse quod natus.
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
    <!-- contact -->
    <section
      id="section6"
      class="min-h-screen w-full pt-24 pb-14 transition-colors duration-300 bg-zinc-800 dark:bg-white text-white"
    >
      <div v-if="fourthProject" class="flex justify-center mb-8">
        <img
          class="w-[250px] h-[300px] rounded-lg"
          :src="fourthProject.image"
          :alt="fourthProject.title"
          v-if="fourthProject.image"
        />
        <p v-else>No image available</p>
      </div>
    </section>
  </div>
</template>
