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
                    <el-option v-for="item in ptypes"   :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="编制人数" prop="organization">
                <el-input v-model="addForm.organization" aria-placeholder="请输入编制人数">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="add(addFormRef)" :loading="loadingbut" >{{loadingbuttext}}</el-button>
                <el-button type="danger" @click="cancel(addFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
 

  </template>
  
  <script lang="ts" setup>
  
    import {ref,inject} from "vue";
    import NavMain from '@/components/NavMain.vue';
    import type {FormInstance, FormRules} from 'element-plus'
    import {ElMessage} from "element-plus";
    import {useRouter} from "vue-router"

    const axios:any = inject("$axios");
    const router = useRouter();
    const addFormRef = ref<FormInstance>()
    const addForm  = ref({
      pname:"",
      ptype:"",
      organization:""
    });

const rules  = ref<FormRules>({
  pname: [{required: true, message: '请输入岗位名称', trigger: 'blur'}],
  ptype: [{ required: true, message: '请选择岗位类型', trigger: 'change' }]
})

const ptypes = ref([ '', '管理岗', '行政岗', '技术岗', '产品岗', '市场岗','财务岗','商务岗','审计岗','研发岗','法务岗','项目岗'])

const loadingbut = ref(false);
const loadingbuttext = ref("添加");



const add = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid:any, fields:any) => {
    if (valid) {
      loadingbut.value = true;
      loadingbuttext.value = '添加中...';
      axios.post("/addPost",addForm.value)
      .then((resp:any)=>{
          if(resp.data == "ok"){
            ElMessage({
              message :"恭喜您，您已经成功插入",
              type:"success",
              showClose:true,
            })
            
            router.replace({path:"/post"})

          }else{
            ElMessage.error("插入失败，请检查数据")
            loadingbut.value = false;
            loadingbuttext.value = '添加';
          }
      })
      .catch((error:any)=>{
        ElMessage.error("服务器错误或者网络错误")
      })

      
    } else {
      ElMessage.error("验证失败，请检查数据")
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