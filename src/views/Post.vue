<template>
  <NavMain></NavMain>
  <!-- 部门查询 -->
  <div class="Dep01">
      <el-form ref="selectFormRef" :model="selectForm" style="width: 30%;"> 
      <el-form-item label="岗位名称"  prop="pname">
          <el-input v-model="selectForm.pname"  placeholder="请输入岗位名称"></el-input>
      </el-form-item>
      <el-form-item label="岗位类型" prop="dtype">
          <el-select v-model="selectForm.ptype" placeholder="请选择岗位类型">
            <el-option v-for="item in ptypes"  :value="item"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="selectPostsByCon">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- 表格信息展示 -->
  <div class="Dep02">
    <el-table
      :data="tableData"  :header-cell-style="headClass"
      :cell-style="{ textAlign: 'center' }"
      :default-sort = "{prop: 'id', order: 'descending'}">
      <el-table-column prop="id" label="ID" sortable></el-table-column>
      <el-table-column prop="pname" label="名称"></el-table-column>
      <el-table-column prop="ptype"  label="类型"></el-table-column>
      <el-table-column prop="organization" label="人数" sortable></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="mini"  type="success"
            @click="handleEdit(scope.$index, scope.row, 'update')">编辑</el-button>
        <el-button
            size="mini" type="primary"
            @click="handleEdit(scope.$index, scope.row, 'detail')">详情</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 页码 -->
  <div class="pagination">
  <el-pagination
    @current-change="handleCurrentChange"
    v-model:currentPage="currentPage"
    :page-size="pageSize"
    layout="total, prev, pager, next"
    :total="total" background>
  </el-pagination>
  </div>
  <!-- 修改 -->
      <el-dialog title="岗位修改" v-model="dialogVisibleDetail"  width="40%" >
    <el-form ref="detailDataRef" :model="detailData"  style="width:80%;"  label-width="40%" >
    <el-form-item label="岗位名称"  prop="pname">
      <el-input v-model="detailData.pname" placeholder="请输入岗位名称"></el-input>
    </el-form-item>
    <el-form-item label="岗位类型" prop="ptype">
      <el-select v-model="detailData.ptype" placeholder="请选择岗位类型">
        <el-option v-for="(item,index) in ptypes"  :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="编制人数"  prop="organization">
      <el-input v-model="detailData.organization" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="update(detailDataRef)" :loading="loadingbut" >{{loadingbuttext}}</el-button>
      <el-button type="danger" @click="cancel(detailDataRef)">重置</el-button>
    </el-form-item>
    </el-form>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog title="岗位详情" v-model="dialogVisible"  width="50%" >
    <el-form ref="detailDataRef" :model="detailData" disabled  style="width:80%;"  label-width="40%" >
    <el-form-item label="岗位名称"  prop="pname">
      <el-input v-model="detailData.pname"></el-input>
    </el-form-item>
    <el-form-item label="岗位类型" prop="ptype">
      <el-select v-model="detailData.ptype">
        <el-option v-for="(item,index) in ptypes"  :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="编制人数"  prop="organization">
      <el-input v-model="detailData.organization"></el-input>
    </el-form-item>

    </el-form>
    </el-dialog>


</template>

<script lang="ts" setup> 

import {ref , inject, onMounted} from "vue";
import NavMain from '@/components/NavMain.vue';
import type {FormInstance, FormRules} from 'element-plus'
import {ElMessage,ElMessageBox} from "element-plus";
const axios:any = inject("$axios")

//页码变量
const pageSize = ref(5);
const total = ref(5);
const currentPage =ref(1);
//部门
const selectForm = ref({ currentPage: 1, pageSize: pageSize.value, act: '' ,pname:"",ptype:""})
//弹出的对话框
const dialogVisibleDetail = ref(false);
const dialogVisible = ref(false);
const detailData = ref ({
  pname:"",
  ptype:"",
  organization:"",
});

// loading的变量 
const loadingbut = ref(false);
const loadingbuttext = ref("修改")
const selectFormRef =ref<FormInstance> ()
const detailDataRef = ref<FormInstance>()
//部门查询
const ptypes = ref([ '', '管理岗', '行政岗', '技术岗', '产品岗', '市场岗','财务岗','商务岗','审计岗','研发岗','法务岗','项目岗'])
//表格
const tableData = ref([])

// 页面挂载后自动加载数据
onMounted(()=>{
    loadPosts();
})

const loadPosts = ()=>{
  axios.post("/getPostByPage",{
    currentPage:currentPage.value,
    pageSize:pageSize.value
  })
  .then((resp :any)=>{
      tableData.value = resp.data.posts;
      total.value = resp.data.total;
  })
  .catch((error :any)=>{
    ElMessage.error("请求首次数据失败")
  }
  )
}

// 页码变换
const handleCurrentChange = (val:any)=>{
  currentPage.value = val;
  if(selectForm.value.act=="byCon"){
      selectForm.value.currentPage = currentPage.value;
      selectForm.value.pageSize = pageSize.value;
      selectPostsByCon();
  }else{
    loadPosts();
  }
 
}

//部门查询
const selectPostsByCon = ()=>{
    selectForm.value.act="byCon"
    axios.post("/getPostByCon",selectForm.value)
    .then((resp:any)=>{
        tableData.value = resp.data.posts,
        total.value = resp.data.total
        ElMessage({
          message:"查询成功",
          type:"success",
          showClose:true
        })
    })
    .catch((error:any)=>{
        ElMessage.error("查询失败")
    })
}
//头部样式
const headClass=()=> { 
  return { textAlign: 'center',backgroundColor:"rgb(242,242,242)",color:"rgb(140,138,140)", }
};
//表格编辑
const handleEdit = (index:any,row:any,act:any)=>{
  axios.post("/getPostDetail?id=" + row.id)
  .then((resp:any)=>{
      detailData.value = resp.data;
  })
  .catch((error:any)=>{
    ElMessage.error("请求数据失败")
  })
  if(act === 'update')
      dialogVisibleDetail.value = true
    else
      dialogVisible.value = true
}
//表格删除
const handleDelete = (index:any,row:any)=>{

  ElMessageBox.confirm(
    'proxy will permanently delete the file. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      axios.post("/deletePost?id=" + row.id)
      .then(
        (resp :any)=>{
          if(resp.data=="ok"){
            ElMessage({
            type: 'success',
            message: 'Delete completed',
          })
          loadPosts();
          }else{
            ElMessage.error('不能删除有关联数据')
          }
  
        }
      )
      .catch((failResponse :any) => {
          ElMessage.error('删除失败,可能传入数据有误')
        })
     
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })



}

//更新
const update = (detailDataRef : any)=>{
    loadingbut.value = true;
    loadingbuttext.value ="修改中..."
    axios.post("/updatePost",detailData.value)
    .then((resp:any)=>{
        if(resp.data=="ok"){
            ElMessage({
              message:"修改成功",
              type:"success",
            })
            dialogVisibleDetail.value=false;
            loadPosts();
        }else{
          ElMessage.error("修改失败");
          dialogVisibleDetail.value=false;
        }
        loadingbut.value = false;
        loadingbuttext.value ="修改"
    })
    .catch((error:any)=>{
      ElMessage.error("请求失败");
    })
}
//重置
const cancel = (formEl:FormInstance | undefined)=>{
  if(!formEl) return
  formEl.resetFields();
}







</script>

<style lang="scss" scoped>
  .Dep01  {
    margin-top: 30px;
    display: flex;justify-content: center;
    .el-form {margin: auto;}
    }
    .pagination {margin-top: 20px;display: flex;
    justify-content: center; align-items: center;}

</style>