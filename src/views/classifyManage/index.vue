<template>
  <div class="app-container">
    <div class="search-form">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input placeholder="分类名称" v-model="category_name" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="classifySearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list">
      <el-button class="add" type="primary" @click="addClassify">添加</el-button>
      <el-table ref="multipleTable" :data="objectList" tooltip-effect="dark" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column label="id" prop="id" align="center"></el-table-column>
        <el-table-column prop="category_name" align="center" label="名称分类" show-overflow-tooltip></el-table-column>
        <el-table-column prop="sort" align="center" label="排序" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button class="delete" type="danger" @click="classListDelete(scope)">删除</el-button>
            <el-button type="success" @click="editClassify(scope)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--分页-->
    <div class="paginate">
    <el-pagination
    :current-page="classListPage.currentPage"
    :total="classListPage.record_count"
    :page-size="classListPage.page_size"
    layout="total,  prev, pager, next, jumper"
    @current-change="classListPageChange"
    />
    </div>

    <!--弹出框-->
    <div>
      <el-dialog :title="popTitle" :visible.sync="popTitleHide">
        <el-form :label-position="labelPositoin" label-width="100px">
          <el-form-item label="分类名称">
            <el-input v-model="addClassIfy.category_name" />
          </el-form-item>
          <el-form-item label="排序" >
            <el-input v-model="addClassIfy.sort"/>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="popTitleHide = false">取 消</el-button>
          <el-button type="primary" @click="addNewClass">确 定</el-button>
        </div>
      </el-dialog>
    </div>


    <!--提示框-->
    <el-dialog
      title="提示"
      :visible.sync="classTips"
      width="30%"
      align="center">
      <span style="font-size: 16px; color: darkred;font-weight: bold">{{adverDialogVisible}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="classTipsBtn">确 定</el-button>
  </span>
    </el-dialog>



  </div>
</template>
<script>
import jsons from '@/jsonConfig/globalStatus.json'
import {ClassifiedObjectsList,categoryDel,categoryAdd,categoryInfo,categoryUpdate} from '@/api/classifyManage/classifyManage'
export default {
  data() {
    return {
      formData: {
        goods_name: '',
        status  : ''
      },
      addForm: {
        activityName: '',
        sort: ''
      },
      labelPositoin: 'right',
      popTitle: '',//弹框title
      popTitleHide:false,//弹框显示
      //弹框传给后台
      deleteRowId:'',
      page:'1',//列表分页
      dialogFormVisible: false,
      objectList:[],
      classTips:false,//提示框显示
      adverDialogVisible:'',//提示框提示语
      category_name:'',//分类名称（传给后台）
      editClassId:'',//进入编辑获取ID
      classListPage:{},//后台返回列表分页
      addClassIfy:{
        category_name:'',
        sort:'',
      },//pop内容参数
    }
  },
  created() {
    this.classifySearch()
  },
  methods: {

    // 查询
    classifySearch(){
      let sendObjects ={
        category_name : this.category_name,
        page : 1
      }
      ClassifiedObjectsList(sendObjects).then(res=>{
          if (res.data.code == 0){
            this.objectList = res.data.result.list
            this.classListPage = res.data.result.paginate
            console.log(this.classListPage);
          }
      })
    },

    // 添加
    addClassify(){
      this.popTitleHide = true;
      this.popTitle = '添加分类';
      this.addClassIfy.category_name = '';
      this.addClassIfy.sort = ''
    },

    // 编辑
    editClassify(row,scope) {
      this.popTitleHide = true
      this.popTitle = '修改分类'
      this.editClassId = row.row.id
      categoryInfo({id:this.editClassId}).then(res=>{
          this.addClassIfy.category_name = res.data.result.category_name
          this.addClassIfy.sort = res.data.result.sort
      })
    },


    // pop框确认按钮
    addNewClass() {
      if (this.popTitle == '添加分类'){
        categoryAdd(this.addClassIfy).then(res=>{
          if (res.data.code == 0){
            this.popTitleHide = false;
          }
        })
      }else if(this.popTitle == '修改分类'){
        let sendedit ={
          id : this.editClassId,
          category_name : this.addClassIfy.category_name,
          sort:this.addClassIfy.sort
        }
        categoryUpdate(sendedit).then(res=>{

        })
      }
      console.log(111);
      this.classifySearch()
      this.popTitleHide = false
    },

    // 点击分页
    classListPageChange(val){
      console.log(val);
      this.page = val
      let sendObjects ={
        category_name : this.category_name,
        page : this.page
      }
      ClassifiedObjectsList(sendObjects).then(res=>{
        if (res.data.code == 0){
          this.objectList = res.data.result.list
          this.classListPage = res.data.result.paginate
          console.log(this.classListPage);
        }
      })
    },




    // 删除
    classListDelete(row,scope) {
      this.classTips = true
      this.deleteRowId = row.row.id
      this.adverDialogVisible = '确认删除？'
    },

    // 删除确认按钮
    classTipsBtn(){
      categoryDel({id:this.deleteRowId}).then(res=>{
        if (res.data.code == 0){
          this. classifySearch()
          this.classTips = false
        }
      })
    },



    handleSizeChange() {},
    handleCurrentChange() {},
    onSearch() {},
    handleSelectionChange() {}
  }
}
</script>
<style lang="scss" scoped>
@import "../../styles/common.scss";
.el-input {
    width: 200px;
}
.list {
  text-align: right;
}
</style>

