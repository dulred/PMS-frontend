<template>
  <el-dialog title="管理员登录" v-model="dialogVisible"  width="30%" align-center  :before-close="handleClose" :show-close="false">
    <el-form ref="ruleFormRef" :model="ruleForm " :rules="rules" style="width:100%;"  label-width="20%">
    <el-form-item label="用户名" prop="uname">
      <el-input v-model="ruleForm.uname"  placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="upwd">
      <el-input v-model="ruleForm.upwd" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)" :loading="loadingbut">{{loadingbuttext}}</el-button>
      <el-button type="danger" @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
    </el-form>
  </el-dialog>
  </template>
  <script setup lang="ts">

  import {ref}  from "vue";
  import type { FormInstance, FormRules } from 'element-plus'

  const ruleFormRef = ref<FormInstance>()
  const ruleForm  = ref({
    uname:"",
    upwd:""
  });

  const rules  = ref<FormRules>({
      uname: [{required: true, message: '请输入用户名', trigger: 'blur'}],
      upwd: [{required: true, message: '请输入密码', trigger: 'blur'}]
  })

  const handleClose = () => {
     return dialogVisible.value =true
 }


const dialogVisible = ref(true);
const loadingbut = ref(false);
const loadingbuttext = ref("登录");


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loadingbut.value = true
      loadingbuttext.value = '登录中...'
      console.log('submit!')   

    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

  </script>
  
  <style scoped>

  </style>
  
  