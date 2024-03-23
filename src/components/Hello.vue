<template>
  <div class="hello_box">
    <div class="top_box">
      <span>部门名称:</span>
      <select v-model="obj.departmentId">
        <option value="" label="全部"></option>
        <option v-for="item, index in obj.departments" :key="index" :value="item.id" :label="item.name"></option>
      </select>
      <button @click="getAllEnterpriseTalent()">搜索</button>
      <button @click="goAdd()">新增人员</button>
    </div>
    <table>
      <tr>
        <td colspan="6" class="title">人才信息列表</td>
      </tr>
      <tr>
        <th>人才编号</th>
        <th>人才姓名</th>
        <th>工作年限</th>
        <th>所属部门</th>
        <th>毕业学校</th>
        <th>操作</th>
      </tr>
      <tr v-for="item, index in obj.enterpriseTalents" :key="index">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.workingLife }}年</td>
        <td>{{ item.department.name }}</td>
        <td>{{ item.graduateSchool }}</td>
        <td>
          <a href="" @click.prevent="goUpdate(item.id)">修改</a>
          <a href="" @click.prevent="del(item.id)">删除</a>
        </td>
      </tr>
      <tr v-if="obj.isDel" class="del_sty">
        <td colspan="6">{{ obj.delMsg }}</td>
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
  departmentId: '',
  enterpriseTalents: [],
  isDel: false,
  delMsg: ''
})

let getAllDepartment = () => {
  axios.get("/department/getAllDepartment").then(res => {
    if (res.data.code == 200) {
      obj.departments = res.data.data;
    }
  })
}

let getAllEnterpriseTalent = () => {
  axios.get("/enterprise-talent/getAllEnterpriseTalent?did=" + obj.departmentId).then(res => {
    if (res.data.code == 200) {
      obj.enterpriseTalents = res.data.data;
    }
  })
}

let goAdd = () => {
  router.push('/add');
}

let goUpdate = (id) => {
  router.push({ path: '/update', query: { id } });
}

let del = (id) => {
  axios.delete(`/enterprise-talent/deleteEnterpriseTalent/${id}`).then(res => {
    if (res.data.code == 200) {
      getAllEnterpriseTalent();
      obj.isDel=true;
      obj.delMsg="删除成功";
      setTimeout(()=>{
        obj.isDel=false;
      }, 3000);
    } else {
      obj.isDel=true;
      obj.delMsg="删除失败";
      setTimeout(()=>{
        obj.isDel=false;
      }, 3000);
    }
  })
}

onMounted(() => {
  getAllDepartment();
  getAllEnterpriseTalent();
})
</script>

<style scoped>
.hello_box {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
}

.top_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.top_box span {
  font-weight: bold;
  margin-right: 10px;
}

select {
  padding: 5px;
  margin-right: 10px;
}

button {
  padding: 5px 10px;
  border: none;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  margin-left: 10px;
}

button:hover {
  background-color: #45a049;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-size: 16px;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f6ffb3;
}

tr:hover {
  background-color: #e5e5e5;
}

a {
  color: #007BFF;
  text-decoration: none;
  margin-right: 10px;
}

a:hover {
  color: #0056b3;
  text-decoration: underline;
}

.title {
  font-size: 38px;
  background-color: #696969;
  text-align: center;
}

.del_sty{
  color: #ff0000;
  text-align: center;
}
</style>