<script setup lang="ts">

import {ref, reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// a computed ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})

function calculateBooksMessage() {
  return author.books.length > 0 ? 'Yes' : 'No'
}


const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ')
  }
});

const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}!`) 
  // `event` is the native DOM event
  if (event) {
    alert(event.target.tagName)
  }
}
interface Person {
  firstName: string;
  lastName: string;
}
 
function greeter(person: Person) {
  console.log("Hello, " + person.firstName + " " + person.lastName) 
}
 
let user = { firstName: "Jane", lastName: "User" };

greeter(user);

</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
  <p>{{ calculateBooksMessage() }}</p>
  <h3>{{ fullName }}</h3>
  <button @click="(event)=>greet(event)">Greet</button>
</template>

<style lang="scss" scoped>
    p {color:$bg-color;}
</style>