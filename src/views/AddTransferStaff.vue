<template>
  <el-container>
    <el-header>
      <NavMain></NavMain>
    </el-header>
    <el-main>
      <el-form ref="addFormRef" :model="addForm" :rules="rules" style="width:30%;"  label-width="30%" >
    <el-input v-model="addForm.beforepost_id" type="hidden"></el-input>
    <el-form-item label="员工编号"  prop="staff_id">
      <el-input v-model="addForm.staff_id"  placeholder="请输入员工编号" @blur="getBeforePost"></el-input>
    </el-form-item>
    <el-form-item label="员工姓名"  prop="sname">
      <el-input v-model="addForm.sname" disabled></el-input>
    </el-form-item>
    <el-form-item label="之前岗位"  prop="beforepost_name">
      <el-input v-model="addForm.beforepost_name" disabled></el-input>
    </el-form-item>
    <el-form-item label="调动后岗位" prop="afterpost_id">
      <el-select v-model="addForm.afterpost_id" placeholder="请选择岗位类型">
        <el-option v-for="(item,index) in posts" :key="index" :label="item.pname" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="调动类型" prop="ttype">
      <el-select v-model="addForm.ttype" placeholder="请选择调动类型">
        <el-option v-for="(item,index) in ttypes" :key="index" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="调动日期"  prop="tdate">
      <el-date-picker v-model="addForm.tdate" type="date" placeholder="选择调动日期" style="width:100%"></el-date-picker>
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
  const router = useRouter()
  const axios:any = inject("$axios")
  const loadingbut = ref(false);  
  const loadingbuttext = ref("添加")
  const addFormRef =ref<FormInstance> ()
  const addForm = ref({ 
    staff_id:"",
    beforepost_id:"",
    sname:"",
    beforepost_name:""
  })

  const rules = ref<FormRules>({
           staff_id: [{required: true, message: '请输入员工编号', trigger: 'blur'}],
          afterpost_id: [{ required: true, message: '请选择调动后岗位', trigger: 'change' }],
          ttype: [{ required: true, message: '请选择调动类型', trigger: 'change' }],
          tdate: [{ required: true, message: '请选择调动日期', trigger: 'change' }] 
  })

  const ttypes = ref ([ "升职","降职","数据录入错误"] )

  const posts =  ref([ ])

onMounted(()=>{
  loadPost();
})

  const loadPost = ()=>{ 
    axios.get("/getPost")
    .then((resp:any)=>{
        posts.value = resp.data;
    })
    .catch((error:any)=>{
        console.log("首次加载Post数据失败")
    })
}

const add = async (formEl: FormInstance | undefined) => {
if (!formEl) return
await formEl.validate((valid:any, fields:any) => {
  if (valid) {
    loadingbut.value = true;
    loadingbuttext.value = '添加中...';
    axios.post("/addTransferStaff",addForm.value)
    .then ((resp:any)=>{
      if(resp.data=="ok")
      {
        ElMessage({
          message:"添加成功",
          type:"success"
        })
        router.replace({path:"/transferStaff"})
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
    addForm.value.beforepost_id = resp.data.beforepost_id;
    addForm.value.sname = resp.data.sname;
    addForm.value.beforepost_name = resp.data.beforepost_name;
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