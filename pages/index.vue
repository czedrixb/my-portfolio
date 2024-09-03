<template>
  <div class="overflow-hidden relative">
    <div
      class="bg-hero w-[32rem] h-[92rem] md:h-[77rem] lg:h-[86rem] left-[77%] md:left-[63%] bottom-[45%] md:bottom-[52%] lg:bottom-[44%] absolute"
    ></div>
    <div class="bg-primary">
      <div
        class="container mx-auto px-5 md:px-0 max-w-sm md:max-w-screen-sm lg:max-w-screen-md py-8 md:py-5"
      >
        <div
          class="grid justify-items-center items-center grid-cols-1 md:grid-cols-2 gap-3 mb-5 md:mb-12 lg:max-w-screen-xl"
        >
          <div class="mb-20 md:mb-0">
            <div
              class="flex items-center gap-x-2 animate__animated animate__fadeInLeft"
            >
              <div
                class="animate__animated animate__headShake animate__infinite text-2xl lg:text-4xl pb-5 md:pb-0 md:pt-10"
              >
                👋
              </div>
              <div
                class="text-black text-left text-3xl font-bold mb-3 md:pt-16 lg:text-4xl relative"
              >
                Hi there! I'm Czed.
                <div
                  class="absolute h-2 bg-secondary w-[14rem] md:w-[15rem] left-[61%] transform -translate-x-1/2 bottom-[8%] md:bottom-[3%] -z-10"
                ></div>
              </div>
            </div>
            <div
              class="text-black text-left text-md font-medium mb-8 md:text-lg lg:text-xl animate__animated animate__fadeInLeft animate__delay-1s"
            >
              I'm a <b>full stack web developer</b> who loves developing
              websites, and I get excited about turning your ideas into websites
              that are up and running.
            </div>
            <div class="text-center">
              <a
                rel="noopener"
                target="_blank"
                href="/pdf/CZEDRIX-BARCENA-RESUME-2024.pdf"
                class="btn rounded-full bg-secondary border-0 shadow-sm text-md px-8 hover:bg-[#ddbe08] animate__animated animate__pulse animate__infinite animate__delay-1s hover:shadow-yellow-200 hover:shadow-lg"
              >
                View my CV
              </a>
            </div>
          </div>
          <div
            class="animate__animated animate__bounce animate__infinite animate__delay-1s"
          >
            <img
              src="/images/img-hero.png"
              class="max-w-full h-auto"
              alt="img-hero"
            />
          </div>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:justify-items-center gap-3"
        >
          <div class="animate__animated animate__fadeInUp">
            <div
              class="relative text-black text-left text-md font-bold mb-5 text-2xl md:text-lg lg:text-xl bg-transparent z-10"
            >
              Front End

              <div
                class="absolute h-2 bg-secondary w-[6rem] md:w-20 left-[21%] md:left-[34%] transform -translate-x-1/2 bottom-[8%] md:bottom-[16%] -z-10"
              ></div>
            </div>

            <div class="grid grid-cols-4 md:grid-cols-3 gap-3 md:gap-5 mb-5">
              <div
                class="flex justify-center"
                v-for="front in fronts"
                :key="front"
              >
                <img class="w-10" :src="front.src" :alt="front.alt" />
              </div>
            </div>
          </div>
          <div class="animate__animated animate__fadeInUp animate__delay-1s">
            <div
              class="relative text-black text-left text-md font-bold mb-5 text-2xl md:text-lg lg:text-xl bg-transparent z-10"
            >
              Back End

              <div
                class="absolute h-2 bg-secondary w-[6rem] md:w-20 left-[21%] md:left-[34%] transform -translate-x-1/2 bottom-[8%] md:bottom-[16%] -z-10"
              ></div>
            </div>
            <div class="grid grid-cols-4 md:grid-cols-3 gap-3 md:gap-5 mb-5">
              <div
                class="flex justify-center"
                v-for="back in backs"
                :key="back"
              >
                <img class="w-10" :src="back.src" :alt="back.alt" />
              </div>
            </div>
          </div>
          <div
            class="md:col-span-2 lg:col-span-1 animate__animated animate__fadeInUp animate__delay-2s"
          >
            <div
              class="relative text-black text-left text-md font-bold mb-5 text-2xl md:text-lg lg:text-xl bg-transparent z-10"
            >
              Miscellaneous

              <div
                class="absolute h-2 bg-secondary w-[8rem] md:w-[7rem] left-[31%] md:left-[49%] transform -translate-x-1/2 bottom-[8%] md:bottom-[16%] -z-10"
              ></div>
            </div>
            <div class="grid grid-cols-4 md:grid-cols-3 gap-3 md:gap-5 mb-5">
              <div
                class="flex justify-center"
                v-for="misc in miscs"
                :key="misc"
              >
                <img class="w-10" :src="misc.src" :alt="misc.alt" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-secondary overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#f2eee7"
          fill-opacity="1"
          d="M0,32L48,32C96,32,192,32,288,32C384,32,480,32,576,69.3C672,107,768,181,864,197.3C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
      <div
        class="container mx-auto px-5 md:px-0 max-w-sm md:max-w-screen-sm py-8 md:py-16"
      >
        <div
          class="text-black text-center text-2xl font-bold md:text-left md:text-4xl mb-12"
          data-aos="fade-down"
        >
          Work Experience
        </div>

        <div class="flex flex-col gap-y-5" data-aos="zoom-in">
          <div>
            <div class="relative h-5">
              <svg
                class="w-5 absolute left-[-2.5%] md:left-[-1.5%] bottom-[100%]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"
                />
              </svg>
            </div>
            <div class="border-s-2 border-black px-3">
              <div class="text-black text-left font-medium mb-8">
                <div class="text-lg underline underline-offset-8">
                  R Web Solutions Corp.
                </div>
                <div class="text-md">Assistant Web Developer Supervisor</div>
                <div class="text-md mb-3">December 2023 - August 2024</div>

                <p class="text-md text-justify mb-3">
                  My tech stack here is <b>WAMP</b>. I mainly used
                  <b>Laravel</b> for backend and used native <b>HTML</b>,
                  <b>CSS</b>, <b>Javascript</b>, <b>Tailwind</b>, <b>Vue</b>,
                  and <b>Quasar</b> for frontend. I've also used
                  <b>Capacitor</b> converting web to mobile accompanied by
                  <b>Laravel REST API</b>. I used <b>Axios</b> for consuming API
                  and <b>Postman</b> for testing it. I used <b>Mailtrap</b> for
                  mailing. Every website I developed has a custom
                  <b>Content Management System</b> built from scratch that is
                  tailor-fit for client needs. I used <b>Github</b> for storing
                  my projects and to collaborate on projects with my workmates.
                  I was exposed to different website categories, such as basic
                  websites, e-commerce, and booking websites. I've also
                  integrated payment APIs such as <b>Stripe</b>,
                  <b>Paymongo</b>, and <b>Maya</b>. Additionally, I've
                  integrated delivery APIs such as <b>Lalamove</b> and
                  <b>Transportify</b>.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div class="relative h-5">
              <svg
                class="w-5 absolute left-[-2.5%] md:left-[-1.5%] bottom-[100%]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"
                />
              </svg>
            </div>
            <div class="border-s-2 border-black px-3">
              <div class="text-black text-left font-medium mb-8">
                <div class="text-lg underline underline-offset-8">
                  Provincial Government of Davao de Oro
                </div>
                <div class="text-md">Internship</div>
                <div class="text-md mb-3">February 2022 - April 2022</div>

                <p class="text-md text-justify mb-3">
                  I used templated
                  <b>Bootstrap</b> admin UI for frontend. In backend, I used
                  Laravel accompanied by MySQL for database. I was assigned to a
                  module which is to do a functionality for application for
                  transporting vehicles. I used Github for collaborating with my
                  workmates since it was more of a module based project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#f2eee7"
          fill-opacity="1"
          d="M0,96L21.8,128C43.6,160,87,224,131,234.7C174.5,245,218,203,262,202.7C305.5,203,349,245,393,240C436.4,235,480,181,524,181.3C567.3,181,611,235,655,256C698.2,277,742,267,785,261.3C829.1,256,873,256,916,224C960,192,1004,128,1047,133.3C1090.9,139,1135,213,1178,202.7C1221.8,192,1265,96,1309,96C1352.7,96,1396,192,1418,240L1440,288L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
        ></path>
      </svg>
    </div>

    <div
      class="bg-projects absolute left-[-17%] md:left-[-20%] bottom-[2%] md:bottom-[2%] lg:bottom-[3%] h-[107rem] md:h-[111rem] lg:h-[76rem] w-[11rem] md:w-[26rem] xl:w-[48rem]"
    ></div>

    <div class="bg-primary pb-8">
      <div
        class="container mx-auto px-5 md:px-0 max-w-sm md:max-w-screen-sm lg:max-w-screen-md py-8 md:py-5"
      >
        <div
          class="relative text-black mb-3 text-center md:text-left text-md font-bold text-2xl md:text-4xl bg-transparent z-10"
          data-aos="fade-down"
        >
          Projects

          <div
            class="absolute h-2 bg-secondary w-20 md:w-[8rem] left-[55%] md:left-[14%] transform -translate-x-1/2 bottom-[8%] -z-10"
          ></div>
        </div>
        <p
          class="text-black text-left text-md font-medium mb-16 md:text-lg lg:text-xl animate__animated animate__fadeInLeft"
        >
          As a web developer, I work on side projects out of passion and
          curiosity. These projects allow me to explore new technologies and
          expand my skill set. I'm always eager to learn, and I enjoy
          experimenting with the latest tools and frameworks to stay ahead in
          the ever-evolving world of web development.
        </p>

        <div
          class="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center"
          data-aos="flip-left"
        >
          <div
            class="card bg-base-100 w-[22rem] sm:w-96 shadow-xl transform hover:-translate-y-2 transition duration-300 ease-in-out"
          >
            <figure>
              <img src="/images/pokefinder.png" alt="Pokéfinder" />
            </figure>
            <div class="card-body">
              <h2 class="card-title items-center">
                Pokéfinder
                <div class="badge badge-secondary">In Progress</div>
              </h2>
              <p>
                I built this Pokémon-themed web app as a personal project to
                learn Nuxt and API consumption. Since Pokémon is one of my
                favorite games, it served as a great motivator for me to dive
                into this development challenge.
              </p>
              <div class="card-actions items-center justify-between">
                <div>
                  Visit
                  <a
                    target="_blank"
                    rel="noopener"
                    class="text-success underline"
                    href="https://pokefinder-smoky.vercel.app/"
                    >here</a
                  >
                </div>
                <div class="badge text-white bg-success">Nuxt</div>
              </div>
            </div>
          </div>
          <div
            class="card bg-base-100 w-[22rem] sm:w-96 shadow-xl transform hover:-translate-y-2 transition duration-300 ease-in-out"
          >
            <figure>
              <img src="/images/receiptify.png" alt="Receiptify" />
            </figure>
            <div class="card-body">
              <h2 class="card-title items-center">
                Receiptify
                <div class="badge badge-secondary">In Progress</div>
              </h2>
              <p>
                I built this app to familiarize myself with the Spotify API and
                Node.js with Express. Even though there's no need for a backend,
                I wanted to learn Node.js while developing this project. It was
                created using Nuxt for the frontend and Node.js for the backend.
              </p>
              <div class="card-actions items-center justify-between">
                <div>
                  Visit
                  <a
                    target="_blank"
                    rel="noopener"
                    class="text-success underline"
                    href="https://receiptify-one.vercel.app/"
                    >here</a
                  >
                </div>
                <div class="flex flex-wrap gap-1">
                  <div class="badge text-white bg-warning">Node</div>
                  <div class="badge text-white bg-success">Nuxt</div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="card bg-base-100 w-[22rem] sm:w-96 shadow-xl transform hover:-translate-y-2 transition duration-300 ease-in-out"
          >
            <figure>
              <img src="/images/pet-pals.png" alt="Receiptify" />
            </figure>
            <div class="card-body">
              <h2 class="card-title items-center">
                Pet Pals
                <div class="badge badge-secondary">In Progress</div>
              </h2>
              <p>
                This is a mobile app built using Quasar and converted to a
                mobile platform through Capacitor. I created this project
                inspired by a friend's idea, combining my passion for pets with
                mobile app development.
              </p>
              <div class="card-actions items-center justify-end">
                <div class="badge text-white bg-info">Quasar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

useSeoMeta({
  title: "My Portfolio",
  ogTitle: "My Portfolio",
});

const fronts = ref(null);
const backs = ref(null);
const miscs = ref(null);

const getFrontend = async () => {
  try {
    const response = await fetch("/data/frontend.json");
    const data = await response.json();
    fronts.value = data;
  } catch (error) {
    console.error("Error fetching icons:", error);
  }
};

const getBackend = async () => {
  try {
    const response = await fetch("/data/backend.json");
    const data = await response.json();
    backs.value = data;
  } catch (error) {
    console.error("Error fetching icons:", error);
  }
};

const getMisc = async () => {
  try {
    const response = await fetch("/data/misc.json");
    const data = await response.json();
    miscs.value = data;
  } catch (error) {
    console.error("Error fetching icons:", error);
  }
};

onMounted(() => {
  getFrontend(), getBackend(), getMisc();
});
</script>
