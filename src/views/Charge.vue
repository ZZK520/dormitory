<template>
  <div class="about">
    <!-- <h1>{{ sums_amount }}</h1>
    <h1>{{ checkChargeDate }}</h1> -->

    <el-row>
      <el-col :span="6"
        ><div class="grid-content">
          <span class="demonstration">查询日期范围</span>
        </div></el-col
      >
      <el-col :span="12"
        ><div class="grid-content">
          <div class="block">
            <el-date-picker
              v-model="checkChargeDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="filterCharge"
              unlink-panels
            >
            </el-date-picker>
          </div></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content">
            <el-button @click="postEverySummary" type="primary">添加缴费总表</el-button>
        </div></el-col
      >
    </el-row>

    <el-button @click="resetDateFilter">清除日期过滤器</el-button>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table
      ref="filterTable"
      :fit="false"
      :data="filterCharge()"
      style="width: 800px"
      :default-sort="{ prop: 'date', order: 'descending' }"
      max-height="500"
      :summary-method="getSummaries"
      show-summary
    >
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
        column-key="date"
        :filters="filtedTimeArray"
        :filter-method="filterHandler_time"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        sortable
        width="180"
        column-key="date"
        :filters="filtedNameArray"
        :filter-method="filterHandler_name"
      >
      </el-table-column>
      <el-table-column prop="items" label="项目" :formatter="formatter">
        <template slot-scope="scope">
          <el-tag
            v-for="(item, index) in scope.row.items"
            :key="index"
            :type="item === '水费' ? 'primary' : 'success'"
            disable-transitions
            >{{ item }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="金额(元)" sortable width="180">
      </el-table-column>
    </el-table>
    <el-row :gutter="20" type="flex" class="row-bg" justify="end">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-tag type="success">支付时间</el-tag>
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
          <el-tag type="success">支付人员</el-tag>
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
          <el-tag type="success">支付项目</el-tag>
          <el-select
            v-model="chargeItems"
            multiple
            collapse-tags
            style="margin-left: 20px"
            placeholder="水费，电费"
          >
            <el-option
              v-for="item in chargeItemsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-tag type="success">支付金额</el-tag>
          <el-input placeholder="金额" v-model="amount" type="number" clearable>
          </el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="postRecord">提交</el-button></el-col
      >
    </el-row>
  </div>
</template>
<script>
import dayjs from "dayjs";
import axios from "axios";
import http from "../http-common";
// import dormitory from '../assets/dormitory'
export default {
  data() {
    return {
      userData: [],
      bedNum_name: [],
      everySummary: {},
      checkChargeDate: [dayjs("2020-9-13"), dayjs()],
      filtedNameArray: [
        { text: "孙睿哲", value: "孙睿哲" },
        { text: "吴家栋", value: "吴家栋" },
        { text: "孙煜海", value: "孙煜海" },
        { text: "朱志康", value: "朱志康" },
        { text: "谢卓君", value: "谢卓君" },
      ],
      filtedTimeArray: [
        // { text: "2016-05-01", value: "2016-05-01" },
        // { text: "2016-05-02", value: "2016-05-02" },
        // { text: "2016-05-03", value: "2016-05-03" },
        // { text: "2016-05-04", value: "2016-05-04" },
      ],
      sums_amount: 0,
      time: dayjs().format("YYYY-MM-DD"),
      user: "",
      amount: 10,
      options: [
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
        // {
        //   date: "2016-05-02",
        //   name: "王小虎",
        //   items: ["水费", "电费"],
        //   amount: 110,
        // },
        // {
        //   date: "2016-05-04",
        //   name: "赵小龙",
        //   items: ["水费"],
        //   amount: 10,
        // },
      ],
      chargeItemsOptions: [
        {
          value: "水费",
          label: "水费",
        },
        {
          value: "电费",
          label: "电费",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      chargeItems: [],
      checkCharges: [],
    };
  },

  methods: {
    filterCharge() {
      // console.log("filterCharge");
      let data = this.checkChargeDate;
      data = data.map((item, index) => {
        let temp = "";
        if (index == 0) {
          temp = dayjs(item)
            .subtract(1, "day")
            .format("YYYY [年] MM [月] DD [日]");
        }
        if (index == 1) {
          temp = dayjs(item).add(1, "day").format("YYYY [年] MM [月] DD [日]");
        }
        return temp;
      });
      // console.log("data", data);
      return this.tableData.filter((item) => {
        // console.log(item);
        return item.date > data[0] && item.date < data[1];
      });
    },
    setChargeDate() {
      let data = this.tableData;
      data = data.map((item) => {
        //  console.log(item.date);
        let temp = { text: "", value: "" };
        temp.text = item.date;
        temp.value = item.date;
        return temp;
      });
      // console.log("data", data);
      this.filtedTimeArray = data;
    },
    setCheckChargeDate() {
      console.log("setCheckChargeDate");
      let data = this.checkChargeDate;
      data = data.map((item) => {
        let temp = { text: "", value: "" };
        temp.text = dayjs(item).format("YYYY-MM-DD");
        temp.value = dayjs(item).format("YYYY-MM-DD");
        return temp;
      });
      // console.log("data", data);
      this.filtedTimeArray = data;
    },
    getCheckCharge() {
      http.get("/api/get-checkCharge").then((response) => {
        let data = response.data.data;
        this.checkCharges = data;
        data = data.map((item) => {
          let temp = { text: "", value: "" };
          temp.text = dayjs(item.checkDate).format("YYYY-MM-DD");
          temp.value = dayjs(item.checkDate).format("YYYY-MM-DD");
          return temp;
        });
        // console.log("data", data);
        // this.getCheckCharge = data;
      });
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    filterHandler_time(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    filterHandler_name(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    getEverySummary(data) {
      const data_key_name = this.deal_beadNum_name();
      // console.log("data_key_bedNumber", data_key_name);
      const temp = {};
      this.userData.forEach((item, index, array) => {
        temp[item.name] = 0;
      });
      data.forEach((item, index, array) => {
        temp[item.name] += item.amount;
      });
      // console.log("temp", temp);
      let transformed = Object.keys(temp).reduce((newData, key) => {
        // console.log('newData',newData);
        // console.log('key',key);
        let newKey = data_key_name[key];
        newData[newKey] = temp[key];
        return newData;
      }, {});
      // console.log("transformed", transformed);

      this.everySummary = transformed;
    },
    postCheckCharge() {},
    postEverySummary() {
      const data = this.everySummary;
      console.log("everySummary", data);
      http
        .post("/api/add-checkCharge", { data })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(`添加收费总表${error}`);
        });
    },
    getSummaries(param) {
      const { columns, data } = param;
      if (data.length) {
        this.getEverySummary(data);
      }

      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        if (index === 3) {
          const values = data.map((item) => Number(item[column.property]));
          // console.log('values',values);
          if (!values.every((value) => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            // sums[index] = 'N/A';
            sums[index] = "";
          }
        }
      });
      this.sums_amount = sums[3];
      return sums;
    },
    postRecord() {
      let data = {};
      data.time = dayjs(this.time);
      data.user = this.user;
      data.chargeItems = this.chargeItems;
      data.amount = this.amount;
      console.log("data", data);
      http
        .post("/api/add-charge", data)
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
    getTable: async function () {
      await http.get("/api/get-charge").then((response) => {
        const tableData = [];
        let data = response.data.data;
        this.fullData = data;
        data.forEach((element) => {
          let temp = {};
          // console.log(element);
          // console.log(typeof element.amount);
          temp.date = dayjs(element.date).format("YYYY [年] MM [月] DD [日]");
          temp.amount = element.amount;
          temp.name = element.users[0].name;
          temp.items = element.items;
          tableData.push(temp);
        });
        this.tableData = tableData;
        // console.log(this.tableData);
      });
      this.setChargeDate();
    },
    getUserData() {
      http.get("/api/get-user").then((response) => {
        let data = response.data.data;
        this.userData = data;
      });
    },
    deal_beadNum_name() {
      const data_key_bedNumber = {};
      const data_key_name = {};

      this.userData.forEach((item, index, array) => {
        // console.log(item);
        data_key_bedNumber[item.bedNumber] = item.name;
        data_key_name[item.name] = item.bedNumber;
      });
      // console.log('data_key_bedNumber',data_key_bedNumber);
      // console.log('data_key_name',data_key_name);
      return data_key_name;
    },
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
  },
  mounted() {
    this.getTable();
    this.getUserData();
    this.getCheckCharge();
    // this.setCheckChargeDate();
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