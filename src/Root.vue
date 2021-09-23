<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Header from "./components/Header.vue"
</script>

<template>

  <div class="backdrop pt-4">
    <router-view/>
  </div>
</template>

<style>
.backdrop {
  height: 100vh;
  background-repeat: no-repeat !important;
  background-size: cover !important;

  background: black;
  background-image: url("/public/bg.jpg");

}
</style>
