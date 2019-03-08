<template>
  <div class="app-container">
    <div class="search-form">
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item>
        <el-input clearable v-model="formData.goods_name" placeholder="商品名称"/>
      </el-form-item>
        <el-form-item >
          <el-select clearable v-model="formData.status" placeholder="上架状态">
            <el-option label="上架" value="0"/>
            <el-option label="下架" value="1"/>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-select clearable v-model="formData.classify_status" placeholder="分类列表">
            <el-option label="美容个护" value="0"/>
            <el-option label="生活家居" value="1"/>
            <el-option label="数码3c" value="2"/>
            <el-option label="养生豪礼" value="3"/>
            <el-option label="运动健身" value="4"/>
            <el-option label="珠宝首饰" value="5"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list">
      <el-button class="add" type="primary" @click="addGoods">添加</el-button>
      <el-table ref="multipleTable" :data="resultList" tooltip-effect="dark" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column prop="gid" label="商品ID" width="120" align="center">
          <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
        </el-table-column>
        <el-table-column prop="goods_name" align="center" label="商品名称" />
        <el-table-column prop="type" align="center" label="所属分类" width="120"/>
        <el-table-column prop="value" align="center" label="积分" width="120" />
        <el-table-column prop="stock" align="center" label="库存" width="120"/>
        <el-table-column  align="center" label="排序" show-overflow-tooltip/>
        <el-table-column  align="center" label="是否上架" show-overflow-tooltip>

          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status==1" style="margin-left: 10px" @click="upperAndlowerClick(scope)">下架</el-button>
            <el-button type="primary" v-if="scope.row.status==0" style="margin-left: 10px" @click="upperAndlowerClick(scope)">上架</el-button>
            <!--<el-button v-if="scope.row.status==1" type="primary" style="margin-left: 10px">上架</el-button>-->
          </template>
        </el-table-column>
        <el-table-column prop="gid" align="center" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="success" @click="editSuccess(scope.row.gid)">编辑</el-button>
            <el-button type="danger" @click="deleteShopList(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current_page"
        layout="total, prev, pager, next"
        style="float: right;"
        :total="record_count">
      </el-pagination>
      <span style="float: right; margin-top: 7px;margin-right: 4%">显示总数</span>
    </div>

    <!--//删除页弹出框-->
    <div class="delete-sure">
      <el-dialog :title="deleteTitle" :visible.sync="deleteShow" placement="" style="padding: 0;" width="500px">
        <div class="text-delete">
          <p align="center">确认删除？</p>
        </div>
        <div class="btn-delete">
          <el-button type="info" @click="deleteShow = false">取消</el-button>
          <el-button style="float: right;" type="primary" @click="sureDelete()">确认</el-button>
        </div>
      </el-dialog>
      <!--//删除失败弹框-->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        align="center">
        <span style="font-size: 16px; color: darkred;font-weight: bold">{{msgDialogVisible}}</span>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="frameConfirmation">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {searchShop,removeShop,goodsUpper} from "@/api/goodsManage/goodManage";
export default {
  data() {
    return {
      deleteShow: false, //删除弹框
      resultList:[],//搜索列表
      indexList:'',//列表索引
      removeListId:'',//删除列表传参
      dialogVisible:false,//删除失败弹框
      msgDialogVisible:'',//删除失败弹框内容
      shopCheap:'',//商品上架下架状态
      upperAndlowerVariable:'',//上下架文字
      deleteTitle: '删    除',
      clickUpperGid:'',//确认上下架弹框 row.row.gid
      clickUpperChange:'',
      current_page:1,
      record_count:10,
      page_size:10,
      returnPage:{

      },//返回页码
      handleClose:'false',//
      formData: {
        goods_name: '',
        status: '',
        classify_status:'', // 默认为100 即全部显示，以后按序号展示
        page:'1'
      },
    }
  },
  created() {
    this.onSearch()
  },
  methods: {
    // 编辑 goto : 2
    addGoods() {
      this.$router.push({ path: '/goodsManage/addGoods',query:{goto:2} })
   },
    // 编辑 goto : 1
    editSuccess(id){
      this.$router.push({ path: '/goodsManage/addGoods',query:{goto:1,id:id}})
    },
    handleSizeChange() {},
    // 点击分页
    handleCurrentChange(value){
      this.formData.page = value
      searchShop(this.formData).then(res=>{
        if (res.data.code == '0'){
          console.log(res);
          this.resultList = res.data.result.list;
          this.record_count = res.data.result.paginate.record_count;
        }
      })
    },

    //上下架点击事件
    // TODO: 上下架状态 0:上架 1:下架
    upperAndlowerClick(row,scope){
      this.clickUpperChange = row.row.status
      this.clickUpperGid = row.row.gid
      this.dialogVisible = true
      if (this.clickUpperChange == 0){
        this.msgDialogVisible = '是否上架'
      }else{
        this.msgDialogVisible = '是否下架'
      }
    },
    //弹框确认按钮
    frameConfirmation(){
      this.dialogVisible = false
      console.log(this.clickUpperChange);
      this.clickUpperChange == 0 ? this.clickUpperChange = 1 : this.clickUpperChange = 0;
      let sendGoodsUpper = {
        status : this.clickUpperChange,
        goods_id : this.clickUpperGid
      }
      // TODO: 这里为啥是先改变上下架状态后发送请求，回来后再翻转，这样不会冲突么？
      console.log(sendGoodsUpper);
      goodsUpper(sendGoodsUpper).then(res =>{
        if (res.data.code == 0){
          if (this.clickUpperChange == 0){
            this.shopCheap = '下架';
          }else{
            this.shopCheap = '上架';
          }
          this.clickUpperChange = ''
          this.onSearch()
        }else{
          this.deleteTitle = true
          this.msgDialogVisible = res.data.msg
        }
      })
    },
    //搜索查询
    onSearch() {
      this.formData.page = 1
      searchShop(this.formData).then(res=>{
        if (res.data.code == '0'){
          console.log('search res',res);
          this.resultList = res.data.result.list;
          this.record_count = res.data.result.paginate.record_count;
          // TODO: 不明白什么意思
          // TODO: 商品管理增加专享设置
        }
      })
    },

    handleSelectionChange() {},
    //删除弹框
    deleteShopList(row,scope){
      this.deleteShow = true;
      this.indexList = row.$index;
      console.log(row);
    },
    // 删除页确认按钮
    sureDelete() {
      console.log(this.resultList[this.indexList]);
      this.removeListId = this.resultList[this.indexList].gid;
      let listRemove ={
        goods_id : this.removeListId
      }
      removeShop(listRemove).then(res=>{
        if (res.data.code == '0'){
          this.onSearch()
        }else{
          this.dialogVisible = true;
          this.msgDialogVisible = res.data.msg;
          return
        }
        this.deleteShow = false;
      });
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/common.scss';
.list {
    text-align: right;
}
  .text-delete{
    border-top: 1px solid #aaa;
  }
  .text-delete p{
    color: darkred;
    font-weight: bold;
    font-size: 16px;
    margin-top: 40px
  }
  .btn-delete{
    width: 50%;
    margin:50px auto 0;
    padding-bottom: 30px;
  }
  .block{
    float: right;
    margin-top: 20px;
    width: 50%;
  }
</style>

