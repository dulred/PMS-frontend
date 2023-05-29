<template>
    <button @click="showAlert">点击弹出对话框</button>
  </template>
  
  <script setup lang="ts">
  
  import { ElMessageBox } from 'element-plus'
  
  const showAlert = () => {
    ElMessageBox.alert('这是一条提示信息', {
      confirmButtonText: '好的',
      callback: action => {
        console.log(`用户点击了 ${action}`)
      }
    })
  }
  </script>