<template>
    <NavMain></NavMain>
  <!-- 部门查询 -->
  <div class="Dep01">
    <el-form ref="selectFormRef" :model="selectForm" style="width:40%;"  label-width="30%"> 
      <el-row>
        <el-col :span="12">
          <el-form-item label="员工姓名"  prop="sname">
            <el-input v-model="selectForm.sname"  placeholder="请输入员工姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门名称" prop="depart_id">
            <el-select v-model="selectForm.depart_id" placeholder="请选择部门">
              <el-option v-for="(item,index) in departments" :key="index" :label="item.dname" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="岗位名称"  prop="post_id">
            <el-select v-model="selectForm.post_id"  placeholder="请选择岗位">
                <el-option v-for="(item,index) in posts" :key="index" :label="item.pname" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="试用期状态" prop="status">
            <el-select v-model="selectForm.status" placeholder="请选择状态">
              <el-option v-for="(item,index) in status" :key="index" :label="item" :value="item"></el-option>
            </el-select>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="开始日期"  prop="startdate">
            <el-date-picker v-model="selectForm.startdate"  placeholder="选择开始日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束日期"  prop="enddate">
            <el-date-picker v-model="selectForm.enddate"  placeholder="选择结束日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item>
          <el-button type="primary" @click="selectPeriodByCon">查询</el-button>
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
    <el-table-column prop="dname"  label="所在部门" min-width="1"></el-table-column>
    <el-table-column prop="pname"  label="岗位名称" min-width="1"></el-table-column>
    <el-table-column prop="status"  label="状态" min-width="1"></el-table-column>
    <el-table-column prop="startdate1" label="试用期开始日期" min-width="1" sortable></el-table-column>
    <el-table-column prop="enddate1" label="试用期结束日期" min-width="1" sortable></el-table-column>
    <el-table-column label="操作" min-width="2">
      <template #default="scope">
        <el-button
          size="mini"  type="success" v-if="scope.row.status=='正常'"
          @click="handleEdit(scope.$index, scope.row, '转正')">转正</el-button>
       <el-button
          size="mini" type="primary" v-if="scope.row.status=='正常'"
          @click="handleEdit(scope.$index, scope.row, '延期')">延期</el-button>
        <el-button size="mini" type="danger" v-if="scope.row.status=='正常'"
          @click="handleEdit(scope.$index, scope.row, '不录用')">不录用</el-button>
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


  </template>
  
  <script lang="ts" setup>
  import NavMain from '@/components/NavMain.vue';
  import {ref} from "vue";
  import type {FormInstance,FormRules} from "element-plus"
  const loadingbut = ref(false);
  const loadingbuttext = "修改"
  const selectFormRef =ref<FormInstance> ()
  const selectForm = ref({});
  const tableData = ref([ {} ]);
  const dialogVisibleDetail = ref(false)
  const dialogVisible = ref(false)

  //页码变量
  const pageSize = ref(3);
  const total = ref(5)
  const currentPage =ref(1)


  const addFormRef =ref<FormInstance> ()
    const addForm = ref({ })

    const rules = ref<FormRules>({
      sname:[{required:true,message:"请输入用户名",trigger:"blur"}],
      sex:[{required:true,message:"请选择性别",trigger:"change"}],
      birthday:[{required:true,message:"请选择出生日期",trigger:"change"}],
      sid:[{required:true,message:"输入身份证号",trigger:"blur"}],
      post_id:[{required:true,message:"请选择部门",trigger:"change"}],
      depart_id:[{required:true,message:"请选择岗位",trigger:"change"}],
      entrydate:[{required:true,message:"请选择入职日期",trigger:"change"}],
      joinworkdate:[{required:true,message:"请选择参加工作日期",trigger:"change"}],
      workform:[{required:true,message:"请选择用工形式",trigger:"change"}],
      staffsource: [{ required: true, message: '请选择人员来源', trigger: 'change' }],
    })

    const departments = ref([
      { id:"1",dname:"战略规划部门" },
      { id:"2",dname:"行政部门" },
      { id:"3",dname:"技术部门" },
      { id:"4",dname:"产品部门" },
      { id:"5",dname:"市场部门" },
      { id:"6",dname:"财务部门" },
      { id:"7",dname:"商务部门" },
      { id:"8",dname:"审计部门" },
      { id:"9",dname:"研究院/实验室" },
      { id:"10",dname:"法务部门" },
      { id:"11",dname:"项目组" },
    ])

    const posts =  ref([
      { id:"1",pname:"系统架构师" },
      { id:"2",pname:"全栈工程师" },
      { id:"3",pname:"后端工程师" },
      { id:"4",pname:"前端工程师" },
      { id:"5",pname:"测试工程师" },
      { id:"6",pname:"运维工程师" },
    ])


const status = ref(["正常","转正","延期","不录用"]);


  // 页码
  const handleCurrentChange = ()=>{
    console.log("nishizhu")
  }

  //头部样式
  const headClass=()=> { 
    return { textAlign: 'center',backgroundColor:"rgb(242,242,242)",color:"rgb(140,138,140)", }
  };
  const selectPeriodByCon = ()=>{ }
  //表格编辑
  const handleEdit = (index:any,row:any,act:any)=>{
    if(act === 'update')
        dialogVisibleDetail.value = true
      else
        dialogVisible.value = true
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