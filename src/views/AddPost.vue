<template>
    <NavMain></NavMain>
    <div class="addPost">
        <el-form  :model ="addForm" ref="addFormRef" :rules="rules" style="width: 30%;">
            <el-form-item label="岗位名称" prop="pname">
                <el-input v-model="addForm.pname" placeholder="请输入岗位名">
                </el-input>
            </el-form-item>
            <el-form-item label="岗位类型" prop="ptype">
                <el-select v-model="addForm.ptype" placeholder="请选择岗位类型">
                    <el-option v-for="item in ptypes" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="岗位名称" prop="organization">
                <el-input v-model="addForm.organization" aria-placeholder="请输入编制人数">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="add(addFormRef)" :loading="loadingbut" >{{loadingbuttext}}</el-button>
                <el-button type="danger" @click="cancel">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
 

  </template>
  
  <script lang="ts" setup>
  
    import {ref} from "vue";
    import NavMain from '@/components/NavMain.vue';
    import type {FormInstance, FormRules} from 'element-plus'
 
    const addFormRef = ref<FormInstance>()
    const addForm  = ref({
      pname:"",
      ptype:"",
      organization:""
    });

const rules  = ref<FormRules>({
    pname: [{required: true, message: '请输入用户名', trigger: 'blur'}],
    ptype: [{required: true, message: '请输入密码', trigger: 'blur'}],
    organization: [{required: true, message: '请输入密码', trigger: 'blur'}]
})

const ptypes = ref([ '', '核心业务部门', '支持职能部门', '管理职能部门', '战略规划部门', '专项任务部门'])

const loadingbut = ref(false);
const loadingbuttext = ref("登录");



const add = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid:any, fields:any) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const cancel = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}


  </script>
  <style lang="scss" scoped>
  .addPost {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
</style>