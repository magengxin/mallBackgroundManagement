<template>
  <div class="app-container">
    <div class="search-form">
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="formData.type" clearable placeholder="兑换类型">
            <el-option label="实物" value="1"/>
            <el-option label="优惠券" value="2"/>
            <el-option label="卡券" value="3"/>
          </el-select>
          <el-form-item style="margin-left: 20px">
            <el-input clearable v-model="formData.local_order_no" placeholder="订单号"/>
          </el-form-item>
          <el-form-item style="margin-left: 20px">
            <el-input clearable v-model="formData.nick" placeholder="昵称"/>
          </el-form-item>
          <el-form-item style="margin-left: 20px">
            <el-input clearable v-model="formData.recipient" placeholder="收货人"/>
          </el-form-item>
          <el-form-item style="margin-left: 20px">
            <el-select v-model="formData.order_status" clearable placeholder="订单状态">
              <el-option label="待付款" value="0"/>
              <el-option label="待发货" value="1"/>
              <el-option label="已发货" value="2"/>
              <el-option label="未支付取消" value="3"/>
              <el-option label="退货" value="4"/>
              <el-option label="未发货申请退款" value="5"/>
              <el-option label="退款成功" value="6"/>
              <el-option label="确认收货" value="7"/>
              <el-option label="已评价" value="8"/>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-top: 20px">
          <el-date-picker
            clearable
            v-model="start_time"
            type="date"
            placeholder="选择日期"
          /></el-form-item>
          <el-form-item style="margin-top: 20px">
          <el-date-picker
            clearable
            v-model="end_time"
            type="date"
            placeholder="选择日期"
          /></el-form-item>
          <el-form-item style="margin-top: 20px">
            <el-input clearable v-model="formData.goods_name" placeholder="商品名称"/>
          </el-form-item>
        </el-form-item>
        <el-form-item style="margin-left: 20px;float: right ">
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="primary" @click="downExcel">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list">
      <el-table
        ref="multipleTable"
        :data="orderList"
        tooltip-effect="dark"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="id" label="商品id" width="100" align="center"></el-table-column>
        <el-table-column prop="user_id" label="用户id" width="100" align="center"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="200" align="center"></el-table-column>
        <el-table-column align="center" label="兑换类型" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.type==1">实物</span>
            <span v-if="scope.row.type==2">优惠券</span>
            <span v-if="scope.row.type==3">卡券</span>
          </template>
        </el-table-column>
        <el-table-column prop="local_order_no" align="center" label="订单号" show-overflow-tooltip></el-table-column>
        <el-table-column  align="center" label="下单时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.order_create_time | detailTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="nick_name"
          align="center"
          label="昵称"
          width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="recipient"
          align="center"
          label="收货人"
          width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="deduction_amount"
          align="center"
          label="红包"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="actual_amount"
          align="center"
          label="实付"
          width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column align="center" label="订单状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.order_status==0">待付款</span>
            <span v-if="scope.row.order_status==1">待发货</span>
            <span v-if="scope.row.order_status==2">已发货</span>
            <span v-if="scope.row.order_status==3">未支付取消</span>
            <span v-if="scope.row.order_status==4">退货</span>
            <span v-if="scope.row.order_status==5">未发货申请退款</span>
            <span v-if="scope.row.order_status==6">退款成功</span>
            <span v-if="scope.row.order_status==7">确认收货</span>
            <span v-if="scope.row.order_status==8">已评价</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button size="mini" type="info" @click="orderDetails(scope.row.id)">详情</el-button>
            <!-- <el-button size="mini"  type="warning" v-if="scope.row.order_status == 1" @click="deliverGoods()">发货</el-button> -->
            <!-- <el-button size="mini" type="warning" @click="deliverGoods()">发货</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paginate">
      <el-pagination
        :current-page="currentPage"
        :total="total"
        :page-size="page_size"
        layout="total,  prev, pager, next, jumper"
        @current-change="handleCurrentChange"
      />
    </div>

    <!--物流信息弹出框-->
    <div class="logistics-information">
      <el-dialog :title="informationTitle" :visible.sync="information" placement>
        <div class="order-msg">
          <p style="margin-bottom: 25px;margin-top: 0!important">订单信息</p>
          <div>
            <span>订单编号：{{logistInfos.local_order_no}}</span>
            <span style="margin-left: 100px">用户名：{{logistInfos.username}}</span>
          </div>
          <p>下单时间：{{logistInfos.order_create_time | detailTime}}</p>
          <p>支付时间：{{logistInfos.pay_request_time | detailTime}}</p>
          <p>发货时间：{{logistInfos.logistics_create_time | detailTime}}</p>
          <!-- <p v-if="couponClick">兑换时间：2018-10-22 10:10:10</p> -->
        </div>
        <div class="commodity-details">
          <p style="margin-bottom: 25px;margin-top: 0!important">商品详情</p>
          <el-table
            ref="multipleTable"
            :data="goodsDetail"
            tooltip-effect="dark"
            border
            style="width: 100%;margin-bottom:50px"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              prop="gid"
              align="center"
              label="ID"
              width="150"
              show-overflow-tooltip
            />
            <el-table-column prop="goodsName" align="center" label="商品名称" show-overflow-tooltip/>
            <el-table-column
              prop="goodsValue"
              align="center"
              label="价值"
              width="150"
              show-overflow-tooltip
            />
            <el-table-column prop="goodsNum" align="center" label="商品件数" show-overflow-tooltip/>
            <el-table-column
              prop="goodsValue"
              align="center"
              label="红包"
              width="150"
              show-overflow-tooltip
            />

          </el-table>
         <p style="margin-top: 10px;text-align:right">实付：￥{{logistInfos.actual_amount}} 元</p>
        </div>
        <div class="consignee" v-if="consignee">
          <p style="margin-bottom: 25px;margin-top: 0!important">收货人信息</p>
          <p>收货人：{{consigneeInfo.recipient}}</p>
          <p> 联系电话：{{consigneeInfo.tel}}</p>
          <p>收货人地址：{{consigneeInfo.address}}</p>
        </div>
        <div v-if="logisticsMsgTitlandBtn" class="concrete-logistics">
          <p>物流信息</p>
          <div>物流公司 &nbsp;
            <el-input class="order-logistics-consignee-input" v-model="logistInfos.logistics_company" placeholder="请输入内容"/>
          </div>
          <div class="single-number">物流单号 &nbsp;
            <el-input class="order-logistics-consignee-input" v-model="logistInfos.logistics_no" placeholder="请输入内容"/>
          </div>
          <!-- <div v-if="logisticsMsg" class="express-where">
            <p>2018年10月17日 上午9:06:44</p>
            <p>在上海杨浦区周家嘴路公司进行派件扫描；派送业务员：武洋洋；联系电话：18017155475</p>
            <p>2018年10月16日 上午5:42:39</p>
            <p>从上海分拨中心发出，本次转运目的地：上海杨浦区周家嘴路公司</p>
            <p>2018年10月16日 上午5:37:18</p>
            <p>在分拨中心上海分拨中心进行卸车扫描</p>
            <p>2018年10月15日 下午9:18:55</p>
            <p>在安徽合肥分拨中心进行装车扫描，发往：上海分拨中心</p>
            <p>2018年10月15日 下午9:01:39</p>
            <p>在安徽合肥分拨中心进行中转集包扫描，发往：上海分拨中心</p>
            <p>2018年10月15日 下午8:58:37</p>
            <p>在分拨中心安徽合肥分拨中心进行称重扫描</p>
            <p>2018年10月15日 下午6:00:13</p>
            <p>在安徽合肥绿地赢海公司邦航商贸KH服务部进行到件扫描</p>
          </div >-->
        </div>
        <div v-if="logisticsMsgTitlandBtn" class="sureand-close">
          <el-row>
            <el-button type="success" style="float: left;" v-if="logistInfos.orderStatus == 1" @click="confirmDelivery">确认发货</el-button>
            <el-button type="primary" style="float: right;" @click="closeLogistics">确定</el-button>
            <el-button type="info" style="float: right; margin-right: 2%" @click="closeLogistics">取消</el-button>
          </el-row>
        </div>
      </el-dialog>
    </div>

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
</template>
<script>
import { orderList, orderDetail ,confirmDelivery,exportExcel} from "@/api/orderManage/index";
export default {
  data() {
    return {
      detailsPop: false, // 详情进去弹出框
      information: false,
      // 不同btn进入pop页面内容显示隐藏
      logisticsClick: true, // 查看物流
      couponClick: true, // 优惠券详情
      logisticsMsg: true, // 物流信息模块
      logisticsMsgTitlandBtn: true, // 物流信息模块（包括头部）、底部按钮
      dialogVisible:false,
      adverDialogVisible:'',
      informationTitle: "订单详情",
      start_time: "",
      end_time: "",
      orderList: [],
      total: 0,
      consignee: false, // 是否显示收货人信息 实物显示 优惠券不显示
      consigneeInfo: { // 收货人信息
       recipient: '',
       tel: '',
       address: ''
      },
      logistInfos: {

      }, // 物流信息

      formData: {
        type:'',
        status: "", //商品类型
        local_order_no: "", //订单号
        recipient: "", //收件人
        nick: "", //昵称
        start_order_create_time: "", //开始时间
        end_order_create_time: "", //结束时间
        page: 1,
        goods_name:'',//商品名称
        order_status:'',//订单状态
      },
      currentPage: 1,
      goodsDetail: [],
      page_size: 1,
      tableData: [
        {
          name: 333
        },
        {
          name: 333
        },
        {
          name: 333
        }
      ]
    };
  },
  created() {
    this.fetchList();
  },
  methods: {
    formatJson(filterVal, jsonData){
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j]

        })
      )
    },
    downExcel(){
      let sendExportExcel = {
        type:this.formData.type,//商品类型
        local_order_no:this.formData.local_order_no,//订单号
        recipient:this.formData.recipient,//收件人
        nick: this.formData.nick,//昵称
        start_order_create_time:this.start_time,
        end_order_create_time: this.end_time,
        order_status : this.formData.order_status,//订单状态
        goods_name : this.formData.goods_name//商品名称
      }
      exportExcel(sendExportExcel).then(res => {
        if (res.data.result.length == 0){
          this.dialogVisible = true
          this.adverDialogVisible = '暂无数据'
          return
        }
        for (var i=0; i<res.data.result.length; i++){
          if (res.data.result[i].order_status == 0){
            res.data.result[i].order_status='待付款'
          }else if (res.data.result[i].order_status == 1){
            res.data.result[i].order_status='待发货'
          }else if (res.data.result[i].order_status == 2){
            res.data.result[i].order_status='已发货'
          }else if (res.data.result[i].order_status == 3){
            res.data.result[i].order_status='未支付取消'
          }else if (res.data.result[i].order_status == 4){
            res.data.result[i].order_status='退货'
          }else if (res.data.result[i].order_status == 5){
            res.data.result[i].order_status='未发货申请退款'
          }else if (res.data.result[i].order_status == 6){
            res.data.result[i].order_status='退款成功'
          }
        }
        let tharr = Object.keys(res.data.result[0])
        import("@/vendor/Export2Excel").then(excel => {
        let theader =[
          '订购日期','销售平台','仓库商品代码','商品名称','规格','单价','订购数量','金额','收货人姓名','联系电话','省','市','区','收货地址','快递名称','订单状态','重量','快递费用','订单编号','昵称'
        ]
        let filterVal = ['datetime','','','goods_name','','value','goods_num','actual_amount','recipient','tel','province','city','area','address','logistics_company','order_status','','','local_order_no','nickName']
        const data = this.formatJson(filterVal,res.data.result)
          // return
        // const data = this.formatJson(filterVal,t1)
        let [name,fileType] = ['测试导出','xlsx']
        excel.export_json_to_excel(theader,data,'订单','xlsx')
      })
      })
      //   let tdata= [{'name': "1",'age':"2"},{'name': 45,'age': '99'}]
      //   // let t1 = tdata[0]
      //    let tharr = ['name','age']
      // import("@/vendor/Export2Excel").then(excel => {
      //   let theader = ['name','age']
      //   let filterVal = ['name','age']
      //   const data = this.formatJson(filterVal,tdata)
      //   // const data = this.formatJson(filterVal,t1)
      //   // let [name,fileType] = ['测试导出','xlsx']
      //   excel.export_json_to_excel(theader,data,'测试导出','xlsx')
      // })
    },
    fetchList() {
      this.formData.start_order_create_time =
        Date.parse(this.start_time) / 1000;
      this.formData.end_order_create_time = Date.parse(this.end_time) / 1000;
      orderList(this.formData).then(res => {
        if (res.data.code == 0) {
          this.orderList = res.data.result.list;
           this.currentPage = res.data.result.paginate.current_page/1
           this.page_size =res.data.result.paginate.page_size/1
          this.total = res.data.result.paginate.record_count / 1;
        } else {
          this.$message({
            type: "warning",
            msg: res.data.msg
          });
        }
      });
    },
    orderDetails(id) {
      orderDetail({ order_id: id }).then(res => {
        if (res.data.code == 0) {
          this.information = true
          this.logistInfos.username = res.data.result.user_name || ''
          this.logistInfos.local_order_no = res.data.result.local_order_no || ''
          this.logistInfos.order_create_time =
            res.data.result.order_create_time || '';
          this.logistInfos.pay_request_time = res.data.result.pay_request_time || ''
          if(res.data.result.pay_request_time == 0) {
             this.logistInfos.pay_request_time = '待支付'
          }else {

          }
          // 收货人信息
          this.consigneeInfo.recipient = res.data.result.recipient
          this.consigneeInfo.tel = res.data.result.tel
          this.consigneeInfo.address = res.data.result.province + ' ' + res.data.result.city + ' ' +res.data.result.area+ ' ' + res.data.result.address
          this.consignee = res.data.result.type == 1 ? this.consignee = true: this.consignee = false
          // loginsinfos
          this.logistInfos.order_id = res.data.result.id // orderid
          this.logistInfos.orderStatus = res.data.result.order_status
          this.logistInfos.actual_amount = res.data.result.actual_amount || ''
          this.logistInfos.logistics_create_time =
            res.data.result.logistics_create_time || '';
          if (res.data.result.logistics_id <= 0) { // 没有物流id 发货时间显示未发货
            this.logistInfos.logistics_create_time = "未发货";
          }
          this.logistInfos.logistics_company = res.data.result.logistics_company || '暂无信息' // 字段为空表示未发货 显示未发货
          this.logistInfos.logistics_no = res.data.result.logistics_no || '暂无信息'
          this.goodsDetail = [
            {
              gid: res.data.result.gid,
              goodsName: res.data.result.goods_name,
              goodsValue: res.data.result.value,
              goodsNum: res.data.result.goods_num
            }
          ];
        } else {
          this.$message({
            type: "warning",
            message: res.data.msg
          });
        }
      });
    },
    confirmDelivery () { // 确认发货
      let obj = {
        order_id: this.logistInfos.order_id,
        logistics_company: this.logistInfos.logistics_company,
        logistics_no: this.logistInfos.logistics_no,
      }
      confirmDelivery(obj).then( res => {
      if(res.data.code == 0) {
        this.information = false
        this.$message({
          type: 'success',
          message: '发货成功'
        })
        this.fetchList()
      }else {
        this.$message({
          type: 'warning',
          message: res.data.msg
        })
      }
  })
    },
    // 点击物流进去pop
    logisticsInformation() {
      this.information = true;
      this.logisticsClick = true;
      this.couponClick = false;
      this.logisticsMsg = true;
      this.logisticsMsgTitlandBtn = true;
    },
    // 点击发货进去pop
    deliverGoods() {
      this.information = true;
      this.logisticsMsg = false;
      this.logisticsMsgTitlandBtn = true;
    },
    // 点击详情进去pop
    commodityDetails() {
      this.information = true;
      this.couponClick = false;
      this.logisticsMsgTitlandBtn = false;
    },
    closeLogistics() {
      this.information = false;
    },
    addGoods() {
      this.$router.push({ path: "/goodsManage/addGoods" });
    },
    handleSizeChange() {},
    handleCurrentChange(val) {
      this.formData.page = val;
      this.fetchList();
    },
    onSearch() {
      this.formData.page = 1
      this.fetchList();
    },

    handleSelectionChange() {}
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/common.scss";
.list {
  text-align: right;
}
.order-msg {
  border-top: 1px solid #606266;
}
.order-msg {
  padding-top: 20px;
}
.consignee p,
.order-msg p {
  margin-top: 15px;
}
.commodity-details {
  margin-top: 30px;
  border-top: 1px dashed #606266;
  padding-top: 20px;
}
.consignee {
  margin-top: 60px;
  border-top: 1px dashed #606266;
  padding-top: 20px;
  padding-bottom: 20px;
}
.concrete-logistics {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px dashed #606266;
}
.single-number {
  margin-top: 15px;
}
.express-where {
  margin-top: 45px;
  padding-left: 7%;
}
.sureand-close {
  margin-top: 30px;
}
</style>

