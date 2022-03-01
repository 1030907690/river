 <template>
  <el-container  style="height:100%">
    <LeftMenu />
    <el-main>
      <el-row>
        <el-row class="interval"></el-row>
        <el-row class="interval">
          <el-select v-model="targetValue" placeholder="目标船体">
            <el-option
              v-for="item in targetOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            class="el-input rightMargin"
            v-model="actionArea"
            placeholder="行为区域"
          ></el-input>

          <el-select
            v-model="actionTypeValue"
            placeholder="行为类别"
            class="rightMargin"
          >
            <el-option
              v-for="item in actionTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>

          <el-select
            v-model="alarmLevelValue"
            placeholder="预警等级"
            class="rightMargin"
          >
            <el-option
              v-for="item in alarmLevelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>

          <el-date-picker
            class="rightMargin"
            v-model="happenDateStart"
            align="right"
            type="date"
            placeholder="选择开始日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
          <el-date-picker
            class="rightMargin"
            v-model="happenDateEnd"
            align="right"
            type="date"
            placeholder="选择结束日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
          <el-button
            type="success"
            icon="el-icon-my-search"
            class="rightMargin"
            @click="searchAction()"
            >查询</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-my-reset"
            class="rightMargin"
            @click="resetAction()"
            >重置</el-button
          >
        </el-row>
        <el-row>
          <el-button type="primary" icon="el-icon-my-export" class="interval" @click="exportButton()"
            >导出</el-button
          >

          <el-table
            :data="tableData"
            border
            style="width: 80%"
            class="interval"
          >
            <el-table-column
              prop="id"
              label="序号"
              width="60"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="hull"
              label="目标船体"
              width="180"
                 align="center"
            ></el-table-column>
            <el-table-column
              prop="behavior"
              label="行为类别"
              width="180"
                 align="center"
            ></el-table-column>
            <el-table-column prop="area" label="行为区域"    align="center"></el-table-column>
            <el-table-column
              prop="name"
              label="监控设备名称"
                 align="center"
            ></el-table-column>
            <el-table-column prop="date" label="发生时间"    align="center"></el-table-column>
            <!-- <el-table-column prop="speed" label="船速"></el-table-column> -->
            <el-table-column
              prop="duration"
              label="已停留时长"
                 align="center"
            ></el-table-column>
            <el-table-column prop="warningLevel" label="预警等级"    align="center">
              <!-- 图片的显示 -->
              <template slot-scope="scope">
                <el-image
                  :src="require('../assets/' + scope.row.warningLevel)"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作"    align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleViewMonitoring(scope.$index, scope.row)"
                  type="primary"
                  round
                  >查看监控</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="limit"
            :pager-count="7"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            :current-page.sync="currentPage"
          ></el-pagination>
        </el-row>
      </el-row>
    </el-main>
  </el-container>
</template>
 

  <script>
// import { } from "network/request";
import LeftMenu from "@/components/LeftMenu";

var alarmMap = new Array();
alarmMap["0"] = "image/early0.svg";
alarmMap["1"] = "image/early1.svg";
alarmMap["2"] = "image/early2.svg";
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      happenDateStart: "", // 发生时间
      happenDateEnd: "", // 发生时间
      targetValue: "",
      targetOptions: [
        {
          value: "渔船",
          label: "渔船",
        },
        {
          value: "运砂船",
          label: "运砂船",
        },
        {
          value: "快艇",
          label: "快艇",
        },
        {
          value: "游轮",
          label: "游轮",
        },
      ],
      actionTypeValue: "",
      actionTypeOptions: [
        {
          value: "电捕",
          label: "电捕",
        },
        {
          value: "夜捕",
          label: "夜捕",
        },
        {
          value: "网捕",
          label: "网捕",
        },
      ],
      alarmLevelValue: "",
      alarmLevelOptions: [
        {
          value: "2",
          label: "高",
        },
        {
          value: "1",
          label: "中",
        },
        {
          value: "0",
          label: "低",
        },
      ],
      tableData: [
        {
          id: 1,
          hull: "目标船体",
          behavior: "行为类别",
          area: "行为区域",
          equipmentNmea: "监控设备名称",
          date: "发生时间",
          speed: "传速",
          duration: "已停留时长",
          warningLevel: alarmMap[0],
        },
      ],
      actionArea: "",
      total: 0,
      currentPage: 1,
      limit: 10,
    };
  },
  created() {
    this.initData();
    this.getTableList();
    this.refreshTable();
  },
  components: { LeftMenu },
  computed: {},
  methods: {
    resetAction() {
      this.targetValue = "";
      this.actionArea = "";
      this.actionTypeValue = "";
      this.alarmLevelValue = "";
      this.happenDateStart = "";
      this.happenDateEnd = new Date();
    },
    searchAction() {
      this.getTableList();
    },
    handleViewMonitoring(index, row) {
      this.$message({
        message: "查看监控" + row["date"],
        type: "success",
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit = val;
      this.getTableList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getTableList();
    },
    exportButton() {
      var param = {};
      param.hull = this.targetValue;
      param.area = this.actionArea;
      param.behavior = this.actionTypeValue;
      param.warningLevel = this.alarmLevelValue;
      param.startDate = "";
      if (this.happenDateStart) {
        param.startDate = getFullDate(this.happenDateStart);
      }
      if (!this.happenDateEnd) {
        this.initData();
      }
      param.endDate = getFullDate(this.happenDateEnd);
      window.open(targetBehaviorAnalysisExportUrl + '?hull='+param.hull+'&area='+param.area+'&behavior='+param.behavior+'&warningLevel='+param.warningLevel+'&startDate='+param.startDate+'&endDate='+param.endDate+'&token='+ sessionStorage.getItem('token'));
    },
    getTableList() {
      // 请求 - 分页列表
      var params = {};
      params.hull = this.targetValue;
      params.area = this.actionArea;
      params.behavior = this.actionTypeValue;
      params.warningLevel = this.alarmLevelValue;
      params.page = this.currentPage;
      params.size = this.limit;
      params.startDate = "";
      if (this.happenDateStart) {
        params.startDate = getFullDate(this.happenDateStart);
      }
      if (!this.happenDateEnd) {
        this.initData();
      }
      params.endDate = getFullDate(this.happenDateEnd);

      targetBehaviorPageList(params)
        .then((res) => {
          if (res.success) {
            this.total = res.data.size;
            var tableDataCache = new Array();
            if (res.data.ship) {
              for (var index = 0; index < res.data.ship.length; index++) {
                const element = res.data.ship[index];
                element.duration = element.duration+ 'min'
                element.date = element.date + " " + element.time;
                element.warningLevel = alarmMap[element.warningLevel];
                tableDataCache.push(element);
              }
              this.tableData = tableDataCache;
            }
          }
        })
        .catch((err) => {});
    },
    initData() {
      this.happenDateEnd = new Date();
    },
    refreshTable() {
      setInterval(() =>  {
        this.getTableList();
      }, 60000);
    },
  },
};
function getFullDate(date) {
  if (date) {
    var fullMonth = date.getMonth() + 1;
    if (fullMonth <= 9) {
      fullMonth = "0" + fullMonth;
    }
    var fullDate = date.getDate();
    if (fullDate <= 9) {
      fullDate = "0" + fullDate;
    }
    return date.getFullYear() + "." + fullMonth + "." + fullDate;
  }
}
</script>
 <<style >
  .rightMargin {
    margin-left: 12px;
  }

 .interval {
   margin-bottom: 12px;
 }
.el-input {
    width: 120px;

  }
.el-icon-my-export{
    background: url('~@/assets/image/export.png') center no-repeat;
   /* background-size: cover;*/
}
.el-icon-my-export:before{
    content: "替";
    font-size: 16px;
    visibility: hidden;
}

 
.el-icon-my-export{
    font-size: 16px;
}
.el-icon-my-export:before{
    content: "\e611";
}

.el-icon-my-search{
    background: url('~@/assets/image/search.png') center no-repeat;
}
.el-icon-my-search:before{
    content: "替";
    font-size: 16px;
    visibility: hidden;
}
.el-icon-my-search{
    font-size: 16px;
}
.el-icon-my-search:before{
    content: "\e611";
}


.el-icon-my-reset{
    background: url('~@/assets/image/reset.png') center no-repeat;
}
.el-icon-my-reset:before{
    content: "替";
    font-size: 16px;
    visibility: hidden;
}
.el-icon-my-reset{
    font-size: 16px;
}
.el-icon-my-reset:before{
    content: "\e611";
}

 </style>