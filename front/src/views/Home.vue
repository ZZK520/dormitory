<template>
  <div>
    <el-form
      ref="loginForm"
      :model="form"
      :rules="rules"
      label-width="80px"
      class="login-box"
    >
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="name">
        <el-input
          type="text"
          placeholder="请输入账号"
          v-model="form.name"
          clearable
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('loginForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>

    <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%">
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import http from "../http-common";
import axios from "axios"
export default {
  name: "Login",
  data() {
    return {
      form: {
        name: "朱志康",
        password: "123456",
      },

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        name: [{ required: true, message: "账号不可为空", trigger: "blur" }],
        password: [
          {
            required: true,
            message: "密码不可为空",
            trigger: "blur",
          },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },

      // 对话框显示和隐藏
      dialogVisible: false,
    };
  },
  methods: {
    sendData(data) {
      // console.log("data", data);
      return http
        .post("/api/auth/signin", data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log(error);
          }
        });
    },
    onSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log("valid", valid);
          try {
            const res = await this.sendData(this.form);
            console.log(res);
            // if (res.data.status === 200) {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航

            //   this.$router.push("/cleaning");
            // }
          } catch (error) {
            console.log(error);
          }
        } 
      });
    },
    testHttps(){
      axios.get('https://jsonplaceholder.typicode.com/todos/1').then(ans=>{
        console.log('ans.data',ans.data);
      })
    }
  },
  mounted(){
    this.testHttps();
  }
};
</script>

<style lang="scss" scoped>
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>
