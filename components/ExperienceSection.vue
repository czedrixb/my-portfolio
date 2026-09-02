<template>
  <!-- -mt-px / -mb-px: the wave SVGs scale to a fractional height, and the
       sub-pixel section boundary otherwise shows as a yellow hairline. The
       1px of overlap falls on the waves' flat cream edges, so nothing is lost. -->
  <section class="relative -mb-px -mt-px overflow-hidden bg-secondary">
    <!-- Wave transition in from the cream hero. -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      class="block w-full"
      aria-hidden="true"
    >
      <path
        fill="#f2eee7"
        fill-opacity="1"
        d="M0,32L48,32C96,32,192,32,288,32C384,32,480,32,576,69.3C672,107,768,181,864,197.3C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      ></path>
    </svg>

    <div
      class="container mx-auto max-w-sm px-5 py-8 md:max-w-screen-sm md:px-0 md:py-16"
    >
      <h2
        id="work"
        class="mb-12 scroll-mt-24 text-center text-2xl font-bold text-black md:ml-[-1%] md:text-left md:text-4xl"
        data-aos="fade-down"
      >
        Work Experience
      </h2>

      <ol class="mb-3 flex flex-col gap-y-5">
        <li
          v-for="(job, index) in experience"
          :key="job.company"
          data-aos="fade-right"
          :data-aos-delay="index * 80"
        >
          <div class="relative h-5">
            <svg
              class="absolute bottom-[100%] left-[-2.5%] w-5 md:left-[-1.5%]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              aria-hidden="true"
            >
              <path
                d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"
              />
            </svg>
          </div>

          <div class="border-s-2 border-black px-3">
            <div class="mb-8 text-left font-medium text-black">
              <h3 class="text-lg underline underline-offset-8">
                {{ job.company }}
              </h3>
              <div class="text-md">{{ job.role }}</div>
              <div class="text-md mb-3">{{ job.period }}</div>

              <p class="text-md mb-3 text-justify">{{ job.summary }}</p>

              <ul class="flex flex-wrap gap-1.5">
                <li v-for="tech in job.tech" :key="tech">
                  <TechTag :label="tech" />
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ol>

      <div class="flex justify-center" data-aos="fade-up">
        <a
          href="#projects"
          class="btn text-md flex items-center gap-3 rounded-full border-0 bg-black px-8 text-white shadow-sm transition-shadow hover:bg-primary hover:text-black hover:shadow-lg"
        >
          Projects
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
            />
          </svg>
        </a>
      </div>
    </div>

    <!-- Wave transition back out to the cream projects section. -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      class="block w-full"
      aria-hidden="true"
    >
      <path
        fill="#f2eee7"
        fill-opacity="1"
        d="M0,96L21.8,128C43.6,160,87,224,131,234.7C174.5,245,218,203,262,202.7C305.5,203,349,245,393,240C436.4,235,480,181,524,181.3C567.3,181,611,235,655,256C698.2,277,742,267,785,261.3C829.1,256,873,256,916,224C960,192,1004,128,1047,133.3C1090.9,139,1135,213,1178,202.7C1221.8,192,1265,96,1309,96C1352.7,96,1396,192,1418,240L1440,288L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
      ></path>
    </svg>
  </section>
</template>

<script setup>
import experience from "~/assets/data/experience.json";
</script>
