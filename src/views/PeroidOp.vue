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
  import {ref,inject,onMounted} from "vue";
  import type {FormInstance, FormRules} from 'element-plus'
  import {ElMessage,ElMessageBox} from "element-plus";

  const axios:any = inject("$axios")
  
  const loadingbut = ref(false);
  const loadingbuttext = "修改"
  const selectFormRef =ref<FormInstance> ()
  const selectForm = ref({
    act:"",
    currentPage:1,
    pageSize:5,
  });
  const tableData = ref([ {} ]);
  const dialogVisibleDetail = ref(false)
  const dialogVisible = ref(false)

  //页码变量
  const pageSize = ref(5);
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

const departments = ref([{}])

const posts =  ref([{}])

const status = ref(["正常","转正","延期","不录用"]);

onMounted(()=>{
  loadDepartment();
  loadPost();
  loadPeriods();
})
const loadPeriods = ()=>{
    axios.post("/selectPeriodStaff",{
      currentPage : currentPage.value,
      pageSize:pageSize.value
    })
    .then(
      (resp:any)=>{
        tableData.value = resp.data.staffs;
        total.value  = resp.data.total
      }
    )
    .catch((error:any)=>{
      console.log("首次加载数据失败")
    })
}
const loadDepartment = ()=>{ 
    axios.get("/getDepartment")
    .then((resp:any)=>{
        departments.value = resp.data;
    })
    .catch((error:any)=>{
        console.log("首次加载Department数据失败")
    })
}

const loadPost = ()=>{ 
    axios.get("/getPost")
    .then((resp:any)=>{
        posts.value = resp.data;
    })
    .catch((error:any)=>{
        console.log("首次加载Post数据失败")
    })
}



  // 页码
  const handleCurrentChange = (val:any)=>{
    currentPage.value = val
    if(selectForm.value.act=="byCon"){
        selectForm.value.currentPage = currentPage.value;
        selectForm.value.pageSize = pageSize.value;
        selectPeriodByCon();
    }else{
      loadPeriods();
    }
  
  }

  //头部样式
  const headClass=()=> { 
    return { textAlign: 'center',backgroundColor:"rgb(242,242,242)",color:"rgb(140,138,140)", }
  };
  const selectPeriodByCon = ()=>{
    console.log(selectForm.value)
      axios.post("/selectPeriodStaffCon",selectForm.value)
      .then((resp :any)=>{
          ElMessage({
            message:"查询成功",
            type:"success"
          })
          tableData.value = resp.data.staffs;
          total.value = resp.data.total;
      })
      .catch((error:any)=>{
        ElMessage.error("查询失败")
      })
   }
  //表格编辑
  const handleEdit = (index:any,row:any,status:any)=>{
    axios.get("/periodOp?id=" + row.id + "&& status ="+ status)
    .then((resp:any)=>{
      if(resp.data=="ok"){
        ElMessage({
          message:"修改成功",
          type:"success"
        })
        loadPeriods();
      }else{
        ElMessage.error("修改失败")
      }
    })
    .catch((error:any)=>{
      ElMessage.error("请求错误")
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