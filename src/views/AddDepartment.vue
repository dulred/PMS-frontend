<template>
    <NavMain></NavMain>
  <div class="box">
   <el-form ref="addForm" :model="addForm" :rules="rules"  style="width:50%;"  label-width="50%" >
  <el-form-item label="部门名称"  prop="dname">
    <el-input v-model="addForm.dname"  placeholder="请输入部门名"></el-input>
  </el-form-item>
 <el-form-item label="部门类型" prop="dtype">
    <el-select v-model="addForm.dtype" placeholder="请选择部门类型">
      <el-option v-for="(item,index) in dtypes" :key="index" :label="item" :value="item"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="电话"  prop="dtel">
    <el-input v-model="addForm.dtel"  placeholder="请输入部门电话"></el-input>
  </el-form-item>
  <el-form-item label="邮箱"  prop="dmail">
    <el-input v-model="addForm.dmail"  placeholder="请输入部门邮箱"></el-input>
  </el-form-item>
  <el-form-item label="描述"  prop="description">
    <el-input v-model="addForm.description" type="textarea"  placeholder="请输入描述"></el-input>
  </el-form-item>
  <el-form-item label="上级部门" prop="supdepartment">
    <el-select v-model="addForm.supdepartment" placeholder="请选择上级部门">
      <el-option v-for="(item,index) in supdepartments" :key="index" :label="item.dname" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="add(addForm)" :loading="loadingbut">{{loadingbuttext}}</el-button>
    <el-button type="danger" @click="cancel">重置</el-button>
  </el-form-item>
</el-form>
 </div>

  </template>
  
  <script lang="ts" setup>
  import {ref} from "vue";
  import type {FormInstance, FormRules} from 'element-plus'
  const addForm = ref({
    dname:"",
    dtype:"",
    dtel:"",
    dmail:"",
    description:"",
    supdepartment:""
  })
  //部门查询
  const dtypes  = ref([ '', '核心业务部门', '支持职能部门', '管理职能部门', '战略规划部门', '专项任务部门'])
  const supdepartments = ref ([{
    id:"",
    dname:""
  }])
  const loadingbut = ref(false);
const loadingbuttext = ref("登录");
const rules  = ref<FormRules>({
    uname: [{required: true, message: '请输入用户名', trigger: 'blur'}],
    upwd: [{required: true, message: '请输入密码', trigger: 'blur'}]
})

const add = (addForm)=>{

}
const cancel = ()=>{

}

  </script>
  
  <style lang="scss" scoped>
      .box  { margin-top: 30px; display: flex;justify-content: center;}
</style>