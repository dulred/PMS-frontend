<template>
  <NavMain></NavMain>
<!-- 部门查询 -->
<div class="Dep01">
  <el-form ref="selectFormRef" :model="selectForm" style="width:50%;"  label-width="30%"> 
    <el-row>
    <el-col :span="12">
        <el-form-item label="员工编号"  prop="staff_id">
            <el-input v-model="selectForm.staff_id"  placeholder="请输入员工编号"></el-input>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="员工姓名"  prop="sname">
            <el-input v-model="selectForm.sname"  placeholder="请输入员工姓名"></el-input>
        </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="12">
        <el-form-item label="调动类型"  prop="ttype">
            <el-select v-model="selectForm.ttype" placeholder="请选择调动类型">
                <el-option v-for="(item,index) in ttypes" :key="index" :label="item" :value="item"></el-option>
            </el-select>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="查询开始日期"  prop="startdate">
                <el-date-picker v-model="selectForm.startdate" type="date" placeholder="选择开始日期" style="width:100%"></el-date-picker>
        </el-form-item> 
    </el-col>
  </el-row>
  <el-row>
   <el-col :span="12">
        <el-form-item label="查询结束日期"  prop="enddate">
                <el-date-picker v-model="selectForm.enddate" type="date" placeholder="选择结束日期" style="width:100%"></el-date-picker>
        </el-form-item>  
    </el-col>
   <el-col :span="8">
        <el-form-item>
            <el-button type="primary" @click="selectTransfersByCon">查询</el-button>
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
    :default-sort = "{prop: 'staff_id', order: 'descending'}">
    <el-table-column prop="staff_id" label="员工编号"  sortable></el-table-column>
    <el-table-column prop="sname" label="员工名称"></el-table-column>
    <el-table-column prop="ttype"  label="调动类型"></el-table-column>
    <el-table-column prop="beforepost_name"  label="调动前岗位"></el-table-column>
    <el-table-column prop="afterpost_name"  label="调动后岗位"></el-table-column>
    <el-table-column prop="tdate1" label="调动时间" sortable></el-table-column>
    <el-table-column prop="opdate1" label="操作时间" sortable></el-table-column>
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

const axios:any = inject("$axios");


const selectFormRef =ref<FormInstance> ()
//页码变量
const pageSize = ref(5);
const total = ref(5)
const currentPage =ref(1)

const selectForm = ref({
  act:"",
  currentPage:1,
  pageSize:pageSize.value
});
const tableData = ref([ {} ]);




const ttypes = ref ([ "升职","降职","数据录入错误"] )

onMounted(()=>{
  loadTransfer();
})

const loadTransfer = ()=>{
    axios.post("/getTransferByPage",{
      currentPage:currentPage.value,
      pageSize:pageSize.value
    })
    .then((resp:any)=>{
        tableData.value = resp.data.transfers;
        total.value  = resp.data.total;
    })
    .catch((error:any)=>{
      ElMessage.eror("首次加载数据错误")
    })
}

// 页码
const handleCurrentChange = (val:any)=>{
  currentPage.value = val;
  if(selectForm.value.act=="byCon"){
    selectForm.value.currentPage = currentPage.value;
    selectForm.value.pageSize = pageSize.value;
    selectTransfersByCon();
  }else{
    loadTransfer();
  }
  
}

//头部样式
const headClass=()=> { 
  return { textAlign: 'center',backgroundColor:"rgb(242,242,242)",color:"rgb(140,138,140)", }
};
const selectTransfersByCon = ()=>{ 
    selectForm.value.act= "byCon"
    axios.post("/selectTransfersByCon",selectForm.value)
    .then((resp:any)=>{
        tableData.value  = resp.data.transfers;
        total.value = resp.data.total;
        ElMessage({
          message:"查询成功",
          type:"success"
        })
    })
    .catch((error:any)=>{
        ElMessage.error("查询失败，请检查请求网络")
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