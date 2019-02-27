<template>
  <div class="advertising-message">
    <div>
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item>
          <el-input  placeholder="商品名称" v-model="adverCommodityName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="上架状态" v-model="adverCommodityStatus">
            <el-option label="上架" value="0"></el-option>
            <el-option label="下架" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchListAdver">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--列表-->
      <div class="list-advertising">
        <el-button class="add-btn" type="primary" style="margin-bottom: 30px" @click="addAdvertisementBtn">添加</el-button>
        <el-table  ref="multipleTable" :data="advertisementAwarry" tooltip-effect="dark" border style="width: 100%" >
          <el-table-column prop="aid" label="id" align="center" max-width="400px" fixed>
            <!--<template slot-scope="scope"></template>-->
          </el-table-column>
          <el-table-column prop="name" align="center" label="广告名称" max-width="400px">
          </el-table-column>
          <el-table-column align="center" label="操作" show-overflow-tooltip fixed="right">
            <template slot-scope="scope">
              <el-button type="success" @click="goodsShow(scope)">设置显示商品</el-button>
              <el-button type="warning" @click="setUpaPrizePool(scope)">设置奖池</el-button>
              <el-button  type="primary" v-if="scope.row.status == 0" @click="upperAndlower(scope)">上架</el-button>
              <el-button  type="primary" v-if="scope.row.status == 1" @click="upperAndlower(scope)">下架</el-button>
              <el-button  type="danger" @click="deletListeBtn(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>


    <!--添加广告-->
    <div>
      <el-dialog  :title="addAdvertisementTitle" :visible.sync="addAdvertisementHide" placement="" style="padding: 0;" width="600px">
        <el-form style="width: 300px"  class="demo-form-inline">
          <el-form-item label="ID">
            <el-input  placeholder="输入ID" v-model="objAddAdvertisemen.id" ></el-input>
          </el-form-item>
          <el-form-item label="广告名称">
            <el-input  placeholder="输入广告名称" v-model="objAddAdvertisemen.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-top: 20px;margin-right: 20px" type="info" @click="addAdvertisementHide = false" >取消</el-button>
            <el-button style="margin-top: 20px" type="primary" @click="inputAddAdvertisement">添加</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>


    <!--//删除页弹出框-->
    <div class="delete-sure">
      <el-dialog  :title="adverdeleteTitle" :visible.sync="deleteShow" placement="" style="padding: 0;" width="500px">
        <div class="text-delete">
          <p align="center">{{popHideandShow}}</p>
        </div>
        <div class="btn-delete">
          <el-button type="info" @click="deleteShow =false">取消</el-button>
          <el-button style="float: right;" type="primary" @click="sureDeletListeBtn()">确认</el-button>
        </div>
      </el-dialog>
      <!--//删除失败弹框-->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        align="center">
        <span style="font-size: 16px; color: darkred;font-weight: bold">{{adverDialogVisible}}</span>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
      </el-dialog>
    </div>



    <!--// 设置奖池/设置显示商品-->
    <div class="delete-sure">
      <el-dialog  :title="jackpotTitle" :visible.sync="jackpotShow" placement="" style="padding: 0;" width="800px">
        <div class="text-delete">
          <el-button class="add-btn" type="primary" style="margin-top: 30px" @click="addJackpotListNew" >添加</el-button>

          <!--设置奖池进入显示内容-->
          <el-table ref="multipleTable" v-if="jackpotTitle == '设置奖池'" :data="acceptingPlollList" tooltip-effect="dark" border style="width: 100%" >
            <el-table-column prop="ap_id" label="奖池id" align="center" width="150px">
              <!--<template slot-scope="scope"></template>-->
            </el-table-column>
            <el-table-column prop="high_score" align="center"  label="游戏分数线" width="150px" >
            </el-table-column>
            <el-table-column prop="name" align="center" label="奖品红包" width="150px">
            </el-table-column>
            <el-table-column align="center" label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button size="mini" type="warning" @click="jackpotSet(scope)">编辑</el-button>
                <el-button size="mini" v-if="scope.row.status == 0" type="primary" @click="jackpotUpper(scope)">上架</el-button>
                <el-button size="mini" v-if="scope.row.status == 1" type="primary" @click="jackpotUpper(scope)">下架</el-button>
                <el-button size="mini" type="danger" @click="jackpotdeletBtn(scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!--设置显示商品进入显示内容-->
          <el-table ref="multipleTable" v-if="jackpotTitle == '设置显示商品'" :data="setShowListMsg" tooltip-effect="dark" border style="width: 100%" >
            <el-table-column prop="goods_id" label="ID" align="center" width="120px">
              <!--<template slot-scope="scope"></template>-->
            </el-table-column>
            <el-table-column prop="goods_name" align="center"  label="商品名称" >
            </el-table-column>
            <el-table-column prop="type" align="center" label="类型" width="120px">
            </el-table-column>
            <el-table-column prop="stock" align="center" label="库存" width="120px">
            </el-table-column>
            <el-table-column prop="value" align="center" label="积分" width="120px">
            </el-table-column>
            <el-table-column prop="sort" align="center" label="排序" width="120px">
            </el-table-column>
          </el-table>

        </div>
        <div class="btn-delete">
          <el-button type="info" @click="jackpotShow =false">取消</el-button>
          <el-button style="float: right;" type="primary" @click="jackpotSureBtn()">确认</el-button>
        </div>
      </el-dialog>
    </div>

    <!--设置显示商品=>商品列表-->
    <div>
      <el-dialog  :title="titleMerchandise" :visible.sync="showListOfMerchandise" placement="" style="padding: 0;" width="800px">
        <!--查询-->
          <el-form :inline="true"   class="demo-form-inline">
            <el-form-item>
              <el-input  placeholder="输入商品名称" v-model="inputGoddsName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select placeholder="类型" v-model="inputGoddsType">
                <el-option label="上架" value="1"></el-option>
                <el-option label="下架" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="goodsListAddShow">查询</el-button>
            </el-form-item>
          </el-form>

        <!--商品列表-->
        <el-table
          ref="multipleTable"
          @select="selectCheckBox"
          :data="goodsListReturn"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            align="center"
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="ID"
            prop="gid"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="goods_name"
            align="center"
            label="商品名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="type"
            align="center"
            label="类型"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="stock"
            align="center"
            label="库存"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="value"
            align="center"
            label="奖品红包"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <!--商品列表分页-->
        <div class="block" style="margin-top: 30px;">
          <el-pagination
            style="float: right;"
            @current-change="handleCurrentChange"
            :current-page=10
            layout="total, prev, pager, next"
            :total="goodListPage.record_count">
          </el-pagination>
        </div>
        <div class="btn-delete" style="margin-top: 100px;width: 40%">
          <el-button type="info" @click="showListOfMerchandise =false">取消</el-button>
          <el-button style="float: right;" type="primary" @click="shopListBtn()">确认</el-button>
        </div>
      </el-dialog>
    </div>


    <!--设置奖池-添加弹框-->
    <div>
      <el-dialog  :title="addJackpotTitle" :visible.sync="addJackpotShow" placement="" style="padding: 0;" width="800px">
        <div class="text-delete">
          <el-form :inline="true" :data="sendAddJackpot"  class="demo-form-inline" style="margin-top: 30px">
            <el-form-item  label="分数线">
              <el-input  placeholder="请输入最低分数线" @change="judgementSize" v-model="sendAddJackpot.low_score"></el-input>
            </el-form-item>
            <el-form-item label="——">
              <el-input  placeholder="请输入最高分数线" v-model="sendAddJackpot.high_score"></el-input>
            </el-form-item>
          </el-form>
          <el-form :inline="true" :data="sendAddJackpot"  class="demo-form-inline">
            <el-form-item  label="奖品红包">
              <el-input v-model="sendAddJackpot.name"></el-input>
            </el-form-item>
          </el-form>
          <el-form :inline="true" :data="sendAddJackpot"  class="demo-form-inline">
            <el-form-item  label="获取积分">
              <el-input v-model="sendAddJackpot.points"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="btn-delete">
          <el-button type="info" @click="addJackpotShow =false">取消</el-button>
          <el-button style="float: right;" type="primary" @click="addJackpotSure()">确认</el-button>
        </div>
      </el-dialog>
    </div>



    <!--分页-->
    <div class="block" style="margin-top: 30px;">
      <el-pagination
        style="float: right;"
        @current-change="advertisementPageChange"
        :current-page=10
        layout="total, prev, pager, next"
        :total="allAdvertisementPageNum">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import {
    advertisementList,
    searchShop,
    deleteAdver,
    upperLower,
    poolListInterface,
    deletepoolList,
    addPoolList,
    addPoolupperLower,
    awardPoolEditor,
    msgAwardPoolEditor,
    setShowGoodList,
    selectionCheckBox,
    addAdvertisementReturn,
    earchShop } from '@/api/advertising/advertising'
    export default {
        name: "advertising",

      data(){
          return{
            advertisementAwarry:[],//广告列表数组
            adverCommodityName:'',//商品名称
            adverCommodityStatus:'',//商品状态
            deleteShow:false,//删除广告弹框
            dialogVisible:false,//删除广告失败弹框
            shelfLowerShelf:'',//
            adverDialogVisible:'',//删除失败内容上架下架
            adverdeleteTitle:'',//删除弹框title
            sendDeleteId:'',//删除获取ID
            statusUperlower:'',//上下架当前状态
            popHideandShow:'',//弹框提示内容
            jackpotTitle:'',//奖池title
            jackpotShow:false,//设置奖池显示隐藏
            acceptingPlollList:[],//奖池返回列表
            jackpotdeletChange:'',//奖池删除获取当前行ap_id
            addJackpotTitle:'',//设置奖池添加title
            addJackpotShow:false,//设置奖池添加弹框显示隐藏
            variableJackpotUpper:'',//奖池上下架变量
            variableJackpotID:'',//奖池上下架ID
            titleMerchandise:'商品列表',//设置显示商品=>商品列表title
            addJackpotRowList:{},//奖池编辑row.row.list
            showListOfMerchandise:false,//设置显示商品=>商品列表显示隐藏
            inputGoddsName:'',//设置显示商品=>商品列表输入名称
            inputGoddsType:'',//设置显示商品=>商品列表选择类型
            goodListPage:{},//设置显示商品=>商品列表分页
            page:'',//设置显示商品=>商品列表当前页数
            goodsListReturn:[],//商品列表
            setShowListMsg:[],//设置显示商品列表
            addAdvertisementTitle:'',//广告弹框Title
            addAdvertisementHide:false,//广告弹框显示隐藏
            advertisementListPage:{},//广告列表分页
            allAdvertisementPageNum:'',//广告列表分页总数
            listPage:'1',//传给后台的广告列表的当前分页
            objAddAdvertisemen:{
              name:'',
              id:''
            },//增加广告moudle值
            aloneCheckBoxList:[
            ],//点击单个boxcheck
            sendAddJackpot:{
              ap_id:'',
              low_score:'',
              high_score:'',
              name:'',
              points:''
            },//奖池添加给后台参数
            searchAdvertising:{
              name:"",
              upperFrame:''
            },
            listMsg:[
              {
                id:"1",
                name:"广告"
              },{
                id:"1",
                name:"广告"
              },{
                id:"1",
                name:"广告"
              },
            ]
          }
      },
      created(){
        this.searchListAdver()
      },

      methods:{
        handleCurrentChange() {},
        handleSizeChange() {},
        //查询列表
        searchListAdver(){
          let sendSearchList = {
            ad_name:this.adverCommodityName,
            status:this.adverCommodityStatus,
            page:1
          }
          advertisementList(sendSearchList).then(res =>{
            if (res.data.code == 0){
              this.advertisementAwarry = res.data.result.list;
              this.advertisementListPage = res.data.result.paginate
              this.allAdvertisementPageNum = this.advertisementListPage.record_count/1
              if (res.data.result.status == 0){
                this.shelfLowerShelf = '下架'
              }else{
                this.shelfLowerShelf = '上架'
              }
            }
          })
        },

        // 广告列表分页
        advertisementPageChange(value){
          this.listPage = value
          console.log(this.listPage);
          let sendSearchList = {
            ad_name:this.adverCommodityName,
            status:this.adverCommodityStatus,
            page:this.listPage
          }
          advertisementList(sendSearchList).then(res =>{
            if (res.data.code == 0){
              this.advertisementAwarry = res.data.result.list;
              this.advertisementListPage = res.data.result.paginate
              this.allAdvertisementPageNum = this.advertisementListPage.record_count/1
              if (res.data.result.status == 0){
                this.shelfLowerShelf = '下架'
              }else{
                this.shelfLowerShelf = '上架'
              }
            }
          })
        },

        //添加广告
        addAdvertisementBtn(){
          this.addAdvertisementHide = true
          this.addAdvertisementTitle = '添加广告'
        },
        //添加广告确认按钮
        inputAddAdvertisement(){
          let sendaddAdvertisement ={
            name : this.objAddAdvertisemen.name,
            id : this.objAddAdvertisemen.id
          }
          addAdvertisementReturn(sendaddAdvertisement).then(res=>{
            if (res.data.code == 0){
              this.dialogVisible = true;
              this.adverDialogVisible = res.data.result
              this.addAdvertisementHide = false
              this.searchListAdver()
            }else{
              this.dialogVisible = true;
              this.adverDialogVisible = res.data.msg
            }
          })
        },

        //删除广告
        deletListeBtn(row,scope){
          this.deleteShow = true
          this.sendDeleteId = row.row.aid;
          this.popHideandShow='确认删除？'
          this.adverdeleteTitle = '删  除'
        },
        //弹框确认按钮
        sureDeletListeBtn(){
          // let sendAdverDelete = {
          //   ad_id: this.sendDeleteId
          // }
          // console.log(sendAdverDelete);
          if (this.popHideandShow == '确认删除？') {
            deleteAdver({ad_id: this.sendDeleteId}).then(res =>{
              if (res.data.code == 0){
                this.deleteShow = false;
              }else{
                this.dialogVisible = true;
                this.adverDialogVisible = res.data.msg;
              }
            })
          }else if(this.popHideandShow=='广告确认下架？' || this.popHideandShow== '广告确认上架？'){
            if (this.statusUperlower == 0){
              this.statusUperlower = 1
            }else{
              this.statusUperlower = 0
            }
            let sendstatusUpper={
              ad_id:this.sendDeleteId,
              status:this.statusUperlower
            };
            upperLower(sendstatusUpper).then(res =>{
                if (res.data.code == 0){
                  this.deleteShow = false;
                  this.searchListAdver()
                }else{
                  this.dialogVisible = true;
                  this.adverDialogVisible = res.data.msg
                }
            })
          }else if(this.popHideandShow =='是否删除？'){
            deletepoolList({ap_id:this.jackpotdeletChange}).then(res =>{
              if (res.data.code == 0){
                this.deleteShow = false;
                poolListInterface({ad_id:this.sendDeleteId}).then(res =>{
                  if (res.data.code == 0){
                    this.acceptingPlollList = res.data.result
                    console.log(this.acceptingPlollList);
                  }
                })
              }
            })
          }else if(this.popHideandShow =='奖池确认下架？' || this.popHideandShow =='奖池确认上架？'){
            let sendAddPoolupperLower ={
              ap_id : this.variableJackpotID,
              status : this.variableJackpotUpper
            }
            addPoolupperLower(sendAddPoolupperLower).then(res =>{
              if (res.data.code = 0){
                this.deleteShow = false
              } else{
                this.dialogVisible = true;
                this.adverDialogVisible = res.data.msg
              }
            })
          }
        },

        //上架
        upperAndlower(row,scope){
          this.deleteShow = true
          this.sendDeleteId = row.row.aid;
          this.statusUperlower = row.row.status;
          if (row.row.status == 1){
            this.popHideandShow='广告确认下架？';
            this.adverdeleteTitle='广告下架'
          } else{
            this.popHideandShow='广告确认上架？';
            this.adverdeleteTitle='广告上架'
          }
        },


        //设置显示商品
        goodsShow(row,scope){
          console.log(row);
          this.jackpotShow = true
          this.jackpotTitle = '设置显示商品'
          this.sendDeleteId = row.row.aid
          setShowGoodList({ad_id:this.sendDeleteId}).then(res =>{
            this.setShowListMsg = res.data.result
          })
        },

        //设置显示商品=>添加=>查询列表
        goodsListAddShow(){
          let sendSearchShop = {
            goods_name :this.inputGoddsName,
            status:this.inputGoddsType,
            page:this.page
          }
          searchShop(sendSearchShop).then(res =>{
            this.goodsListReturn = res.data.result.list
            this.goodListPage = res.data.result.paginate
            console.log(this.goodListPage);
          })
        },
        // 勾选checkbox
        selectCheckBox(selection,row){
          console.log(selection);
          console.log(row);
          // if (this.aloneCheckBoxList.length==0){
          //   this.aloneCheckBoxList.push(selection.gid)
          // }else{
          //   for (var i=0; i<this.aloneCheckBoxList.length; i++){
          //     if (this.aloneCheckBoxList[i] == row.gid){
          //
          //     }else{
          //       this.aloneCheckBoxList.push(row.gid)
          //     }
          //   }
          // }

          for (var i=0; i<selection.length; i++){
            this.aloneCheckBoxList.push(selection[i].gid)
          }
          this.aloneCheckBoxList.join(',')
          console.log(this.aloneCheckBoxList);
        },
        // 取消chekbox
        // selectCheckBoxChange(){
        //   console.log(2222);
        // },

        // 商品列表分页切换
        handleCurrentChange(value){
          this.page = value
          console.log(this.page);
          this.goodsListAddShow()
        },
        // 添加商品确认按钮
        shopListBtn(){
          let aa = this.aloneCheckBoxList.join(',')
          let sendSelection ={
            ad_id : this.sendDeleteId,
            goods_id:aa
          }
          selectionCheckBox(sendSelection).then(res =>{
            if (res.data.code == 0){
              this.showListOfMerchandise = false;
              this.dialogVisible = true;
              this.adverDialogVisible = res.data.result
              setShowGoodList({ad_id:this.sendDeleteId}).then(res =>{
                this.setShowListMsg = res.data.result
              })
            }else{
              this.dialogVisible = true;
              this.adverDialogVisible = res.data.msg
            }
          })
        },

        //设置奖池
        setUpaPrizePool(row,scope){
          this.jackpotShow = true;
          this.jackpotTitle = '设置奖池'
          this.sendDeleteId = row.row.aid;
          poolListInterface({ad_id:this.sendDeleteId}).then(res =>{
            if (res.data.code == 0){
              this.acceptingPlollList = res.data.result
              console.log(this.acceptingPlollList);
            }
          })
        },


        // 奖池/设置显示商品增加按钮
        addJackpotListNew(){
          if (this.jackpotTitle == '设置奖池') {
            this.addJackpotShow = true
            this.addJackpotTitle ='设置奖池-添加'
            this.sendAddJackpot=[]
          }else if(this.jackpotTitle == '设置显示商品'){
            this.showListOfMerchandise = true
            this.aloneCheckBoxList = []
          }
        },

        // 设置奖池/设置显示商品 确认按钮
        jackpotSureBtn(){
          this.jackpotShow = false
        },

        //奖池编辑
        jackpotSet(row,scope){
          this.sendAddJackpot=[]
          this.addJackpotTitle = '设置奖池-编辑';
          this.addJackpotRowList = row.row
          msgAwardPoolEditor({ap_id:row.row.ap_id}).then(res =>{
            if (res.data.code == 0){
              this.addJackpotShow = true
              this.sendAddJackpot.ap_id = res.data.result.ap_id
              this.sendAddJackpot.points = res.data.result.points
              this.sendAddJackpot.low_score = res.data.result.low_score
              this.sendAddJackpot.high_score = res.data.result.high_score
              this.sendAddJackpot.name = res.data.result.name
            }
          })

        },




        //奖池上架
        jackpotUpper(row,scope){
          console.log(row);
          this.deleteShow = true;
          this.variableJackpotID = row.row.ap_id
          this.variableJackpotUpper = row.row.status
          if (this.variableJackpotUpper == 1){
            this.popHideandShow='奖池确认下架？';
            this.adverdeleteTitle='奖池下架'
          } else{
            this.popHideandShow='奖池确认上架？';
            this.adverdeleteTitle='奖池上架'
          }
          if (this.variableJackpotUpper == 0){
            this.variableJackpotUpper = 1
          }else{
            this.variableJackpotUpper = 0
          }

        },
        //奖池删除
        jackpotdeletBtn(row,scope){
          this.jackpotdeletChange = row.row.ap_id;
          this.deleteShow = true;
          this.adverdeleteTitle = '删  除';
          this.popHideandShow = '是否删除？'
        },

        // 设置奖池 添加/编辑 弹框确认按钮
        addJackpotSure(){
          if (this.addJackpotTitle == '设置奖池-添加'){
            let sendAllAddKackpot = {
              low_score:this.sendAddJackpot.low_score,
              high_score:this.sendAddJackpot.high_score,
              name:this.sendAddJackpot.name,
              points:this.sendAddJackpot.points,
              ad_id:this.sendDeleteId
            }
            addPoolList(sendAllAddKackpot).then(res =>{
              if (res.data.code == 0){
                this.addJackpotShow = false
                this.dialogVisible =true;
                this.adverDialogVisible = '添加成功'
              } else{
                this.dialogVisible = true;
                this.adverDialogVisible = res.data.msg
                return
              }
            })
          }else if(this.addJackpotTitle == '设置奖池-编辑'){
            //奖池编辑确认
            if (this.sendAddJackpot.low_score>=this.sendAddJackpot.high_score){
              this.dialogVisible =true;
              this.adverDialogVisible = '最低分必须小于最高分'
              return
            }
            let sendAddJackpotTitle ={
              ap_id : this.sendAddJackpot.ap_id,
              points : this.sendAddJackpot.points,
              low_score : this.sendAddJackpot.low_score,
              high_score :this.sendAddJackpot.high_score,
              name : this.sendAddJackpot.name
            }
            awardPoolEditor(sendAddJackpotTitle).then(res =>{
              if (res.data.code == 0){
                this.addJackpotShow = false
                this.dialogVisible =true;
                this.adverDialogVisible = '修改成功'
                poolListInterface({ad_id:this.sendDeleteId}).then(res =>{
                  if (res.data.code == 0){
                    this.acceptingPlollList = res.data.result
                    console.log(this.acceptingPlollList);
                  }
                })
              }
            })
          }
        },
        judgementSize(){
          if (this.sendAddJackpot.low_score>=this.sendAddJackpot.high_score) {
            this.dialogVisible =true;
            this.adverDialogVisible = '最低分必须小于最高分'
          }
        }
      }
    }
</script>



<style  lang="scss" scoped>
  @import "../../styles/common.scss";
.advertising-message{
  padding: 20px;
}
  .list-advertising{
    margin-top: 20px;
  }
  .list-advertising .add-btn{
    float: right;
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

</style>
