<template>
    <el-container>
      <el-header>
        <NavMain></NavMain>
      </el-header>
      <el-main>
          <el-form ref="addFormRef" :model="addForm" :rules="rules" label-width="30%">
            <el-row>
                 <el-col :span="8">
                    <el-form-item label="姓名" prop="sname">
                        <el-input v-model="addForm.sname" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                 </el-col>
                 <el-col :span="8">
                    <el-form-item label="性别" prop="sex">
                          <el-radio v-model="addForm.sex" label="男"></el-radio>
                          <el-radio v-model="addForm.sex" label="女"></el-radio>
                    </el-form-item>
                 </el-col>
                 <el-col :span="8">
                    <el-form-item label="出生日期" prop="birthday">
                        <el-date-picker v-model="addForm.birthday" placeholder="请选择出生日期"></el-date-picker>
                    </el-form-item>
                 </el-col>
            </el-row>
            <el-row>
                 <el-col :span="8">
                    <el-form-item label="身份证号" prop="sid">
                        <el-input v-model="addForm.sid" placeholder="请输入身份证号"></el-input>
                    </el-form-item>
                 </el-col>
                 <el-col :span="8">
                    <el-form-item label="部门" prop="depart_id">
                        <el-select v-model="addForm.depart_id" placeholder="请选择部门">
                            <el-option v-for="item in departments" :label="item.dname" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                 </el-col>
                 <el-col :span="8">
                  <el-form-item label="岗位" prop="post_id">
                        <el-select v-model="addForm.post_id" placeholder="请选择岗位">
                            <el-option v-for="item in posts" :label="item.pname" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                 </el-col>
            </el-row>
            <el-row>
            <el-col :span="8">
                <el-form-item label="入职日期"  prop="entrydate">
                    <el-date-picker v-model="addForm.entrydate" type="date" placeholder="选择入职日期" style="width:100%"></el-date-picker>
                </el-form-item>  
            </el-col>
            <el-col :span="8">
                <el-form-item label="参加工作日期"  prop="joinworkdate">
                    <el-date-picker v-model="addForm.joinworkdate" type="date" placeholder="选择参加工作日期" style="width:100%"></el-date-picker>
                </el-form-item>  
            </el-col>
        <el-col :span="8">
                <el-form-item label="用工形式"  prop="workform">
                    <el-radio v-model="addForm.workform" label="正式"></el-radio>
                    <el-radio v-model="addForm.workform" label="临时"></el-radio>
                </el-form-item>  
            </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="人员来源" prop="staffsource">
                        <el-select v-model="addForm.staffsource" placeholder="请选择人员来源">
                            <el-option v-for="(item,index) in staffsources" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="政治面貌" prop="politicalstatus">
                        <el-select v-model="addForm.politicalstatus" placeholder="请选择政治面貌">
                            <el-option v-for="(item,index) in politicalstatuss" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="民族" prop="nation">
                        <el-select v-model="addForm.nation" placeholder="请选择民族">
                            <el-option v-for="(item,index) in nations" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="籍贯" prop="nativeplace">
                        <el-input v-model="addForm.nativeplace"  placeholder="请输入籍贯"></el-input>
                    </el-form-item>
                </el-col>  
                <el-col :span="8">
                    <el-form-item label="联系电话" prop="stel">
                        <el-input v-model="addForm.stel"  placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="电子邮件" prop="semail">
                        <el-input v-model="addForm.semail"  placeholder="请输入电子邮件"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="身高" prop="sheight">
                        <el-input v-model="addForm.sheight"  placeholder="请输入身高"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="血型" prop="bloodtype">
                        <el-select v-model="addForm.bloodtype" placeholder="请选择血型">
                            <el-option v-for="(item,index) in bloodtypes" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>  
                <el-col :span="8">
                    <el-form-item label="婚姻状况" prop="maritalstatus">
                        <el-radio v-model="addForm.maritalstatus" label="已婚">已婚</el-radio>
                        <el-radio v-model="addForm.maritalstatus" label="未婚">未婚</el-radio>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row> 
                <el-col :span="8">
                    <el-form-item label="户口所在地" prop="registeredresidence">
                        <el-input v-model="addForm.registeredresidence"  placeholder="请输入户口所在地"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="最高学历" prop="education" >
                        <el-select v-model="addForm.education" placeholder="请选择最高学历">
                            <el-option v-for="(item,index) in educations" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="最高学位" prop="degree">
                        <el-select v-model="addForm.degree" placeholder="请选择最高学位">
                            <el-option v-for="(item,index) in degrees" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="毕业院校" prop="university">
                        <el-input v-model="addForm.university"  placeholder="请输入毕业院校"></el-input>
                    </el-form-item>
                </el-col> 
                <el-col :span="8">
                    <el-form-item label="所学专业" prop="major">
                        <el-input v-model="addForm.major"  placeholder="请输入所学专业"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="毕业日期"  prop="graduationdate">
                        <el-date-picker v-model="addForm.graduationdate" type="date" placeholder="选择毕业日期" style="width:100%"></el-date-picker>
                    </el-form-item>  
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="试用期开始日期"  prop="startdate">
                        <el-date-picker v-model="addForm.startdate" type="date" placeholder="选择试用期开始日期" style="width:100%"></el-date-picker>
                    </el-form-item>  
                </el-col>
                <el-col :span="8">
                    <el-form-item label="试用期结束日期"  prop="enddate">
                        <el-date-picker v-model="addForm.enddate" type="date" placeholder="选择参加试用期结束日期" style="width:100%"></el-date-picker>
                    </el-form-item>  
                </el-col>
            <el-col :span="8">
                    <el-form-item>
                        <el-button type="primary" @click="add(addFormRef)" :loading="loadingbut">{{loadingbuttext}}</el-button>
                        <el-button type="danger" @click="cancel(addFormRef)">重置</el-button>
                    </el-form-item>
            </el-col>
            </el-row>
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
    const axios:any = inject("$axios")
    const router  = useRouter();
    const loadingbut = ref(false);
    const loadingbuttext = ref("提交") 
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
      staffsource: [{ required: true, message: '请选择人员来源', trigger: 'change' }]
    })

    const departments = ref([ ])
    const posts =  ref([ ])

const  staffsources = ref([ '校园招聘','社会招聘','军转','其它']);
const  politicalstatuss = ref(['党员', '预备党员', '团员']);
const  nations = ref(["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族","瑶族","白族","土家族",
 "哈尼族","哈萨克族","傣族","黎族","傈僳族","佤族","畲族","高山族","拉祜族","水族","东乡族","纳西族","景颇族","柯尔克孜族",
 "土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族","毛南族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族", "乌孜别克族",
"俄罗斯族","鄂温克族","德昂族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族","其它"]);
const  bloodtypes = ref(["A 型","B 型","AB 型","0 型","其他血型","未定血型"]);
const  educations = ref(["高中及以下","大专","本科","研究生"]);
const  degrees = ref(["无学位","学士","双学士","硕士","博士"]);

onMounted (()=>{
    loadDepartment();
    loadPost();
})

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


const add = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid:any, fields:any) => {
    if (valid) {
      loadingbut.value = true; 
      loadingbuttext.value = '添加中...';
      axios.post("/addStaff",addForm.value)
      .then ((resp :any)=>{
            if(resp.data=="ok"){
                ElMessage({
                    message:"您成功插入数据",
                    type:"success",
                })
                router.replace({path:"/staff"})
            }else{
                ElMessage.eror("插入的数据在服务器中验证失败")
            }
            loadingbut.value = false; 
            loadingbuttext.value = '提交';
      })
      .catch ((error :any)=>{
        ElMessage.eror("请求失败，请检查客户端和服务器的网络环境")
      })
    } else {
        ElMessage.eror("校验数据失败，请检查输入的数据是否符合规范")
    }
  })
}

const cancel = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

    


  </script>
<style>
  .el-header {height: auto;}
</style>