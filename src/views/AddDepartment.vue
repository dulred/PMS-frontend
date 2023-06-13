<template>
    <NavMain></NavMain>
  <div class="box">
   <el-form ref="addFormRef" :model="addForm" :rules="rules"  style="width:30%;"  >
  <el-form-item label="部门名称"  prop="dname">
    <el-input v-model="addForm.dname"  placeholder="请输入部门名"></el-input>
  </el-form-item>
 <el-form-item label="部门类型" prop="dtype">
    <el-select v-model="addForm.dtype" placeholder="请选择部门类型">
      <el-option v-for="(item) in dtypes"  :value="item"></el-option>
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
      <el-option v-for="(item) in supdepartments"  :label="item.dname" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="add(addFormRef)" :loading="loadingbut" > {{loadingbuttext}} </el-button>
    <el-button type="danger" @click="cancel(addFormRef)">重置</el-button>
  </el-form-item>
</el-form>
 </div>

  </template>
  
  <script lang="ts" setup>
    import NavMain from '@/components/NavMain.vue';
  import {ref,onMounted,inject} from "vue";
  import type {FormInstance, FormRules} from 'element-plus'
  import  { ElMessage} from 'element-plus'
  import { useRouter } from 'vue-router'
  const axios:any = inject("$axios");
  const router = useRouter();
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
const addFormRef =ref<FormInstance> ()
const loadingbut = ref(false);
const loadingbuttext = ref("新增");
const rules  = ref<FormRules>({
         dname: [{required: true, message: '请输入部门名称', trigger: 'blur'}],
          dtype: [{required: true, message: '请选择部门类型', trigger: 'change'}]
})



onMounted(()=>{
  loadSupdepartment()
  test()
}
)

const loadSupdepartment = ()=>{
      axios
          .get('/getDepartment')
          .then((successResponse:any)=> {
            supdepartments.value = successResponse.data;
          })
          .catch((failResponse:any) => {
              alert("失败了")
          })
}

const test = ()=>{
  axios.get("test").then((resp :any)=>{
      console.log(resp);
  }).catch ((error :any )=>{
    alert("你失败了。")
  })
}

const add = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid:any, fields:any) => {
    if (valid) {
            loadingbut.value = true;
            loadingbuttext.value = '添加中...';
            axios.post ("/addDepartment",addForm.value)
            .then ((resp : any)=>{

              if(resp.data=="ok"){
                ElMessage({
                  message: '恭喜您，您已经成功插入',
                  type: 'success',
                  showClose: true,
                })
                router.replace({path:  '/department'})
              }else{
                ElMessage.error('插入失败了')
                loadingbut.value = false;
                loadingbuttext.value = '新增'
              }
              console.log(addForm.value)
              console.log(resp)
            })
            .catch((error:any )=>{
              ElMessage.error('用户名或密码错误,请您重新输入')
              loadingbut.value = false;
              loadingbuttext.value = '新增'
            })
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
      .box  { margin-top: 30px; display: flex;justify-content: center;}
</style>