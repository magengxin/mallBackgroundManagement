<template>
  <div class="postage-formwork">
    <!--查询-->
    <div class="search">
      <el-form :inline="true" :model="formData" class="search-postage-formwork">
        <el-form-item>
          <el-input  placeholder="邮费模板名称" v-if="postageList"></el-input>
          <el-input  placeholder="请输入区域" v-if="areaHide"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left: 50%" v-if="postageList">查询</el-button>
          <el-button type="primary" style="margin-left: 50%" v-if="areaHide">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--邮费模板列表-->
    <div class="list">
      <el-button class="add" type="primary"  style="margin-right: 5%"  @click="editPostage">添加</el-button>
      <el-table
        v-if="postageList"
        :data="tableData"
        border
        style="width: 90%; margin: auto; text-align: center;margin-top: 30px">
        <el-table-column  label="邮费模版名称" align="center" width="500">
          <template slot-scope="scope">
            <span>{{ scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="模板描述" align="center" width="500">
          <template slot-scope="scope">
            <span>{{ scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="popupBox(scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" @click="ListshowareaHide()">设置区域</el-button>
            <el-button size="mini" type="danger" @click="deleteThis(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--设置区域-->
    <div class="settingup-area">
      <el-table ref="multipleTable"  tooltip-effect="dark" border style="width: 90%; margin: auto; text-align:center; margin-top: 30px"  v-if="areaHide">
        <el-table-column label="区域" align="center">
          <template slot-scope="scope">
            <span></span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="所辖区域" show-overflow-tooltip>
          <template slot-scope="scope">
            <span></span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="价格" show-overflow-tooltip>
          <template slot-scope="scope">
            <span></span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="paginate">
      <el-pagination style="margin-right: 5%;margin-top: 80px"   :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>

    <!--编辑弹出框-->
    <div class="edit-postage">
      <el-dialog :title="editPostageTitle" placement=""  align="center"  :visible.sync="hideAndshow" width="500px">
        <div>
          <el-form :inline="true" align="right" style="margin-right: 90px;">
            <el-form-item  label="邮费模板名称：">
              <el-input v-model="newTableData.date"></el-input>
            </el-form-item>
            <el-form-item  label="描述：">
              <el-input type="textarea" v-model="newTableData.name"></el-input>
            </el-form-item>
          </el-form>
          <el-row style="margin-top: 20px">
            <el-button type="primary" size="small" align="center" @click="closeEditpostage" v-if="editpostage">确定</el-button>
            <el-button type="primary" size="small" align="center" @click="sureModification()" v-if="modification">确定</el-button>
          </el-row>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        areaHide:false,//设置区域
        postageList:true,//邮费模板名称
        hideAndshow:false,//添加打开弹出框
        editpostage:false,//添加探矿确认按钮
        modification:false,//修改弹窗确认按钮
        listHide:true,
        editPostageTitle:"",
        newTableData: {
          date:"",
          name:""
        },
        tableData: [{
          date: '1',
          name: '模板描述1',
        },{
          date: '2',
          name: '模板描述2',
        },{
          date: '3',
          name: '模板描述3',
        },{
          date: '4',
          name: '模板描述4',
        },{
          date: '5',
          name: '模板描述5',
        },],

        formData: {
          goods_name: "",
          status: "",
        },
      }
    },
    methods:{
      addGoods() {
        this.$router.push({path:'/goodsManage/addGoods'})
      },
      // 添加打开弹出框
      editPostage(){
        this.hideAndshow = true;
        this.editPostageTitle = "添加";
        this.editpostage = true;
        this.modification = false;
        this.newTableData = {
          date:"",
          name:""
        };
      },
      // 编辑打开弹出框
      popupBox(row){
        this.newTableData = {
          date:"",
          name:""
        };
        this.hideAndshow = true;
        this.editPostageTitle = "编辑";
        this.modification = true;
        this.editpostage = false;
        console.log(row);
      },
      // 弹出框添加确定
      closeEditpostage(){
        if (this.newTableData.name == ''){
          alert("请输入邮费模板名称");
          return;
        }else if(this.newTableData.date == ''){
          alert("请输入描述");
          return;
        }else{
          this.tableData.unshift(this.newTableData);
          this.newTableData = {
            date:"",
            name:""
          }
        }
        this.hideAndshow = false;
      },
      //弹出框修改确定
      sureModification(){
        this.hideAndshow = false;
      },
      // 删除
      deleteThis(index,row){
        // console.log(index);
        this.tableData.splice(index, 1);
      },
      // 设置区域显示隐藏
      ListshowareaHide(){
        this.areaHide = true;
        this.postageList = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../styles/common.scss';
  .list {
    text-align: right;
  }
  .search-postage-formwork{
    margin-top: 50px;
    margin-left: 5%;
  }
</style>
