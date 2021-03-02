<template>
  <div class="addGoods-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert
        title="添加商品信息"
        type="info"
        show-icon
        :closable="false"
        >
      </el-alert>
      <el-steps :active="activeIndex - 0" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form :model="addGoodsForm" :rules="addGoodsRules" ref="addGoodsRef" label-width="100px" class="demo-ruleForm" label-position="top">
        <el-tabs tab-position="left" v-model="activeIndex" :before-leave="beforeLeave" @tab-click="tabClick">
          <el-tab-pane label="基本信息" name="0">
             <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addGoodsForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addGoodsForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addGoodsForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addGoodsForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addGoodsForm.goods_cat"
                :options="catesList"
                :props="cateProps"
                @change="handleChange"
                expandTrigger= 'hover'
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox :label="item1" v-for="(item1, id) in item.attr_vals" :key="id" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- action 用于设置发送的后台地址 -->
            <el-upload
              class="upload-demo"
              :action="upAction"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :headers="headers"
              :on-success="imgSuccess"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  只能上传 jpg/png 文件，且不超过 500kb
                </div>
              </template>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor v-model="addGoodsForm.goods_introduce"></quill-editor>
            <el-button type="primary" class="subBtn" @click="subClick">提交商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="showimgPreview"
      width="50%"
      >
        <img :src="imgPreview" alt="" class="imgwith">
    </el-dialog>
  </div>
</template>

<script>
// 用于深拷贝包
import _ from 'lodash'
import { catesList, addGoods } from '@/api/goods'
import { getParamsList } from '@/api/params'

export default {
  name: 'add-goods',
  components: {},
  props: {},
  data () {
    return {
      activeIndex: '0',
      addGoodsForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [],
        pics: [],
        goods_introduce: '',
        attrs: []
      },
      addGoodsRules: {
        goods_name: [
          { required: true, message: '请填写商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请填写商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请填写商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请填写商品数量', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请填写商品分类', trigger: 'blur' }
        ]
      },
      catesList: [],
      selectVal: [],
      // 设置props 类型
      cateProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      manyTableData: [],
      onlyTableData: [],
      // 设置发送服务器地址
      upAction: 'http://127.0.0.1:8888/api/private/v1/upload',
      // 设置请求头
      headers: {
        Authorization: sessionStorage.getItem('token')
      },
      imgPreview: '',
      showimgPreview: false
    }
  },
  watch: {},
  computed: {
    goodId () {
      if (this.addGoodsForm.goods_cat.length === 3) {
        return this.addGoodsForm.goods_cat[this.addGoodsForm.goods_cat.length - 1]
      }
      return null
    }
  },
  created () {
    this.getCatesList()
  },
  mounted () {},
  methods: {
    // 获取商品分类数据
    async getCatesList () {
      const data = await catesList()
      if (data.meta.status !== 200) return this.$message.error('请求数据失败，请稍后重试')
      this.catesList = data.data
    },
    handleChange () {},
    beforeLeave (activeName, oldName) {
      // 判断是否选择了分类
      if (oldName === '0' && this.addGoodsForm.goods_cat.length !== 3) {
        this.$message.error('请先选择商品分类')
        return false
      }
    },
    // 切换标签页
    async tabClick () {
      if (this.activeIndex === '1') {
        const data = await getParamsList(this.goodId, 'many')
        if (data.meta.status !== 200) return this.$message.error('请求数据失败，请稍后重试')
        data.data.forEach(item => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        })
        this.manyTableData = data.data
      } else if (this.activeIndex === '2') {
        const data = await getParamsList(this.goodId, 'only')
        if (data.meta.status !== 200) return this.$message.error('请求数据失败，请稍后重试')
        this.onlyTableData = data.data
      }
    },
    // 浏览时候触发
    handlePreview (file) {
      console.log(file.response.data.url)
      this.imgPreview = file.response.data.url
      this.showimgPreview = true
    },
    // 删掉的时候触发
    handleRemove (file) {
      // 获取删除掉的url
      const delPath = file.response.data.tmp_path
      // 获取删掉图片的索引
      const index = this.addGoodsForm.pics.findIndex(i => i.pic === delPath)
      this.addGoodsForm.pics.splice(index, 1)
    },
    imgSuccess (response) {
      if (response.meta.status !== 200) return this.$message.error('请求失败，请稍后重试')
      // 将图片的路径放入pic中
      const picInfo = {
        pic: response.data.tmp_path
      }
      this.addGoodsForm.pics.push(picInfo)
      console.log(this.addGoodsForm)
    },
    // 添加商品
    subClick () {
      this.$refs.addGoodsRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写相关参数信息')
        // 处理动态参数
        this.manyTableData.forEach(item => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(' ')
          }
          this.addGoodsForm.attrs.push(newInfo)
        })
        // 处理静态属性参数
        this.onlyTableData.forEach(item => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          this.addGoodsForm.attrs.push(newInfo)
        })
        // 使用 loadsh 第三方包 深拷贝
        const form = _.cloneDeep(this.addGoodsForm)
        // 将goods_cat 转化为字符串
        form.goods_cat = form.goods_cat.join(',')
        console.log(form)
        // 发送请求
        const data = await addGoods(form)
        console.log(data)
        if (data.meta.status !== 201) return this.$message.error('请求失败，请稍后重试')
        this.$message.success('添加商品成功')
        // 跳转到商品列表
        this.$router.push('/goods')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.el-alert{
  justify-content: center;
}
.el-steps{
  margin: 20px 80px;
}
.el-checkbox{
  margin: 0 10px 0 0 !important;
}
.imgwith{
  width: 100%;
}
.subBtn{
  margin-top: 20px;
}
</style>
