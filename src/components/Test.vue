<template>
  <div ref="el"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const el = ref()

onMounted(() => {
  el.value.textContent = 'Hello, world!'
})
</script>