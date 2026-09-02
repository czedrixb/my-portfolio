<template>
  <div>
    <HeroSection />
    <ExperienceSection />
    <ProjectsSection />
  </div>
</template>

<script setup>
const siteUrl = "https://my-portfolio-five-rho-11.vercel.app";
const description =
  "Czedrix Barcena — full-stack engineer building production web, mobile and AI products with Laravel, Nuxt, React, FastAPI and Kotlin.";

useSeoMeta({
  title: "Czedrix Barcena — Full Stack Web Developer",
  description,
  ogTitle: "Czedrix Barcena — Full Stack Web Developer",
  ogDescription: description,
  ogType: "website",
  ogUrl: siteUrl,
  ogImage: `${siteUrl}/images/img-hero.png`,
  twitterCard: "summary_large_image",
  twitterTitle: "Czedrix Barcena — Full Stack Web Developer",
  twitterDescription: description,
  twitterImage: `${siteUrl}/images/img-hero.png`,
});

useHead({
  link: [{ rel: "canonical", href: siteUrl }],
});
</script>
