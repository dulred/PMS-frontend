<template>
  <el-container>
    <el-header>
      <NavMain></NavMain>
    </el-header>
    <el-main>
      <el-form ref="addFormRef" :model="addForm" :rules="rules" style="width:30%;"  label-width="30%" >
        <el-form-item label="员工编号"  prop="staff_id">
      <el-input v-model="addForm.staff_id"  placeholder="请输入员工编号" @blur="getBeforePost"></el-input>
    </el-form-item>
    <el-form-item label="员工姓名"  prop="sname">
      <el-input v-model="addForm.sname" disabled></el-input>
    </el-form-item>
    <el-form-item label="离职类型" prop="qtype">
      <el-select v-model="addForm.qtype" placeholder="请选择离职类型">
        <el-option v-for="(item,index) in qtypes" :key="index" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="离职日期"  prop="qdate">
      <el-date-picker v-model="addForm.qdate" type="date" placeholder="选择离职日期" style="width:100%"></el-date-picker>
    </el-form-item>  
    <el-form-item>
      <el-button type="primary" @click="add(addFormRef)" :loading="loadingbut">{{loadingbuttext}}</el-button>
      <el-button type="danger" @click="cancel(addFormRef)">重置</el-button>
    </el-form-item>
</el-form>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
    import {ref,onMounted,inject} from "vue";
    import NavMain from '@/components/NavMain.vue';
    import type {FormInstance,FormRules} from "element-plus"
    import { useRouter } from "vue-router";
    import { ElMessage } from "element-plus";
    const axios:any = inject("$axios")
    const router  = useRouter();
    const loadingbut = ref(false);
    const loadingbuttext = ref("提交") 
    const addFormRef =ref<FormInstance> ()
    const addForm = ref({
      staff_id:"",
      sname:""
     })

  const rules = ref<FormRules>({
          staff_id: [{required: true, message: '请输入员工编号', trigger: 'blur'}],
          sname: [{ required: true, message: '请选择调动后岗位', trigger: 'change' }],
          qtype: [{ required: true, message: '请选择调动类型', trigger: 'change' }],
          qdate: [{ required: true, message: '请选择调动日期', trigger: 'change' }]
  })

  const qtypes = ref ( ["辞职","辞退","退休","开除","不录用"] )

const add = async (formEl: FormInstance | undefined) => {
if (!formEl) return
await formEl.validate((valid:any, fields:any) => {
  if (valid) {
    loadingbut.value = true;
    loadingbuttext.value = '添加中...';
    axios.post("/addQuit",addForm.value)
    .then ((resp:any)=>{
      if(resp.data=="ok")
      {
        ElMessage({
          message:"添加成功",
          type:"success"
        })
        router.replace({path:"/quit"})
      }else{
        ElMessage.error("请检查数据是否正确合法")
      }
    })
    .catch((error:any)=>{
        ElMessage.error("添加失败，请检查网络")
    })
  } else {
    ElMessage.error("数据验证失败，请检查数据格式和要求")
  }
})
}

const cancel = (formEl: FormInstance | undefined) => {
if (!formEl) return
formEl.resetFields()
}

const getBeforePost = ()=>{
  axios.get("/getBeforePost?id=" + addForm.value.staff_id)
  .then((resp:any)=>{
    console.log(resp)
    addForm.value.sname = resp.data.sname;
  })
  .catch((error:any)=>{
    ElMessage.error("获取员工信息失败")
  })
}


  


</script>
<style>
.el-header {height: auto;}
.el-form {margin: auto;}
</style>