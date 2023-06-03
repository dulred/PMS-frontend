<template>
    <h2>人事管理系统</h2>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
    <el-sub-menu index="1">
    <template #title>部门管理</template>
    <el-menu-item index="1-1"><router-link to="/department" class="a">管理部门</router-link></el-menu-item>
    <el-menu-item index="1-2"><router-link to="/adddepartment" class="a">新增部门</router-link></el-menu-item>
  </el-sub-menu>
  <el-sub-menu index="2">
    <template #title>岗位管理</template>
    <el-menu-item index="2-1"><router-link to="/post" class="a">管理岗位</router-link></el-menu-item>
    <el-menu-item index="2-2"><router-link to="/addpost" class="a">新增岗位</router-link></el-menu-item>
  </el-sub-menu>
  <el-sub-menu index="3">
    <template #title>员工管理</template>
    <el-menu-item index="3-1"><router-link to="/staff" class="a">管理员工</router-link></el-menu-item>
    <el-menu-item index="3-2"><router-link to="/addStaff" class="a">新增员工</router-link></el-menu-item>
  </el-sub-menu>
  <el-menu-item index="4"><router-link to="/peroidOp" class="a">试用期管理</router-link></el-menu-item>
  <el-sub-menu index="5">
      <template #title>岗位调动管理</template>
      <el-menu-item index="5-1"><router-link to="/addTransferStaff" class="a">录入岗位调动</router-link></el-menu-item>
      <el-menu-item index="5-2"><router-link to="/transferStaff" class="a">查询调动员工</router-link></el-menu-item>
  </el-sub-menu>
   <el-sub-menu index="6">
      <template #title>员工离职管理</template>
      <el-menu-item index="6-1"><router-link to="/addQuit" class="a">录入离职员工</router-link></el-menu-item>
      <el-menu-item index="6-2"><router-link to="/quit" class="a">查询已离职员工</router-link></el-menu-item>
  </el-sub-menu>
   <el-sub-menu index="7">
      <template #title>报表管理</template>
      <el-menu-item index="7-1"><router-link to="/newStaffReport" class="a">新聘员工报表</router-link></el-menu-item>
      <el-menu-item index="7-2"><router-link to="/quitStaffReport" class="a">离职员工报表</router-link></el-menu-item>
      <el-menu-item index="7-3"><router-link to="/transferStaffReport" class="a">岗位调动报表</router-link></el-menu-item>
  </el-sub-menu>
    </el-menu>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const activeIndex = ref('1')
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  </script>
  
<style lang="scss" scoped>
   .a{
       text-decoration: none;
       color: aliceblue;
   }
</style>