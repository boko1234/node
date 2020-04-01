<template>
  <el-card class="box-card">
    <el-row :gutter="20">
      <el-col :span="16" :offset="2">
        <el-input v-model="newTitle" size placeholder="添加"/>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd" circle></el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-table :data="tableData" height="700" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column align="center" width="120" label="名称" prop="title"></el-table-column>
      <el-table-column align="center" width="200" label="创建时间" prop="time" :formatter="dateFormat"></el-table-column>
      <el-table-column align="center" width="140px" label="操作">
        <template slot-scope="scope">
          <el-button
                  type="success"
                  icon="el-icon-check"
                  v-show="!scope.row.status"
                  @click="handleEdit(scope.$index, scope.row)"
                  circle
          ></el-button>
          <el-button
                  type="warning"
                  icon="el-icon-refresh-left"
                  v-show="scope.row.status"
                  @click="handleEdit(scope.$index, scope.row)"
                  circle
          ></el-button>
          <el-button
                  type="danger"
                  icon="el-icon-close"
                  @click="handleDelete(scope.$index, scope.row._id)"
                  circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  import moment from 'moment'
  export default {
    name: "TodoList",
    data() {
      return {
        tableData: [],
        newTitle: ""
      };
    },
    mounted() {
      this.axios
        .get("/api/v1/todo")
        .then(response => {
          this.tableData = response.data
        });
    },
    methods: {
      dateFormat(row,column){
        let date = row[column.property];
        if(date == undefined){return ''}
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
      },
      tableRowClassName({row}) {
        if (row.status) {
          return "success-row";
        } else {
          return "";
        }
      },
      getTodoList() {
        this.axios
          .get("/api/v1/todo")
          .then(response => (this.tableData = response.data));
      },
      handleEdit(index, row) {
        // eslint-disable-next-line no-console
        console.log(row.status);
        let messageSuffix = row.status ? " 置为未完成" : " 置为已完成";
        this.axios
          .put("/api/v1/todo/" + row._id, {
            id:row._id,
            status: !row.status
          })
          .then(() => {
            this.tableData[index].status = !row.status;
            this.$message({
              showClose: true,
              duration: 1500,
              message: `<${row.title}> ${messageSuffix}`,
              type: "success"
            });
          });
      },
      handleDelete(index, id) {
        // eslint-disable-next-line no-console
        console.log(id);
        this.axios.put("/api/v1/todo/cl/" + id,{id:id}).then(() => {
          this.tableData.splice(index, 1);
          this.$message({
            showClose: true,
            duration: 1500,
            message: "删除待办事项成功",
            type: "success"
          });
        });
      },
      handleAdd() {
        if (this.newTitle != "") {
          this.axios
            .post("/api/v1/todo", {
              title: this.newTitle,
              status:false
            })
            .then((data) => {
              // eslint-disable-next-line no-console
              console.log(data);
              this.getTodoList();
              this.$message({
                showClose: true,
                duration: 1500,
                message: data.data.message,
                type: data.data.type
              });
            });
          this.newTitle = "";
        } else {
          this.$message({
            showClose: true,
            duration: 1500,
            message: "title不能为空哦",
            type: "warning"
          });
        }
      }
    }
  };
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    text-decoration: line-through;
  }
</style>