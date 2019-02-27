<template>
    <div class="app-container">
      <div>
        <el-form :inline="true" :model="formdata" class="demo-form-inline">
          <el-form-item>
            <el-input clearable v-model="formdata.name" placeholder="姓名/ID"/>
          </el-form-item>
          <el-form-item>
            <el-input clearable v-model="formdata.name" placeholder="登录账号"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button type="primary" @click="userAdd()">添加</el-button>
          </el-form-item>
        </el-form>
      </div>


      <div class="admin-list">
        <el-table ref="multipleTable" :data="aaa" tooltip-effect="dark" border style="width: 100%">
          <el-table-column prop="a" label="ID" align="center"/>
          <el-table-column prop="a" align="center" label="姓名"/>
          <el-table-column prop="a" align="center" label="登录账户" />
          <el-table-column prop="a" align="center" label="管理员" />
          <el-table-column  align="center" label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="success" @click="changePassword">重置密码</el-button>
              <el-button type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--添加弹出框-->
      <div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="500px">
          <el-form v-if="dialogTitle=='添加'" :label-position="labelPositoin" label-width="100px">
            <el-form-item label="姓名" >
              <el-input v-model="formdata.name" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="账户名称" >
              <el-input v-model="formdata.name" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="密码" >
              <el-input v-model="formdata.name" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="账户名称" >
              <el-input v-model="formdata.name" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="权限">
              <el-select clearable v-model="formdata.name">
                <el-option label="普通管理员" value="1"/>
                <el-option label="超级管理员" value="0"/>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form v-if="dialogTitle=='修改密码'" :label-position="labelPositoin">
            <el-form-item >
              <el-input v-model="formdata.name" autocomplete="off" placeholder="原始密码"/>
            </el-form-item>
            <el-form-item>
              <el-input v-model="formdata.name" autocomplete="off" placeholder="新密码"/>
            </el-form-item>
            <el-form-item>
              <el-input v-model="formdata.name" autocomplete="off" placeholder="确认新密码"/>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
            <el-button type="primary">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
</template>

<script>
    export default {
        name: "administrators",
      data(){
          return{
            labelPositoin:'right',
            dialogTitle:'',//添加弹出框Title
            dialogFormVisible:false,//添加弹出框显示
            formdata:{
              name:''
            },
            aaa:[
              {a:1}
            ]
          }
      },
      methods:{

          //添加用户
        userAdd(){
          this.dialogTitle = '添加'
          this.dialogFormVisible = true;

        },

        //修改密码
        changePassword(){
          this.dialogTitle = '修改密码'
          this.dialogFormVisible = true;
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import '../../styles/common.scss';
.admin-list{
  margin-top: 60px;
}
  .el-input {
    width: 200px;
  }
</style>
