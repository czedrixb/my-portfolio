<template>
  <div class="bg-primary sticky top-0 z-50">
    <div class="navbar container font-medium text-black mx-auto">
      <div class="navbar-start">
        <NuxtLink to="/" class="btn btn-ghost text-xl border-0">
          <span class="font-bold">CZ.</span>
        </NuxtLink>
      </div>
      <div class="navbar-end">
        <ul class="menu menu-horizontal items-center gap-x-3 px-1">
          <li>
            <a
              href="mailto:czedrixb@gmail.com"
              class="btn btn-secondary rounded-full animate__animated animate__pulse animate__infinite hover:shadow-yellow-200 hover:shadow-lg"
              >Hire Me</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      settings: false,
    };
  },
};
</script>