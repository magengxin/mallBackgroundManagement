<template>
    <div class="system app-container">
        <div class="set-common">
          <p>签到设置</p>
          <el-form :inline="true" :model="setupList" class="demo-form-inline" style="margin-top:30px ;">
            <el-form-item label="签到金额（元）">
            <el-input v-model="setupList.signin_step" placeholder="签到金额（元）"></el-input>
          </el-form-item>
          </el-form>
          <el-form :inline="true" :model="setupList" class="demo-form-inline">
            <el-form-item label="签到天数（天）">
              <el-input v-model="setupList.signin_days" placeholder="签到天数（天）"></el-input>
            </el-form-item>
          </el-form>
        </div>
      <div class="set-common" style="margin-top: 60px">
        <p>助力分享设置</p>
        <el-form :inline="true" :model="setupList" class="demo-form-inline" style="margin-top:30px ;">
          <el-form-item label="分享金额（元）">
            <el-input v-model="setupList.approve_points" placeholder="分享金额（元）"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="set-common" style="margin-top: 60px">
        <p>玩家首次获得现金设置</p>
        <el-form :inline="true" :model="setupList" class="demo-form-inline" style="margin-top:30px ;">
          <el-form-item label="首次金额（元）">
            <el-input v-model="setupList.user_first_points" placeholder="签到金额（元）"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="Preservation">保 存</el-button>
      </div>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        align="center">
        <span style="font-size: 16px; color: darkred;font-weight: bold">{{msgDialogVisible}}</span>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
      </el-dialog>
    </div>
</template>

<script>
  import {setupSave,obtain} from "@/api/systemSetup/systemSetup";

    export default {
        data(){
          return{
            setupList: {
              signin_step:'',
              signin_days:'',
              approve_points:'',
              user_first_points:''
            },
            obtainList:{},
            dialogVisible:false,
            msgDialogVisible:''
          }
        },
      created(){
        obtain().then( res=>{
          console.log(res);
          this.setupList = res.data.result
        })
      },
      methods :{
        Preservation(){
          setupSave(this.setupList).then(res =>{
            if (res.data.code == 0){
              this.dialogVisible = true;
              this.msgDialogVisible = '添加成功'
            }else{
              this.dialogVisible = true;
              this.msgDialogVisible = res.data.msg
            }
          })
        }
      }

    }
</script>

<style lang="scss" scoped>
  @import '../../styles/common.scss';
  .set-common p{
    color: darkred;
  }
  .demo-form-inline{
    width: 90%;
    margin: auto;

  }
  .dialog-footer{
    margin-top: 50px;
  }


</style>
