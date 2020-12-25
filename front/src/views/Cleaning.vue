<template>
  <div class="about">
    <el-row :gutter="20" type="flex" class="row-bg" justify="end">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-tag type="success">清洁时间</el-tag>
          <div class="block">
            <el-date-picker
              v-model="time"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </div></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-tag type="success">清洁人员</el-tag>
          <el-select v-model="user" placeholder="人员名称">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-tag type="success">清洁项目</el-tag>
          <el-select
            v-model="cleaningItems"
            multiple
            collapse-tags
            style="margin-left: 20px"
            placeholder="地,池"
          >
            <el-option
              v-for="item in clengingItemsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select></div
      ></el-col>
      <el-col :span="4">
        <el-button type="primary" @click="sendData">提交</el-button></el-col
      >
    </el-row>

    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column prop="date" label="日期" sortable width="180">
      </el-table-column>
      <el-table-column prop="week" label="周几" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" sortable width="180">
      </el-table-column>
      <!-- <div v-for="item in items" :key="item.label"> -->
      <el-table-column prop="items" label="项目" :formatter="formatter">
        <template slot-scope="scope">
          <el-tag
            v-for="(item, index) in scope.row.items"
            :key="index"
            :type="item === '地' ? 'primary' : 'success'"
            disable-transitions
            >{{ item }}</el-tag
          >
        </template>
      </el-table-column>
      <!-- </div> -->
    </el-table>
  </div>
</template>
<script>
import dayjs from "dayjs";
import http from "../http-common";

export default {
  data() {
    return {
      time: dayjs().format("YYYY-MM-DD"),
      user: "",

      options: [
        // {
        //   value: "A",
        //   label: "孙睿哲",
        // },
        // {
        //   value: "B",
        //   label: "吴家栋",
        // },
        // {
        //   value: "C",
        //   label: "孙煜海",
        // },
        // {
        //   value: "D",
        //   label: "朱志康",
        // },
        // {
        //   value: "E",
        //   label: "谢卓君",
        // },
        {
          value: "孙睿哲",
          label: "孙睿哲",
        },
        {
          value: "吴家栋",
          label: "吴家栋",
        },
        {
          value: "孙煜海",
          label: "孙煜海",
        },
        {
          value: "朱志康",
          label: "朱志康",
        },
        {
          value: "谢卓君",
          label: "谢卓君",
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "赵小龙",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "你好啊",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "我他妈",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      clengingItemsOptions: [
        {
          value: "地",
          label: "地",
        },
        {
          value: "池",
          label: "池",
        },
        // {
        //   value: "A",
        //   label: "地",
        // },
        // {
        //   value: "B",
        //   label: "池",
        // },
      ],

      cleaningItems: [],
    };
  },
  computed: {
    week() {
      let time = (time = dayjs(this.time, "YYYY-MM-DD"));
      let week = dayjs(time).format("dddd");
      // console.log('week',week);
      return week;
    },
  },
  methods: {
    formatter(row, column) {
      // console.log('row',row);
      // console.log('column',column);

      return row.items;
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    sendData() {
      let data = {};
      data.time = dayjs(this.time);
      data.user = this.user;
      data.week = this.week;
      data.cleaningItems = this.cleaningItems;
      // console.log("data", data);
      http
        .post("/api/add-cleaning", data)
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
    getTable() {
      http.get("/api/get-cleaning").then((response) => {
        const tableData = [];
        let data = response.data.data;
        // console.log(data);
        data.forEach((element) => {
          let temp = {};
          // console.log(element);
          temp.date = dayjs(element.date).format("YYYY [年] MM [月] DD [日]");
          temp.week = element.week;
          temp.name = element.users[0].name;
          temp.items = element.items;
          // console.log('111',temp);
          tableData.push(temp);
        });
        this.tableData = tableData;
      });
    },
  },
  mounted() {
    this.getTable();
  },
};
</script>
<style lang="scss" scoped>
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
  align-items: center;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>