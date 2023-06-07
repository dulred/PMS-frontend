<template>
  <el-dialog title="管理员登录" v-model="dialogVisible"  width="30%" align-center  :before-close="handleClose" :show-close="false">
    <el-form ref="ruleFormRef" :model="ruleForm " :rules="rules" style="width:100%;"  label-width="20%">
    <el-form-item label="用户名" prop="uname">
      <el-input v-model="ruleForm.uname"  placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="upwd">
      <el-input v-model="ruleForm.upwd" placeholder="请输入密码"  show-password></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)" :loading="loadingbut">{{loadingbuttext}}</el-button>
      <el-button type="danger" @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
    </el-form>
  </el-dialog>
  </template>
  <script setup lang="ts">
import {ref,inject}  from "vue";
import  { ElMessage, ElMessageBox} from 'element-plus'
import type {FormInstance, FormRules} from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'


const store = useStore()
const router = useRouter()
const route = useRoute()
const axios:any = inject("$axios");


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
  await formEl.validate((valid:any, fields:any) => {
    if (valid) {
    
      loadingbut.value = true
      loadingbuttext.value = '登录中...'

      axios.post("/login",{
        uname:ruleForm.value.uname,
        upwd:ruleForm.value.upwd
      })
      .then ((successResponse:any)=>{
          if(successResponse.data=="ok"){
            ElMessage({
              message: '恭喜您，您已成功登录',
              type: 'success',
              showClose: true,
            })
            store.commit('changeLogin',ruleForm.value.uname)
            let path = route.query.redirect
            router.replace({path: path === '/' || path === undefined ? '/department': path})
          }else{
            ElMessage.error('用户名或密码错误,请您重新输入')
            loadingbut.value = false;
            loadingbuttext.value = '登录'
          }
      })
      .catch ((error:any)=>{
        ElMessage({
              message: '请检查网络或者服务器',
              type: 'warning',
              showClose: true,
        })
        loadingbut.value = false
      loadingbuttext.value = '登录'
      })


    } else {
      ElMessage.error('验证失败，请输入合法的值')
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
  
  