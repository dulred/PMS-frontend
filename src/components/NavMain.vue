<template>
    <h2>人事管理系统</h2>
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
      :router="true"
    >

<el-sub-menu index="1">
    <template #title>岗位管理</template>
    <el-menu-item index="/department">管理岗位</el-menu-item>
    <el-menu-item index="/adddepartment">新增岗位</el-menu-item>
  </el-sub-menu>
  <el-sub-menu index="2">
    <template #title>岗位管理</template>
    <el-menu-item index="/post">管理岗位</el-menu-item>
    <el-menu-item index="/addpost">新增岗位</el-menu-item>
  </el-sub-menu>
  <el-sub-menu index="3">
    <template #title>员工管理</template>
    <el-menu-item index="/staff">管理员工</el-menu-item>
    <el-menu-item index="/addStaff">新增员工</el-menu-item>
  </el-sub-menu>
  <el-menu-item index="/peroidOp">试用期管理</el-menu-item>
  <el-sub-menu index="5">
      <template #title>岗位调动管理</template>
      <el-menu-item index="/addTransferStaff">录入岗位调动</el-menu-item>
      <el-menu-item index="/TransferStaff">查询调动员工</el-menu-item>
  </el-sub-menu>
   <el-sub-menu index="6">
      <template #title>员工离职管理</template>
      <el-menu-item index="/addQuit">录入离职员工</el-menu-item>
      <el-menu-item index="/quit">查询已离职员工</el-menu-item>
  </el-sub-menu>
   <el-sub-menu index="7">
      <template #title>报表管理</template>
      <el-menu-item index="/newStaffReport">新聘员工报表</el-menu-item>
      <el-menu-item index="/quitStaffReport">离职员工报表</el-menu-item>
      <el-menu-item index="/transferStaffReport">岗位调动报表</el-menu-item>
  </el-sub-menu>
    </el-menu>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  </script>
  
<style lang="scss" scoped>

</style>