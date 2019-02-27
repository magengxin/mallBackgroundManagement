<template>
    <div class="app-container">
        <div class="search-form">
            <el-form :inline="true" :model="searchCriteria" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="searchCriteria.nick_name" placeholder="用户名称"></el-input>
                </el-form-item>
              <el-date-picker v-model="searchCriteria.start_time" type="date" placeholder="选择日期"  style="margin-left: 40px"></el-date-picker>
              <el-date-picker v-model="searchCriteria.end_time" type="date" placeholder="选择日期"  style="margin-left: 40px"></el-date-picker>
                <el-form-item  style="margin-left: 40px">
                    <el-button type="primary" @click="userSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="list">
            <el-table ref="multipleTable" :data="userListMsg" tooltip-effect="dark" border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column prop="uid" label="id" align="center">
                </el-table-column>
                <el-table-column prop="name" align="center" label="用户名称">
                </el-table-column>
                <el-table-column prop="nickName" align="center" label="昵称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="create_time" align="center" label="注册时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="name" align="center" label="朋友圈（人）" show-overflow-tooltip></el-table-column>
                <el-table-column prop="name" align="center" label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <el-button size="small" type="primary" @click="detailedAddress(scope)">详细地址</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

      <!--详细地址弹出框-->
      <div>
        <el-dialog :title="adressTitle" align="center" :visible.sync="showAddress" width="1000px">
          <el-table ref="multipleTable" :data="userAdress" tooltip-effect="dark"  border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column prop="id" label="id" align="center" width="150px">
            </el-table-column>
            <el-table-column prop="recipient" align="center" label="收货人" width="150px">
            </el-table-column>
            <el-table-column prop="tel" align="center" label="手机号" show-overflow-tooltip width="200px">
            </el-table-column>
            <el-table-column prop="name" align="center" label="邮编" show-overflow-tooltip width="150px">
            </el-table-column>
            <el-table-column prop="address" align="center" label="默认地址" show-overflow-tooltip></el-table-column>
          </el-table>
        </el-dialog>
      </div>

      <!--分页-->
      <div class="paginate">
        <el-pagination
          @current-change="userListChange"
          :current-page="userListPage.currentPage"
          :total="userListPage.record_count"
          :page-size="userListPage.page_size"
          layout="total,  prev, pager, next, jumper"
        />
      </div>
    </div>
</template>
<script>
import jsons from '@/jsonConfig/globalStatus.json'
import {userList,userAdressList } from "@/api/userManage/userManage";
export default {


  data() {
    return {
      showAddress :false,
      adressTitle:"",
      formData: {
        goods_name: "",
        status: ""
      },
      currentPage: 1,
      searchCriteria:{
        nick_name:'',
        start_time:'',
        end_time:'',
        page:''
      },
      userListPage:{},
      userListMsg:[],
      userAdress:[],//接口返回详细地址
      // pageCurrent:'',//用户列表当前分页
    };
  },
  created() {
    this.userSearch()
  },

  methods: {
      addGoods() {
          this.$router.push({path:'/goodsManage/addGoods'})
      },
      handleSizeChange() {},
      handleCurrentChange() {},
      onSearch() {},
      handleSelectionChange() {},


    // 用户列表查询
    userSearch(){
      userList(this.searchCriteria).then(res =>{
        this.userListMsg = res.data.result.list
        this.userListPage = res.data.result.paginate
        console.log(this.userListPage);
      })
    },
    // 用户列表分页点击
    userListChange(val){
      this.searchCriteria.page = val
      console.log(this.pageCurrent);
      this.userSearch()
    },

    // 详细地址
    detailedAddress(row,scope){
      console.log(row);
      this.showAddress = true;
      this.adressTitle = "详细地址";
      userAdressList({user_id:row.row.uid}).then(res =>{
        this.userAdress = res.data.result
      })
    },
  }
};
</script>
<style lang="scss" scoped>
@import '../../styles/common.scss';
.list {
    text-align: right;
}
</style>


