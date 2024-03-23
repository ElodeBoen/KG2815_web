<template>
    <div class="update_box">
        <table>
            <tr>
                <td colspan="2" class="title">更新人才信息</td>
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
                    <button @click="update()">提交</button>
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
        id: '',
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

let getEnterpriseTalent = (id) => {
    axios.get(`/enterprise-talent/getEnterpriseTalentById/${id}`).then(res => {
        if (res.data.code == 200) {
            obj.enterpriseTalent = res.data.data;
        }
    })
}

let update = () => {
    if(obj.enterpriseTalent.name == null || obj.enterpriseTalent.name == ''){
        alert("人才姓名不能为空！");
        return;
    }
    if(obj.enterpriseTalent.departmentId == null || obj.enterpriseTalent.departmentId == ''){
        alert("请选择部门！");
        return;
    }
    axios.put("/enterprise-talent/updateEnterpriseTalent", obj.enterpriseTalent).then(res => {
        if(res.data.code == 200){
            router.push('/hello');
        }else{
            alert("修改失败")
        }
    })
}

onMounted(() => {
    getAllDepartment();
    getEnterpriseTalent(route.query.id);
})
</script>

<style scoped>
.update_box {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
}

.update_box table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.update_box table th,
.update_box table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.update_box table th {
  background-color: #f2f2f2;
  font-size: 16px;
  font-weight: bold;
}

.update_box table td input[type="text"],
.update_box table td input[type="number"],
.update_box table td textarea {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

.update_box table td select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

.update_box table td span.required_sign {
  color: red;
  margin-left: 5px;
}

.update_box table td button {
  padding: 5px 10px;
  border: none;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  margin-right: 10px;
}

.update_box table td button:hover {
  background-color: #45a049;
}

.update_box table td button:last-child {
  background-color: #6c757d;
}

.update_box table td button:last-child:hover {
  background-color: #5a6268;
}

.title {
    font-size: 38px;
    background-color: #696969;
    text-align: center;
}
</style>