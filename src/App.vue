<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-row :gutter="20" type="flex" class="row-bg" justify="space-around">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <router-link to="/"
                ><el-button type="success">Go to home</el-button></router-link
              >
            </div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <router-link to="/cleaning"
                ><el-button type="success"
                  >Go to cleaning</el-button
                ></router-link
              >
            </div></el-col
          >

          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <router-link to="/charge"
                ><el-button type="success">Go to charge</el-button></router-link
              >
            </div></el-col
          >
          <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
      </el-header>
      <el-main><router-view /></el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld,
  },
};
</script>

<style lang="scss">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  display: flex;
  justify-content: center;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
