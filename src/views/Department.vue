<template>
    <NavMain></NavMain>
    <h3>
        {{ message }}

    </h3>

  </template>
  
  <script lang="ts" setup>
  
    import {ref} from "vue";
    import { useStore } from 'vuex'
    import NavMain from '@/components/NavMain.vue';
  const store = useStore()
  const message = ref("Department.........")
  console.log(store.state.count)


  </script>