<template>
    <NavMain></NavMain>
    <!-- 部门查询 -->
    <div class="Dep01">
        <el-form ref="selectFormRef" :model="selectForm" style="width: 30%;"> 
        <el-form-item label="部门名称"  prop="dname">
            <el-input v-model="selectForm.dname"  placeholder="请输入部门名"></el-input>
        </el-form-item>
        <el-form-item label="部门类型" prop="dtype">
            <el-select v-model="selectForm.dtype" placeholder="请选择部门类型">
              <el-option v-for="item in dtypes"  :value="item"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="selectDepartmentsByCon">查询</el-button>
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
        <el-table-column prop="dname" label="名称"></el-table-column>
        <el-table-column prop="dtype"  label="类型"></el-table-column>
        <el-table-column prop="establishmentdate1" label="成立日期" sortable></el-table-column>
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
    <el-dialog title="部门修改" v-model="dialogVisibleDetail"  width="40%" >
   <el-form ref="detailDataRef" :model="detailData"  style="width:80%;"  label-width="40%" >
  <el-form-item label="部门名称"  prop="dname">
    <el-input v-model="detailData.dname"></el-input>
  </el-form-item>
 <el-form-item label="部门类型" prop="dtype">
    <el-select v-model="detailData.dtype">
      <el-option v-for="(item,index) in dtypes" :key="index" :label="item" :value="item"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="电话"  prop="dtel">
    <el-input v-model="detailData.dtel" ></el-input>
  </el-form-item>
  <el-form-item label="邮箱"  prop="dmail">
    <el-input v-model="detailData.dmail"></el-input>
  </el-form-item>
  <el-form-item label="描述"  prop="description">
    <el-input v-model="detailData.description" type="textarea" ></el-input>
  </el-form-item>
  <el-form-item label="上级部门" prop="supdepartment">
    <el-select v-model="detailData.supdepartment">
      <el-option v-for="(item,index) in supdepartments" :key="index" :label="item.dname" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="update(detailDataRef)">修改</el-button>
    <el-button type="danger" @click="cancel(detailDataRef)">重置</el-button>
  </el-form-item>
</el-form>
  </el-dialog>
  <!-- 详情 -->
  <el-dialog title="部门详情" v-model="dialogVisible"  width="50%" >
 <el-form ref="detailDataRef" :model="detailData" disabled  style="width:80%;"  label-width="40%" >
  <el-form-item label="部门名称"  prop="dname">
    <el-input v-model="detailData.dname"></el-input>
  </el-form-item>
 <el-form-item label="部门类型" prop="dtype">
    <el-select v-model="detailData.dtype">
      <el-option v-for="(item,index) in dtypes" :key="index" :label="item" :value="item"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="电话"  prop="dtel">
    <el-input v-model="detailData.dtel"></el-input>
  </el-form-item>
  <el-form-item label="邮箱"  prop="dmail">
    <el-input v-model="detailData.dmail"></el-input>
  </el-form-item>
  <el-form-item label="描述"  prop="description">
    <el-input v-model="detailData.description" type="textarea"></el-input>
  </el-form-item>
  <el-form-item label="上级部门" prop="supdepartment">
    <el-select v-model="detailData.supdepartment">
      <el-option v-for="(item,index) in supdepartments" :key="index" :label="item.dname" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
  </el-form>
  </el-dialog>


</template>
  
<script lang="ts" setup> 

  import {ref , inject,onMounted} from "vue";
  import NavMain from '@/components/NavMain.vue';
  import { ElMessage, ElMessageBox } from 'element-plus'
  import type {FormInstance, FormRules} from 'element-plus'
  const axios:any = inject("$axios")
  const detailDataRef =ref<FormInstance> ()
  //页码变量
  const pageSize = ref(5);
  let total = ref(5)
  const currentPage =ref(1)
   //部门
   const selectForm = ref({ currentPage: currentPage.value, pageSize: pageSize.value, act: '' ,dname:"",dtype:""})
  //弹出的对话框
  const dialogVisible = ref(false);
  const dialogVisibleDetail = ref(false);
  const detailData = ref ({
    dname:"",
    dtype:"",
    dtel:"",
    dmail:"",
    description:"",
    supdepartment:""
  });
  const supdepartments = ref([{id:"",dname:""}]);
  

  
  //部门查询
  const dtypes  = ref([ '', '核心业务部门', '支持职能部门', '管理职能部门', '战略规划部门', '专项任务部门'])
  //表格
  let tableData = ref([
   {}
  ])

    onMounted(()=>{
      loadDepartment()
    })

  const loadDepartment = ()=>{
      axios.post("/getDepartmentByPage",{
        currentPage:currentPage.value,
        pageSize:pageSize.value
      })
      .then((resp:any)=>{
        tableData.value = resp.data.departs;
        total.value = resp.data.total;
 
      })
      .catch((error:any)=>{
        alert("请求失败")
      })
  }

  // 页码
  const handleCurrentChange = (val:any)=>{
    currentPage.value=val;
    if(selectForm.value.act=="byCon"){
      selectForm.value.currentPage = currentPage.value;
      selectForm.value.pageSize = pageSize.value
      selectDepartmentsByCon()
    }else{
      loadDepartment()
    }

  }

  //部门查询
  const selectDepartmentsByCon = ()=>{
    selectForm.value.act="byCon"
      axios.post("/selectDepartmentsByCon",selectForm.value)
      .then((resp:any)=>{
        tableData.value = resp.data.departs;
        total.value = resp.data.total;
        console.log(resp)
      })
      .catch((error:any)=>{
        alert("请求失败")
      })
  }
  //头部样式
  const headClass=()=> { 
    return { textAlign: 'center',backgroundColor:"rgb(242,242,242)",color:"rgb(140,138,140)", }
  };
  //表格编辑
  const handleEdit = (index:any,row:any,act:any)=>{
    axios.post("/getDepartmentDetail?id=" + row.id)
    .then((resp:any)=>{
      detailData.value = resp.data.adepart
      supdepartments.value =resp.data.departs
    })
    .catch((error:any)=>{
      console.log(error)
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
      axios.post("/deleteDepartment?id=" + row.id)
      .then(
        (resp :any)=>{
          if(resp.data=="ok"){
            ElMessage({
            type: 'success',
            message: 'Delete completed',
          })
          loadDepartment();
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
    console.log(detailData.value)
      axios.post("/updateDepartment",detailData.value)
      .then(
        (resp:any)=>{
          if(resp.data="ok"){
            ElMessage({
            type: 'success',
            message: 'Update completed',
          })
              dialogVisibleDetail.value=false;
              loadDepartment();
          }else{
            ElMessage.error("修改失败")
            dialogVisibleDetail.value=false;
          }
        }
      )
      .catch ((error:any) => console.log("失败"))
  }
  //重置
  const cancel = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
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