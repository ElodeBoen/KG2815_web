<template>
    <div class="add_box">
        <table>
            <tr class="title">
                <td colspan="2">添加人才信息</td>
            </tr>
            <tr>
                <td>人才姓名<span class="required_sign">*</span></td>
                <td>
                    <input type="text" v-model="obj.enterpriseTalent.name">
                </td>
            </tr>
            <tr>
                <td>工作年限</td>
                <td>
                    <input type="number" v-model="obj.enterpriseTalent.workingLife">
                </td>
            </tr>
            <tr>
                <td>所属部门<span class="required_sign">*</span></td>
                <td>
                    <select v-model="obj.enterpriseTalent.departmentId">
                        <option value="" label="全部"></option>
                        <option v-for="item, index in obj.departments" :key="index" :value="item.id" :label="item.name">
                        </option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>毕业学校</td>
                <td>
                    <input type="text" v-model="obj.enterpriseTalent.graduateSchool">
                </td>
            </tr>
            <tr>
                <td>个人简介<span class="required_sign">*</span></td>
                <td>
                    <textarea cols="30" rows="10" v-model="obj.enterpriseTalent.personalProfile"></textarea>
                </td>
            </tr>
            <tr>
                <td>工作经历<span class="required_sign">*</span></td>
                <td>
                    <textarea cols="30" rows="10" v-model="obj.enterpriseTalent.workExperience"></textarea>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <button @click="add()">提交</button>
                    <button @click="router.go(-1)">返回</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script setup>
import axios from '../hooks/router';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';

let route = useRoute();
let router = useRouter();

let obj = reactive({
  departments: [],
  enterpriseTalent: {
    name: '',
    workingLife: '',
    workExperience: '',
    personalProfile: '',
    departmentId: '',
    graduateSchool: ''
  }
})

let getAllDepartment = () => {
  axios.get("/department/getAllDepartment").then(res => {
    if (res.data.code == 200) {
      obj.departments = res.data.data;
    }
  })
}

let add = () => {
    if(obj.enterpriseTalent.name == null || obj.enterpriseTalent.name == ''){
        alert("人才姓名不能为空！");
        return;
    }
    if(obj.enterpriseTalent.departmentId == null || obj.enterpriseTalent.departmentId == ''){
        alert("请选择部门！");
        return;
    }
    axios.post("/enterprise-talent/addEnterpriseTalent", obj.enterpriseTalent).then(res => {
        if(res.data.code == 200){
            router.push('/hello');
        }else{
            alert("添加失败")
        }
    })
}

onMounted(() => {
  getAllDepartment();
})
</script>

<style scoped>
.add_box {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
}

.add_box table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.add_box table th,
.add_box table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.add_box table th {
  background-color: #f2f2f2;
  font-size: 16px;
  font-weight: bold;
}

.add_box table td input[type="text"],
.add_box table td input[type="number"],
.add_box table td textarea {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

.add_box table td select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

.add_box table td span.required_sign {
  color: red;
  margin-left: 5px;
}

.add_box table td button {
  padding: 5px 10px;
  border: none;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  margin-right: 10px;
}

.add_box table td button:hover {
  background-color: #45a049;
}

.add_box table td button:last-child {
  background-color: #6c757d;
}

.add_box table td button:last-child:hover {
  background-color: #5a6268;
}

.title {
    font-size: 38px;
    background-color: #696969;
    text-align: center;
}
</style>