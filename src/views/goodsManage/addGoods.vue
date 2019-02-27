<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="130px">
      <el-form-item label="商品名称：">
        <el-input v-model="form.goods_name" clearable/>
      </el-form-item>
      <el-form-item label="副标题：">
        <el-input v-model="form.subtitle"/>
      </el-form-item>
      <el-form-item label="商品类型：">
        <el-select v-model="form.type" placeholder="请选择类型" @change="typeSelectChange"  clearable>
          <el-option
            v-for="item in activityTypes"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="分类：">
        <el-select v-model="form.category_id" clearable placeholder="请选择分类" @change="selectionType">
          <el-option v-for="item in sortClass" :key="item.category_name" :label="item.category_name"  :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="兑换红包：">
        <el-input v-model=""></el-input>
      </el-form-item>-->
      <el-form-item label="价值：">
        <el-input v-model="form.value" @change="computePostage" clearable/>
      </el-form-item>
      <el-form-item label="设置邮费：">
         <el-input v-model="form.postage" clearable/>
        <!--<el-tag type="success">{{computePostage}} 元</el-tag>-->
        <!-- <div>{</div> -->
      </el-form-item>
      <el-form-item label="商品库存：">
        <el-input v-model="form.stock" clearable/>
      </el-form-item>

      <el-form-item label="商品排序：">
        <el-input v-model="form.sort" clearable/>
      </el-form-item>

      <el-form-item label="商品标签：">
        <el-input v-model="form.tags" clearable/>
      </el-form-item>

      <el-form-item label="商品比价1：">
        <el-input v-model="form.one_mall" clearable/>
      </el-form-item>

      <el-form-item label="商品比价1链接：">
        <el-input v-model="form.one_mall_link" clearable/>
      </el-form-item>

      <el-form-item label="商品比价2：">
        <el-input v-model="form.two_mall" clearable/>
      </el-form-item>

      <el-form-item label="商品比价2链接：">
        <el-input v-model="form.two_mall_link" clearable/>
      </el-form-item>

      <!--banner图-->
      <el-form-item label="banner图：">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl + '/backend/goods/upload'"
          :show-file-list="false"
          :on-success="bannerImgSuccess"
        >
          <img v-if="form.banner_img" :src="form.banner_img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>


      <!--缩略主图-->
      <el-form-item label="缩略主图：">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl + '/backend/goods/upload'"
          :show-file-list="false"
          :on-success="mainImgSuccess"
        >
          <img v-if="form.thumb_img" :src="form.thumb_img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <!--商品图片-->
      <el-form-item label="商品图片：">
        <div v-for="(item, index) in goodsImgsArr" @click="count(index)"
        @mouseenter="enterGoodsImg(index)"
        @mouseleave="leaveGoodsImg(index)"
        :key="index" style="float:left;margin-right:10px;position:relative;overflow:hidden">
           <el-upload
          class="avatar-uploader"
          :action="uploadUrl + '/backend/goods/upload'"
          :show-file-list="false"
          list-type="picture-card"
          :on-success="goodsImgSuccess"
        >
        <div class="el-icon-delete deleteImg" v-if="delImgShow[index]" @click.stop="delGoodsImg(index)"></div>
          <img v-if="item.img_path" :src="item.img_path" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </div>

      </el-form-item>

      <!--商品详情-->
      <el-form-item label="商品详情：">
         <div v-for="(item, index) in detailImgsArr" @click="countDetail(index)"
        @mouseenter="enterDetailImg(index)"
        @mouseleave="leaveDetailImg(index)"
        :key="index" style="float:left;margin-right:10px;position:relative;overflow:hidden">
           <el-upload
          class="avatar-uploader"
          :action="uploadUrl + '/backend/goods/upload'"
          :show-file-list="false"
          list-type="picture-card"
          :on-success="detailImgSuccess"
        >
        <div class="el-icon-delete deleteImg" v-if="delDetailImgShow[index]" @click.stop="delDetailImg(index)"></div>
          <img v-if="item.img_path" :src="item.img_path" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </div>
      </el-form-item>

      <!--邮费模板-->
      <!-- <el-form-item label="邮费模板：">
        <el-switch
          v-model="form.postSwitch"
          active-value="1"
          inactive-value="0"
          active-text="是"
          inactive-text="否"
          @change="postSwitchChange"
        />

        <transition name="slide-post">
          <el-form-item v-if="showPost" label="邮费模板：">
            <el-select v-model="form.postageFormwork" placeholder="选择邮费模板">
              <el-option label value/>
            </el-select>
          </el-form-item>
        </transition>
      </el-form-item> -->
      <el-form-item label="首页推荐：">
        <el-switch
          v-model="form.is_recommend"
          :active-value="activeVal"
          :inactive-value="inactiveVal"
          active-text="是"
          inactive-text="否"
          @change="recomentSwitchChange"
        />
        <el-form-item label="首页推荐排序：" v-if="showRecomend">
          <el-input v-model="form.recommend_sort" clearable/>
        </el-form-item>
      </el-form-item>

      <el-form-item label="首页分类显示：">
        <el-switch
          v-model="form.category_recommend"
          :active-value="1"
          :inactive-value="0"
          active-text="是"
          inactive-text="否"
          @change="typeSwitchChange"
        />
        <el-form-item label="首页分类排序：" v-if="showType">
          <el-input v-model="form.category_sort" clearable/>
        </el-form-item>
      </el-form-item>

      <!--设置banner图推荐-->
      <el-form-item label="banner图推荐：">
        <el-switch
          v-model="form.banner_recommend"
          :active-value="1"
          :inactive-value="0"
          active-text="是"
          inactive-text="否"
          @change="bannerImgChange"
        />
        <el-form-item label="banner图排序：" v-if="bannerShow">
          <el-input v-model="form.banner_sort" clearable/>
        </el-form-item>
      </el-form-item>

      <!--优惠券链接-->
      <el-form-item label="输入优惠券网址" v-if="couponLinks">
        <el-input v-model="couponAdress" placeholder="输入优惠券网址"></el-input>
      </el-form-item>

      <!--//优惠券二维码-->
      <el-form-item label="上传优惠券二维码" v-if="couponTwoDimensionalCode">
        <el-upload
          :action="uploadUrl + '/backend/goods/upload'"
          :on-success="CouponSuccess"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :src="couponAdress"
          list-type="picture-card"
        >
          <i class="el-icon-plus"/>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <!-- 根据条件判断是否显示优惠券 -->
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="goBackbeforePackge()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  addShop,
  getGoodsInfo,
  updateGoods,
  goodsClassifi,
  goodsClassifiInfo
} from "@/api/goodsManage/addGoods";
export default {
  data() {
    return {
      // uploadUrl: "https:media.datuhongan.net",
      form: {
        goods_name: "",
        subtitle: "",
        type: "",
        is_recommend: "",
        category_id: "",
        brand_id: "",
        value: "",
        stock: "",
        thumb_img: "",
        postage: "",
        link: '', // 优惠券链接
        category_recommend:'',//分类推荐
        banner_img:'',//banner图
        banner_recommend:'',//banner变量
        sort:'',//商品排序,
        recommend_sort:'',//首页推荐排序
        category_sort:'',//首页分类排序
        banner_sort:'',//banner图排序
        tags:'',//商品标签
        one_mall:'',//商城比价1
        one_mall_link:'',//商城比价1链接
        two_mall:'',//商城比价2
        two_mall_link:'',//商城比价2链接
        imgs: []
      },
      activityTypes: [
        { label: "实物", id: 1 },
        { label: "优惠券", id: 2 },
        { label: "卡券", id: 3 }
      ],
      sortClass: [],
      thumb_img: '', // 缩略主图
      goodsImgsArr: [''], // 所有商品图
      detailImgsArr: [''], //所有详情图
      idx: '',
      detailIndex: '',
      delImgShow:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      delDetailImgShow: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      showPost: false,
      showRecomend: false,
      showType: false,
      bannerShow:false,
      classification: "",
      couponLinks: "",
      couponTwoDimensionalCode: "",
      func: '' ,// 1=edit 2=add
      postage: "",
      goods_id: '',
      activeVal: 1,
      inactiveVal: 0
    };
  },
  created() {
    // console.log(process.env.BASE_A)
    this.uploadUrl = process.env.BASE_API
    this.func = this.$route.query.goto
    if(this.func == 1) {
       // 编辑
      let gid = this.$route.query.id
      this.goods_id = gid
      this.form.goods_id = gid
      this.getDetailById(gid, res => {
        for(let k in res) {
          let tmpK = k
          for(let j in this.form){
            if(tmpK == j){
              this.form[j] = res[tmpK]

            }
          }
        }
        if (this.form.type == 1){
            goodsClassifi().then(res=>{
              this.sortClass = res.data.result
              goodsClassifiInfo({id:this.form.category_id}).then(res=>{
                this.sortClass.category_name = res.data.result.category_name
              })
            })
          }

        res.is_recommend == 1 ? this.showRecomend = true : this.showRecomend = false
        res.category_recommend == 1 ? this.showType = true : this.showType = false
        res.banner_recommend == 1 ? this.bannerShow = true : this.bannerShow = false
        // this.activeVal = res.is_recommend // 激活的值
        if(res.is_recommend == 1) {
          this.activeVal = res.is_recommend // 激活的值
        }else {
          this.inactiveVal = res.is_recommend // 未激活的值
        }
        this.goodsImgsArr = res.imgs.filter(v => {return v.img_type == 1})
        this.detailImgsArr = res.imgs.filter(v => {return v.img_type == 2})
         if(this.goodsImgsArr[this.goodsImgsArr.length-1] != '') {
      this.goodsImgsArr.push('')
    }
    if(this.detailImgsArr[this.detailImgsArr.length-1] != '') {
      this.detailImgsArr.push('')
    }

      })


    }

  },
  computed: {

  },
  methods: {
    computePostage(){
      console.log(111);
      let postage;
      if(this.form.value>0 && this.form.value < 50){
        postage = 9.9
      } else if(this.form.value >= 50 && this.form.value <100){
        postage = 14.9
      } else if(this.form.value >= 100 && this.form.value < 200){
        postage = 19.9
      } else if(this.form.value >= 200 && this.form.value < 300){
        postage = 25.9
      }else if(this.form.value >= 300 && this.form.value < 400){
        postage = 35.9
      }else if(this.form.value >= 400 && this.form.value <= 500){
        postage = 42.9
      } else  {
        postage = (this.form.value * 10)/100
      }
      this.form.postage = postage
      return postage
    },

    // 类型下拉选择
    typeSelectChange(){
      console.log(this.form.type);
      if (this.form.type == 1){
        goodsClassifi().then(res=>{
          this.sortClass = res.data.result
          console.log(this.sortClass);
        })
      }
    },

    // 分类下拉选择
    selectionType(row){
      console.log(row);
    },

    goBackbeforePackge(){  //
      this.$router.push({ path: '/goodsManage/index'})
    },
    mainImgSuccess(res, file, fileList) { // 主图上传成功事件
     this.form.thumb_img = res.result.path
    },
    bannerImgSuccess(res, file, fileList){
      this.form.banner_img = res.result.path//banner图上传成功事件
    },
    // 商品图片上传
    count(idx){
      this.idx = idx
    },
    goodsImgSuccess(res,file,fileList){ // 商品图片
    let tmp = {
      img_path: res.result.path,
      img_type: 1
    }
      this.$set(this.goodsImgsArr, this.idx, tmp)
      this.goodsImgsArr.push('')
      console.log(this.goodsImgsArr)
    },
    enterGoodsImg(idx){ // 鼠标经过图片
      if(this.goodsImgsArr[idx] != '') {
        this.delImgShow[idx] = true
        this.$set(this.delImgShow, idx,true)
      }
    },
    leaveGoodsImg(idx){// 鼠标离开图片
        this.delImgShow[idx] = false
        this.$set(this.delImgShow, idx,false)
    },
    delGoodsImg (idx) {// 删除商品图片
      this.goodsImgsArr.splice(idx,1)
      this.delImgShow.splice(idx,1)

    },
    // 商品图片上传结束

    // 详情图片上传开始
     countDetail(idx) {
      this.detailIndex = idx
    },
     detailImgSuccess(res,file,fileList){ // 商品图片
    let tmpdetail = {
      img_path: res.result.path,
      img_type: 2
    }
      this.$set(this.detailImgsArr, this.detailIndex, tmpdetail)
      this.detailImgsArr.push('')
      console.log(this.detailImgsArr)
    },
    enterDetailImg(idx){ // 鼠标经过图片
      if(this.detailImgsArr[idx] != '') {
        this.delDetailImgShow[idx] = true
        this.$set(this.delDetailImgShow, idx,true)
      }
    },
    leaveDetailImg(idx){// 鼠标离开图片
        this.delDetailImgShow[idx] = false
        this.$set(this.delDetailImgShow, idx,false)
    },
    delDetailImg (idx) {// 删除商品图片
      this.detailImgsArr.splice(idx,1)
      this.delDetailImgShow.splice(idx,1)
    },
    // 详情图片上传结束

    onSubmit() {
      // 提交
       let imgs = this.goodsImgsArr.concat(this.detailImgsArr)
        imgs.map((v, i) => {
          if(v == '') {
            imgs.splice(i,1)
          }
        })
        this.form.imgs = imgs
      if(this.func == 2) {
        //添加
          addShop(this.form).then(res => {
            if(res.data.code == 0) {
              this.$router.push({ path: '/goodsManage/index'})
            }else {
              this.$message({
                type: 'warning',
                success: res.data.msg
              })
            }
          })
      }else {
          // 编辑
          updateGoods(this.form).then(res => {
             if(res.data.code == 0) {
              this.$router.push({ path: '/goodsManage/index'})
             }else {
              this.$message({
                type: 'warning',
                success: res.data.msg
              })
            }
          })
      }
    },
    // 根据id获取商品详情
    getDetailById (gid, callback) {
      getGoodsInfo({goods_id: gid}).then( res => {
        if(res.data.code == 0) {
          let resData = res.data.result
          callback(resData)
          console.log(resData);
        }else {
          this.$message({
            type: 'warning',
            message: 'error'
          })
        }
      })
    },
    // 动画事件
    postSwitchChange(val) { //邮费模板
      val == 1 ? (this.showPost = true) : (this.showPost = false);
      console.log(val)
    },
    recomentSwitchChange(val) { // 首页推荐
      val == 1 ? (this.showRecomend = true) : (this.showRecomend = false);
    },
    typeSwitchChange(val) {//分类显示
      val == 1 ? (this.showType = true) : (this.showType = false);
    },

    bannerImgChange(val){//banner推荐
      val == 1 ? (this.bannerShow = true) : (this.bannerShow = false);
    }
    // 动画事件结束
  }
};
</script>
<style lang="scss" scoped>
.piccard {
  float: left;
}
.el-input {
  width: 195px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  border: 1px solid #eee;
}
.avatar {
  width: 140px;
  height: 140px;
  display: block;
}
.slide-post-enter-active {
  transition: all 0.3s ease;
}
.slide-post-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-post-enter, .slide-post-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(80px);
  opacity: 0;
}
.deleteImg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.5);
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-top: 70px;
  box-sizing: border-box;
  text-align: center;
  color: #fff;
}
</style>

