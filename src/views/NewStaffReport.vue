<template>
  <NavMain></NavMain>
<!-- 部门查询 -->
<div class="Dep01">
  <el-form ref="selectFormRef" :model="selectForm" style="width:50%;"  label-width="30%"> 
    <el-row>
    <el-col :span="12">
        <el-form-item label="查询开始日期"  prop="startdate">
                <el-date-picker v-model="selectForm.startdate" type="date" placeholder="选择开始日期" style="width:100%"></el-date-picker>
        </el-form-item> 
    </el-col>
   <el-col :span="12">
        <el-form-item label="查询结束日期"  prop="enddate">
                <el-date-picker v-model="selectForm.enddate" type="date" placeholder="选择结束日期" style="width:100%"></el-date-picker>
        </el-form-item>  
    </el-col>
  </el-row>
  <el-row>
   <el-col :span="20">
        <el-form-item>
            <el-button type="primary" @click="selectNewStaffReportByCon">查询</el-button>
        </el-form-item>
    </el-col>
  </el-row>
  </el-form>
</div>
<!-- 表格信息展示 -->
<div class="Dep02">
  <el-table
    :data="tableData"  :header-cell-style="headClass" 
     :cell-style="{ textAlign: 'center' }"
    :default-sort = "{prop: 'id', order: 'descending'}">
    <el-table-column prop="id" label="ID" min-width="1" sortable></el-table-column>
    <el-table-column prop="sname" label="员工名称" min-width="1" ></el-table-column>
    <el-table-column prop="sex" label="性别" min-width="1" ></el-table-column>
    <el-table-column prop="dname"  label="所在部门" min-width="1"></el-table-column>
    <el-table-column prop="pname"  label="岗位名称" min-width="1"></el-table-column>
    <el-table-column prop="entrydate" label="入职日期"  min-width="1" sortable></el-table-column>
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


</template>

<script lang="ts" setup>
import NavMain from '@/components/NavMain.vue';
import {ref,inject,onMounted} from "vue";
import type {FormInstance,FormRules} from "element-plus"
import  {ElMessage} from "element-plus"

const axios:any = inject ("$axios");




//页码变量
const pageSize = ref(3);
const total = ref(5)
const currentPage =ref(1)

const selectFormRef =ref<FormInstance> ()
const selectForm = ref({
  currentPage:1,
  pageSize:pageSize.value,
  act:""
});
const tableData = ref([ {} ]);

onMounted(()=>{
  loadNewStaffReport();
})
const loadNewStaffReport =()=>{
    axios
          .post('/getNewStaffReport?currentPage',{
            currentPage:currentPage.value,
            pageSize:pageSize.value
          })
          .then((successResponse:any) => {
            console.log(successResponse.data)
              tableData.value = successResponse.data.newStaffReports
              total.value = successResponse.data.total
          })
          .catch((failResponse:any) => {
            ElMessage.error("首次请求失败")
          })
}


// 页码
const handleCurrentChange = (val:any)=>{
  currentPage.value = val;
    if(selectForm.value.act=="byCon"){

      selectForm.value.currentPage = currentPage.value;
      selectForm.value.pageSize = pageSize.value;
      selectNewStaffReportByCon();

    }else{
      loadNewStaffReport();
    }
}

//头部样式
const headClass=()=> { 
  return { textAlign: 'center',backgroundColor:"rgb(242,242,242)",color:"rgb(140,138,140)", }
};
const selectNewStaffReportByCon = ()=>{ 

  selectForm.value.act="byCon"
    axios.post("/selectQuitsByCon",selectForm.value)
    .then((resp:any)=>{
      tableData.value = resp.data.quits
      total.value = resp.data.total
    })
    .catch((error:any)=>{
        ElMessage.error("查询失败")
    })
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