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
        <el-form-item label="离职类型"  prop="qtype">
            <el-select v-model="selectForm.ttype" placeholder="请选择离职类型">
                <el-option v-for="(item,index) in qtypes" :key="index" :label="item" :value="item"></el-option>
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
            <el-button type="primary" @click="selectQuitsByCon">查询</el-button>
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
    <el-table-column prop="qtype"  label="离职类型"></el-table-column>
    <el-table-column prop="qdate1" label="离职时间" sortable></el-table-column>
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
import {ref} from "vue";
import type {FormInstance,FormRules} from "element-plus"

const selectFormRef =ref<FormInstance> ()
const selectForm = ref({});
const tableData = ref([ {} ]);


//页码变量
const pageSize = ref(3);
const total = ref(5)
const currentPage =ref(1)

const qtypes = ref ( ["辞职","辞退","退休","开除","不录用"] )

// 页码
const handleCurrentChange = ()=>{
  console.log("nishizhu")
}

//头部样式
const headClass=()=> { 
  return { textAlign: 'center',backgroundColor:"rgb(242,242,242)",color:"rgb(140,138,140)", }
};
const selectQuitsByCon = ()=>{ }



</script>

<style lang="scss" scoped>
.Dep01  {
margin-top: 30px;
display: flex;justify-content: center;
.el-form {margin: auto;}
}
.pagination {margin-top: 20px;}

</style>