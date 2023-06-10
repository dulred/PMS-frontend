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
      <el-button type="primary" @click="update(detailData)" :loading="loadingbut" >{{loadingbuttext}}</el-button>
      <el-button type="danger" @click="cancel">重置</el-button>
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

import {ref , inject} from "vue";
import NavMain from '@/components/NavMain.vue';
const axios:any = inject("$axios")
//部门
const selectForm = ref({ currentPage: 1, pageSize: 1, act: '' ,pname:"",ptype:""})
//页码变量
const pageSize = ref(3);
const total = ref(5);
const currentPage =ref(1);
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

//部门查询
const ptypes  = ref([ '', '核心业务部门', '支持职能部门', '管理职能部门', '战略规划部门', '专项任务部门'])
//表格
const tableData = ref([
  {
    id:"1",
    pname:"nishizhu",
    ptype:"工厂",
    organization:"3"
  },
  {
    id:"2",
    pname:"cc",
    ptype:"工厂",
    organization:"3"
  },
  {
    id:"3",
    pname:"cc1",
    ptype:"工厂",
    organization:"3"
  },
  {
    id:"4",
    pname:"cc2",
    ptype:"工厂",
    organization:"3"
  },
  {
    id:"5",
    pname:"cc1",
    ptype:"工厂",
    organization:"3"
  },
  {
    id:"6",
    pname:"cc2",
    ptype:"工厂",
    organization:"3"
  },
])


// 页码
const handleCurrentChange = ()=>{
  console.log("nishizhu")
}

//部门查询
const selectPostsByCon = ()=>{
  console.log("nishizhu")
}
//头部样式
const headClass=()=> { 
  return { textAlign: 'center',backgroundColor:"rgb(242,242,242)",color:"rgb(140,138,140)", }
};
//表格编辑
const handleEdit = (index:any,row:any,act:any)=>{
  if(act === 'update')
      dialogVisibleDetail.value = true
    else
      dialogVisible.value = true
}
//表格删除
const handleDelete = (index:any,row:any)=>{
  console.log("nishizhu")
}

//更新
const update = (detailData : any)=>{
    console.log("nishizhu")
}
//删除
const cancel = ()=>{
  console.log("nishizhu")
}






</script>

<style lang="scss" scoped>
  .Dep01  {
    margin-top: 30px;
    display: flex;justify-content: center;
    .el-form {margin: auto;}
    }
    .pagination {margin-top: 20px;}

</style>