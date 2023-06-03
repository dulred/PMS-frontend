<template>
  <h3>{{cc}}</h3>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import {ref} from "vue";
const router = useRouter()
const route = useRoute()
const cc = ref("dfsfds")
</script>