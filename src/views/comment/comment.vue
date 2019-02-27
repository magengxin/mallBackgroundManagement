<template>
    <div class="app-container">
      <div class="search-form">
        <el-form :inline="true" :model="commentRequest" class="demo-form-inline">
          <el-form-item>
            <el-form-item style="margin-left: 20px">
              <el-input clearable v-model="commentRequest.nick_name" placeholder="昵称"/>
            </el-form-item>
            <el-form-item style="margin-left: 20px">
              <el-input clearable v-model="commentRequest.goods_name" placeholder="商品名称"/>
            </el-form-item>
            <el-select v-model="commentRequest.is_check" clearable placeholder="兑换类型">
              <el-option label="通过" value="1"/>
              <el-option label="未通过" value="0"/>
            </el-select>
            <el-date-picker
              clearable
              v-model="commentRequest.start_create_time"
              type="date"
              placeholder="选择日期"
              style="margin-left: 20px"
            />
            <el-date-picker
              clearable
              v-model="commentRequest.end_create_time"
              type="date"
              placeholder="选择日期"
              style="margin-left: 20px"
            />
            <el-form-item>
              <el-button type="primary" style="margin-left: 20px" @click="searchCommentList">查询</el-button>
            </el-form-item>
          </el-form-item>
        </el-form>
      </div>


      <div class="list">
        <el-table ref="multipleTable" :data="commentListMsg" tooltip-effect="dark" border style="width: 100%">
          <el-table-column prop="id" label="ID" width="120" align="center">
            <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
          </el-table-column>
          <el-table-column prop="nickName" align="center" label="昵称" width="120"/>
          <el-table-column prop="aa" align="center" label="商品类型" width="150"  />
          <el-table-column prop="goods_name" align="center" label="评论商品名称" />
          <el-table-column prop="content" align="center" label="评论内容" />
          <el-table-column prop="created_at" align="center" label="评论时间" />
          <el-table-column  align="center" label="审核" width="120"  show-overflow-tooltip>
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.is_check"
                :active-value="1"
                :inactive-value="0"
                @change="bannerImgChange(scope)"
              />
            </template>
          </el-table-column>
          <el-table-column align="center" label="推荐" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.recommend"
                :active-value="1"
                :inactive-value="0"
                @change="commentRecommend(scope)"
              />
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="150"  show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="success" @click="viewDetails(scope)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>


      <!--弹出框-->
      <div>
        <el-dialog  :title="addCommentTitle" :visible.sync="addComment" placement="" style="padding: 0;" width="600px">
          <div class="font-add">商品名称：{{commentContent.goods_name}}</div>
          <div class="font-add" style="margin-top: 30px">评论内容：</div>
          <div  style="margin-top: 5px">{{commentContent.content}}</div>
          <div class="font-add" style="margin-top: 30px">评论图片：</div>
          <div>
            <img  v-for="item in aa.img" :key="item" :src="item" alt="" style="width: 100px;height: 100px;margin-right: 10px">
          </div>
          <div class="font-add" style="margin-top: 30px">回复：</div>
          <el-input
            type="textarea"
            style="margin-top: 5px"
            v-model="reply"
            :autosize="{minRows: 2, maxRows: 4}"
            placeholder="请输入回复内容"
          >

          </el-input>
          <el-button style="margin-top: 30px" type="primary" @click="commentMsgBtn">确定</el-button>

        </el-dialog>
      </div>


      <!--提示框-->
      <el-dialog
        title="提示"
        :visible.sync="btnTips"
        width="30%"
        align="center">
        <span style="font-size: 16px; color: darkred;font-weight: bold">{{adverDialogVisible}}</span>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="btnTips = false">确 定</el-button>
  </span>
      </el-dialog>


      <!--分页-->
      <div class="paginate">
        <el-pagination
          :current-page="commentPageList.currentPage"
          :total="commentPageList.record_count"
          :page-size="commentPageList.page_size"
          layout="total,  prev, pager, next, jumper"
          @current-change="commentPageHtml"
        />
      </div>
    </div>
</template>

<script>
  import { commentList,toExamine,Recommend,commentMsg,openCommentMsg } from '@/api/comment/comment'

    export default {
        name: "comment",
      data(){
          return{
            addComment:false,//弹框显示
            addCommentTitle:'',
            btnTips:false,//提示框显示
            adverDialogVisible:'',//提示框文字提示
            commentListMsg:[],//评价列表接口返回
            // commentProhibit:'',//推荐禁止
            commentContent:{},// 接口返回评论内容
            reply:'',//评论回复
            commentPageList:{},//评论列表分页接口返回
            commentId:'',
            aa:{
              img:''
            },
            commentRequest:{
              nick_name:'',
              goods_name:'',
              is_check:'',
              start_create_time:'',
              end_create_time:'',
              page:'1'
            },
          }
      },
      created(){
          this.searchCommentList()
      },
      methods:{
          // 查询
        searchCommentList(){
          let start = Date.parse(this.commentRequest.start_create_time) / 1000;
          let end = Date.parse(this.commentRequest.end_create_time) / 1000;
          // this.commentRequest.start_create_time = Date.parse(this.commentRequest.start_create_time) / 1000;
          // this.commentRequest.end_create_time = Date.parse(this.commentRequest.end_create_time) / 1000;
          let sendcommentRequest = {
            nick_name : this.commentRequest.nick_name,
            goods_name : this.commentRequest.goods_name,
            is_check : this.commentRequest.is_check,
            start_create_time : start,
            end_create_time : end,
            page : this.commentRequest.page
          }
          commentList(sendcommentRequest).then(res=>{
            if (res.data.code == 0){
              this.commentListMsg = res.data.result.list
              this.commentPageList = res.data.result.paginate
              console.log(this.commentPageList);
            }
          })
        },
        // 打开评论详情
        viewDetails(row,scope){
          this.commentId = row.row.id
          this.addComment = true;
          this.addCommentTitle = '详情'
          openCommentMsg({id:row.row.id}).then(res=>{
            this.commentContent = res.data.result
            this.aa.img  = this.commentContent.imgs.split(',')
            console.log(this.aa);

          })
        },
        // 评论详情确认按钮
        commentMsgBtn(){
          let senCommentMsg = {
            id:this.commentId,
            reply:this.reply
          }
          commentMsg(senCommentMsg).then(res=>{
            if (res.data.code == 0){
              this.addComment = false
            }
          })
          this.reply = ''
        },

        // 分页
        commentPageHtml(idx){
          this.commentRequest.page = idx
          this.searchCommentList()
        },
        // 审核
        bannerImgChange(row,scope){
          console.log(row);
          let id = row.row.id
          let rowIsCheck = row.row.is_check
          if (rowIsCheck == 0){
            let sendRecommend = {
              recommend:0,
              id : id
            }
            Recommend(sendRecommend).then(res=>{
              if (res.data.code == 0){

              }else{
                this.btnTips = true
                this.adverDialogVisible = res.data.msg
              }
            })
          }
          let sendRequest = {
            id : id,
            is_check : rowIsCheck
          }
          toExamine(sendRequest).then(res=>{
            if (res.data.code == 0){

            }else{
              this.btnTips = true
              this.adverDialogVisible = res.data.msg
            }
            this.searchCommentList()
          })
        },

        // 推荐
        commentRecommend(row,scope){
          console.log(row);
          let id = row.row.id
          let recommend = row.row.recommend
          let sendRecommend = {
            recommend:recommend,
            id : id
          }
          Recommend(sendRecommend).then(res=>{
            if (res.data.code == 0){

            }else{
              this.btnTips = true
              this.adverDialogVisible = res.data.msg
            }
            this.searchCommentList()
          })
        },



      }
    }
</script>

<style lang="scss" scoped>
  @import '../../styles/common.scss';
.font-add{
  font-size: 16px;
  font-weight: bold;
  color: #000;
}
</style>
