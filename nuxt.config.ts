// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'en', 'data-theme': 'mytheme' },
      meta: [
        { name: 'theme-color', content: '#f2eee7' },
        { name: 'color-scheme', content: 'light' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['nuxt-aos'],

  aos: {
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
    disableMutationObserver: false,
  },
})
